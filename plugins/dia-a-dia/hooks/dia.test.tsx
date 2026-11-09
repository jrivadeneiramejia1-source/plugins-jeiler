import { expect, test } from 'claude-code/testing'

test('agrega un pendiente, lo marca hecho y se ve en el panel', async ($, on) => {
  on('command.register', () => ({ value: { command: 'x' } }))
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => ({ value: undefined }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  const a = await $.command.run({ command: 'pendiente', args: 'comprar cable' })
  expect(a.text).toContain('comprar cable')
  const vacio = await $.command.run({ command: 'pendiente', args: '' })
  expect(vacio.text).toContain('Escribe')
  const h = await $.command.run({ command: 'hecho', args: '1' })
  expect(h.text).toContain('Hecho')
  const malo = await $.command.run({ command: 'hecho', args: '9' })
  expect(malo.text).toContain('número')

  const ui = await $.ui.mount({
    plugin: 'dia-a-dia', component: 'Pane', requestId: 'mi-dia', surface: 'desktop',
    props: { title: 'Mi día', isFocused: false, bodyColumns: 40, placement: 'dock', scroll: { offset: 0, bodyRows: 20 }, view: {} },
  })
  expect((await ui.find({ type: 'Text', text: /comprar cable/ }))?.text).toContain('✔')
  await ui.unmount()
})
