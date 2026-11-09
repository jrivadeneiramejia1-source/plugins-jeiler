import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const sinProbar = atom({ plugin: 'comodidad-jeiler', key: 'sinProbar' } as const, false)

const CODIGO = /\.(js|jsx|ts|tsx|py|sh|go|html|css|ps1|json|yml|yaml)$/i
const PRUEBA = /\b(npm\s+(run\s+)?test|npx\s+(vitest|jest|playwright)|pytest|unittest|node\s+--test|claude\s+plugin\s+test|go\s+test|bash\s+-n|tsc\b|eslint)\b/

const UMBRAL_CONTEXTO = 70
const MIN_AVISO_MS = 60_000

function dia(ms: number): string {
  return new Date(ms - 5 * 3600_000).toISOString().slice(0, 10) // hora de Colombia
}
function hora(ms: number): string {
  return new Date(ms - 5 * 3600_000).toISOString().slice(11, 16)
}

// Qué modelo conviene según el texto del prompt.
function sugerencia(texto: string): string | undefined {
  const t = texto.trim().toLowerCase()
  if (t.startsWith('/') || t.length < 3) return undefined
  if (/\b(plan|planea|planear|dise[ñn]a|arquitectura|estrategia|riesgos?|decide|compara)\b/.test(t))
    return 'Esto es para planear: usa /planear (Opus).'
  if (t.length < 90 && /(qu[eé] (es|significa)|c[oó]mo se llama|d[oó]nde est[aá]|para qu[eé] sirve)/.test(t))
    return 'Pregunta corta: /rapido (Haiku) gasta menos.'
  if (/\b(arregla|crea|cambia|implementa|ejecuta|agrega|corrige)\b/.test(t))
    return 'Para ejecutar, usa Sonnet (/model sonnet).'
  return undefined
}

let editoCodigo = false
let probo = false
let archivos: string[] = []
let inicio = 0
let prompts = 0

function anotarEdicion($: any, e: any, next: any) {
  const ruta = String(e.file_path ?? e.notebook_path ?? '')
  if (ruta) archivos.push(ruta.split('/').slice(-2).join('/'))
  if (CODIGO.test(ruta)) editoCodigo = true
  return next(e)
}

export const register: Register = on => {

  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'bitacora', description: 'Muestra lo que se tocó hoy' })
    return next(e)
  })

  on('command.run', { command: 'bitacora' }, async $ => {
    const guardada = await $.store.get('bitacora')
    const lista = Array.isArray(guardada) ? (guardada as { dia: string; hora: string; archivos: string[] }[]) : []
    const hoy = dia(await $.clock.now())
    const deHoy = lista.filter(x => x.dia === hoy)
    if (deHoy.length === 0) return { text: 'Hoy no se ha tocado ningún archivo.' }
    return { text: deHoy.map(x => `${x.hora}  ${x.archivos.join(', ')}`).join('\n') }
  })

  on('prompt.submit', async ($, e, next) => {
    prompts += 1
    const s = sugerencia(e.text)
    if (s && prompts % 3 === 1) $.ui.toast(`💡 ${s}`)
    return next(e)
  }).catch(($, e, next) => next(e))

  on('turn.start', async ($, e, next) => {
    editoCodigo = false
    probo = false
    archivos = []
    inicio = await $.clock.now()
    await update($, sinProbar, () => false)
    return next(e)
  }).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'Edit' }, anotarEdicion).catch(($, e, next) => next(e))
  on('tool.call', { tool: 'Write' }, anotarEdicion).catch(($, e, next) => next(e))
  on('tool.call', { tool: 'NotebookEdit' }, anotarEdicion).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'Bash' }, ($, e, next) => {
    if (PRUEBA.test(e.command)) probo = true
    return next(e)
  }).catch(($, e, next) => next(e))

  on('turn.complete', async ($, e, next) => {
    const ahora = await $.clock.now()
    if (editoCodigo && !probo) await update($, sinProbar, () => true)
    if (archivos.length > 0) {
      const guardada = await $.store.get('bitacora')
      const lista = Array.isArray(guardada) ? guardada : []
      lista.push({ dia: dia(ahora), hora: hora(ahora), archivos: [...new Set(archivos)].slice(0, 20) })
      await $.store.set('bitacora', lista.slice(-300))
    }
    if (ahora - inicio > MIN_AVISO_MS) {
      const texto = `✅ Terminó (${Math.round((ahora - inicio) / 1000)} s)`
      $.ui.toast(texto)
      try {
        await $.ui.notify(texto, { title: 'Claude terminó' })
      } catch {
        // si el sistema no deja notificar, queda el aviso dentro de Claude
      }
    }
    return next(e)
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const uso = await $.session.usage()
    const porcentaje = uso.context.percent ?? 0
    const sin = await read($, sinProbar)
    if (e.props.hasSurvey || (porcentaje < UMBRAL_CONTEXTO && !sin)) return next(e)

    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        {porcentaje >= UMBRAL_CONTEXTO && (
          <Text>⚠ Contexto al {Math.round(porcentaje)} %: usa /compact o abre una sesión nueva.</Text>
        )}
        {sin && <Text>✎ Se editó código y no se corrieron pruebas: quedó sin probar.</Text>}
      </Box>
    )
  }).catch(($, e, next) => next(e))
}
