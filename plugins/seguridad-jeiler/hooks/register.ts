import type { Register } from 'claude-code'

// ---------- ayudas ----------
async function git($: any, args: string[]): Promise<string> {
  try {
    const r = await $.process.run(['git', ...args], { timeoutMs: 8000 })
    return r.exitCode === 0 ? String(r.stdout) : ''
  } catch {
    return ''
  }
}

// Líneas agregadas de un diff. Se saltan los archivos «lock».
function agregadas(diff: string): string {
  const out: string[] = []
  let archivo = ''
  for (const l of diff.split('\n')) {
    if (l.startsWith('+++ ')) archivo = l.slice(4)
    else if (l.startsWith('+') && !/lock/i.test(archivo)) out.push(l.slice(1))
  }
  return out.join('\n')
}

// ---------- 1. Aviso de créditos ----------
const GASTA =
  /^mcp__[^_]*(higgsfield).*__(generate|execute_preset|upscale|outpaint|reframe|remove_background|relight|motion_control|ai_influencer_generate|publish|create_voice)|^mcp__[^_]*canva.*__(create-video|import-claude-motion)|elevenlabs|^mcp__.*audiopod.*__(?!.*(get|list|status|show|check|read))/i

// ---------- 2. Guardián de n8n ----------
const PINDATA = /"pinData"\s*:\s*\{\s*"/
const CREDENCIAL = /"credentials"\s*:\s*\{\s*"[A-Za-z0-9]+"\s*:\s*\{\s*"id"/
const WEBHOOK_REAL = /https?:\/\/[^"\s]+\/webhook(-test)?\/[A-Za-z0-9-]{8,}/
const AVISO_N8N =
  'Flujo de n8n con credenciales, pinData (datos de prueba) o URL de webhook real. En el repo van sin eso: quítalos antes de guardar.'
const pareceN8n = (t: string) => /"nodes"\s*:/.test(t) && /"connections"\s*:/.test(t)
const n8nMalo = (t: string) => pareceN8n(t) && (PINDATA.test(t) || CREDENCIAL.test(t) || WEBHOOK_REAL.test(t))

// ---------- 3. Datos personales ----------
const TELEFONO = /(?<!\d)(\+?57[\s-]?)?3\d{2}[\s-]?\d{3}[\s-]?\d{4}(?!\d)/
const CEDULA = /\b(c\.?\s?c\.?|c[ée]dula)[^\d\n]{0,15}\d{1,3}(\.?\d{3}){2}\b/i
const CORREO = /[\w.+-]+@(?!example\.|users\.noreply|anthropic\.com)[\w-]+\.[\w.]+/

export const register: Register = on => {
  on('tool.call', ($, e, next) => {
    if (GASTA.test(String(e.tool))) {
      $.ui.toast(`💸 Puede gastar créditos: ${e.tool}. Asegúrate de que Jeiler lo pidió.`)
    }
    return next(e)
  }).catch(($, e, next) => next(e))

  for (const tool of ['Write', 'Edit'] as const) {
    on('tool.call', { tool }, ($, e: any, next) => {
      const t = String(e.content ?? e.new_string ?? '')
      if (/\.json$/i.test(String(e.file_path)) && n8nMalo(t)) $.ui.toast(`⚠ ${AVISO_N8N}`)
      if (TELEFONO.test(t) || CEDULA.test(t) || CORREO.test(t))
        $.ui.toast('⚠ Se ve un teléfono, cédula o correo. Si es real, no va en repos públicos.')
      return next(e)
    }).catch(($, e, next) => next(e))
  }

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    if (/\bgit\s+commit\b/.test(e.command)) {
      const lineas = agregadas(await git($, ['diff', '--cached']))
      if (n8nMalo(lineas)) return { deny: AVISO_N8N }
      if (TELEFONO.test(lineas) || CEDULA.test(lineas))
        return { deny: 'Hay un teléfono o cédula en lo que vas a guardar. Si es real, quítalo; si es inventado, dile a Jeiler.' }
    }
    return next(e)
  }).catch(($, e, next) => next(e))
}
