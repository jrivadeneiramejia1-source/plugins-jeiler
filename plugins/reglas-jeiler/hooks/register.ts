import type { Register } from 'claude-code'

// Carpetas de comunidades indígenas: nunca se modifican ni se borran.
const INDIGENA = /consulta-previa|ind[ií]gena/i
// Formas típicas de claves y tokens (no se imprimen nunca).
const SECRETO =
  /ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{30,}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----/
// Subir a main o master, o subir a la fuerza.
const PUSH_MAIN = /\bgit\s+push\b[^\n;&|]*(\b(main|master)\b|--force|--force-with-lease|\s-f\b)/
const PUSH_SIN_RAMA = /\bgit\s+push\b(?![^\n;&|]*\borigin\s+\S)/
// Borrados peligrosos.
const BORRADO = /\brm\s+-[a-zA-Z]*[rf][a-zA-Z]*\s+(\/|~|\$HOME|\*|\.)(\s|$)/
// Cambios sobre una carpeta indígena desde la terminal.
const BASH_CAMBIA = /\brm\b|\bmv\b|\bsed\s+-i|\btruncate\b|\btee\b|\bshred\b|>\s*\S/

export const juzgar = (c: string): string | undefined => {
  if (PUSH_MAIN.test(c)) return 'Subir a main o a la fuerza solo con el «sí» explícito de Jeiler. Usa una rama.'
  if (BORRADO.test(c)) return 'Borrado peligroso bloqueado. Pídele permiso a Jeiler.'
  if (INDIGENA.test(c) && BASH_CAMBIA.test(c.replace(/\d?>&\d|2>\/dev\/null/g, '')))
    return 'Archivos de comunidades indígenas: no se modifican ni se borran. Crea un archivo nuevo.'
  if (SECRETO.test(c)) return 'Se ve una clave o token en el comando. No se guardan claves; usa los Secrets.'
  return undefined
}

async function git($: any, args: string[]): Promise<string> {
  try {
    const r = await $.process.run(['git', ...args], { timeoutMs: 5000 })
    return r.exitCode === 0 ? String(r.stdout).trim() : ''
  } catch {
    return ''
  }
}

async function barra($: any): Promise<void> {
  const rama = await git($, ['branch', '--show-current'])
  if (!rama) return $.ui.status(undefined)
  const n = (await git($, ['status', '--porcelain'])).split('\n').filter(Boolean).length
  $.ui.status(`${rama === 'main' || rama === 'master' ? '⚠ ' : ''}${rama} · ${n} sin subir`)
}

export const register: Register = on => {
  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    const motivo = juzgar(e.command)
    if (motivo) return { deny: motivo }

    if (/\bgit\s+push\b/.test(e.command) && PUSH_SIN_RAMA.test(e.command)) {
      const rama = await git($, ['branch', '--show-current'])
      if (rama === 'main' || rama === 'master')
        return { deny: 'Estás en main: no se sube. Cambia a una rama.' }
    }

    if (/\bgit\s+commit\b/.test(e.command)) {
      const staged = await git($, ['diff', '--cached'])
      if (SECRETO.test(staged))
        return { deny: 'Hay una clave o token en lo que vas a guardar (commit). Quítala antes.' }
    }
    return next(e)
  }).catch(($, e, next) => (next.called ? next(e) : { deny: 'reglas-jeiler: falló la revisión; por seguridad no se ejecuta.' }))

  on('tool.call', { tool: 'Edit' }, async ($, e: any, next) => {
    if (INDIGENA.test(e.file_path)) return { deny: 'Archivos de comunidades indígenas: no se modifican. Crea un archivo nuevo.' }
    if (SECRETO.test(String(e.new_string))) return { deny: 'Se ve una clave o token en el texto. No se guardan claves.' }
    return next(e)
  }).catch(($, e, next) => (next.called ? next(e) : { deny: 'reglas-jeiler: falló la revisión.' }))

  on('tool.call', { tool: 'Write' }, async ($, e: any, next) => {
    if (INDIGENA.test(e.file_path) && (await $.fs.exists(e.file_path)))
      return { deny: 'Ese archivo indígena ya existe: no se sobrescribe. Crea uno con otro nombre.' }
    if (SECRETO.test(String(e.content))) return { deny: 'Se ve una clave o token en el archivo. No se guardan claves.' }
    return next(e)
  }).catch(($, e, next) => (next.called ? next(e) : { deny: 'reglas-jeiler: falló la revisión.' }))

  on('tool.call', { tool: 'NotebookEdit' }, ($, e: any, next) =>
    INDIGENA.test(String(e.notebook_path)) ? { deny: 'Archivos de comunidades indígenas: no se modifican.' } : next(e),
  ).catch(($, e, next) => (next.called ? next(e) : { deny: 'reglas-jeiler: falló la revisión.' }))

  on('turn.complete', async ($, e, next) => {
    await barra($)
    return next(e)
  }).catch(($, e, next) => next(e))
}
