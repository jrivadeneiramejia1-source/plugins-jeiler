import type { Register } from 'claude-code'

// Rutas donde SÍ se puede escribir estando en Opus (el plan).
const RUTA_PLAN = /(^|\/)\.planes\/|(^|\/)plan[-_a-z0-9]*\.md$/i
// Comandos de Bash que cambian cosas.
const BASH_CAMBIA = /\bgit\s+(commit|push|add|rm|mv|reset|merge|rebase)\b|\brm\s+-|\bsed\s+-i\b|\btee\b|\bnpm\s+(install|publish)\b/

async function modeloActual($: any): Promise<string> {
  try {
    const filas = await $.config.list()
    const fila = filas.find((f: { key: string }) => f.key === 'model')
    return fila ? String(fila.value).toLowerCase() : ''
  } catch {
    return ''
  }
}

const esOpus = (m: string) => m.includes('opus')

const MENSAJE =
  'Estás en Opus: solo se planea. Escribe el plan en .planes/ o cámbiate a Sonnet con /model para ejecutar.'

async function bloquearEdicion($: any, e: any, next: any) {
  const ruta: string = e.file_path ?? e.notebook_path ?? ''
  if (esOpus(await modeloActual($)) && !RUTA_PLAN.test(ruta)) {
    return { deny: MENSAJE }
  }
  return next(e)
}

export const register: Register = on => {
  on('tool.call', { tool: 'Edit' }, bloquearEdicion).catch(($, e, next) => next(e))
  on('tool.call', { tool: 'Write' }, bloquearEdicion).catch(($, e, next) => next(e))
  on('tool.call', { tool: 'NotebookEdit' }, bloquearEdicion).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    if (esOpus(await modeloActual($)) && BASH_CAMBIA.test(e.command)) {
      return { deny: MENSAJE }
    }
    return next(e)
  }).catch(($, e, next) => next(e))

  on('turn.start', async ($, e, next) => {
    const m = await modeloActual($)
    if (esOpus(m)) $.ui.status('Opus: planear (sin editar)')
    else if (m.includes('sonnet')) $.ui.status('Sonnet: ejecutar')
    else if (m.includes('haiku')) $.ui.status('Haiku: preguntas rápidas')
    else $.ui.status(undefined)
    return next(e)
  })
}
