import { expect, test } from 'claude-code/testing'

const BANDA: any = { plugin: 'comodidad-jeiler', component: 'AbovePrompt', props: { hasSurvey: false } }

test('editar código sin correr pruebas muestra «sin probar»; con pruebas no', async ($, on) => {
  on('tool.call', () => ({ result: {} }))
  on('ui.render', ($, e) => { const { Text } = $.ui.resolve(e); return <Text>motor</Text> })
  on('session.usage', () => ({ value: { context: { percent: 10 } as any, startedAt: 0, rateLimits: [] } as any }))
  on('turn.start', (_, e) => ({ ...e }))
  on('turn.complete', () => ({ text: '' }))
  on('clock.now', () => ({ value: 1_000_000 }))
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => ({ value: undefined }))
  await $.turn.start({ text: 'hazlo', turnId: 't1' })
  await $.tool.call({ tool: 'Write', file_path: '/x/app.js', content: 'a' })
  await $.turn.complete({ turnId: 't1', reason: 'answer', answer: '', durationMs: 5, isAborted: false })
  const ui = await $.ui.mount({ ...BANDA, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /sin probar/ })).toBeTruthy()
  await ui.unmount()

  await $.turn.start({ text: 'otra', turnId: 't2' })
  await $.tool.call({ tool: 'Write', file_path: '/x/app.js', content: 'a' })
  await $.tool.call({ tool: 'Bash', command: 'npm test' })
  await $.turn.complete({ turnId: 't2', reason: 'answer', answer: '', durationMs: 5, isAborted: false })
  const ui2 = await $.ui.mount({ ...BANDA, surface: 'desktop' })
  expect(await ui2.find({ type: 'Text', text: /sin probar/ })).toBeFalsy()
  await ui2.unmount()
})

test('contexto lleno muestra el semáforo', async ($, on) => {
  on('session.usage', () => ({ value: { context: { percent: 85 } as any, startedAt: 0, rateLimits: [] } as any }))
  const ui = await $.ui.mount({ ...BANDA, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /Contexto al 85/ })).toBeTruthy()
  await ui.unmount()
})

test('/bitacora lista lo de hoy y avisa si no hay nada', async ($, on) => {
  on('command.register', () => ({ value: { command: 'bitacora' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 9, 20, 0) }))
  on('store.get', () => ({
    value: [{ dia: '2026-11-09', hora: '14:30', archivos: ['x/app.js'] }],
  }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const r = await $.command.run({ command: 'bitacora', args: '' } as any)
  expect(r.text).toContain('x/app.js')
})

test('/bitacora sin entradas de hoy', async ($, on) => {
  on('command.register', () => ({ value: { command: 'bitacora' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 9, 20, 0) }))
  on('store.get', () => ({ value: undefined }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const r = await $.command.run({ command: 'bitacora', args: '' } as any)
  expect(r.text).toContain('Hoy no')
})

test('sugiere Haiku en una pregunta corta', async ($, on) => {
  const avisos: string[] = []
  on('ui.toast', (_, e: any) => { avisos.push(JSON.stringify(e)); return { value: undefined } as any })
  on('prompt.submit', (_, e) => ({ ...e }) as any)
  await $.prompt.submit({ text: 'qué significa webhook' } as any)
  expect(avisos.join(' ')).toContain('Haiku')
})

test('avisa cuando un turno largo termina', async ($, on) => {
  const avisos: string[] = []
  let ahora = 0
  on('clock.now', () => ({ value: ahora }))
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => ({ value: undefined }))
  on('ui.toast', (_, e: any) => { avisos.push(JSON.stringify(e)); return { value: undefined } as any })
  on('ui.notify', () => ({ value: { isSent: false, reason: 'disabled' } }) as any)
  on('turn.start', (_, e) => ({ ...e }))
  on('turn.complete', () => ({ text: '' }))
  await $.turn.start({ text: 'x', turnId: 'a' })
  ahora = 120_000
  await $.turn.complete({ turnId: 'a', reason: 'answer', answer: '', durationMs: 120000, isAborted: false })
  expect(avisos.join(' ')).toContain('Terminó')
  avisos.length = 0
  await $.turn.start({ text: 'y', turnId: 'b' })
  ahora = 125_000
  await $.turn.complete({ turnId: 'b', reason: 'answer', answer: '', durationMs: 5000, isAborted: false })
  expect(avisos.join(' ')).not.toContain('Terminó')
})
