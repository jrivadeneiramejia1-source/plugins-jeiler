import { expect, test } from 'claude-code/testing'

const conModelo = (valor: string) => ($: any, on: any) => {
  on('config.list', () => ({ value: [{ key: 'model', value: valor }] }))
  on('tool.call', () => ({ result: {} }))
}

test('en Opus bloquea editar fuera de .planes/ y deja escribir el plan', async ($, on) => {
  conModelo('claude-opus-5-5')($, on)
  const malo = await $.tool.call({ tool: 'Write', file_path: '/x/app.js', content: 'a' })
  expect(malo.deny).toBeDefined()
  const bueno = await $.tool.call({ tool: 'Write', file_path: '/x/.planes/plan-a.md', content: 'a' })
  expect(bueno.deny).toBeUndefined()
  const git = await $.tool.call({ tool: 'Bash', command: 'git commit -m x' })
  expect(git.deny).toBeDefined()
})

test('en Sonnet deja editar', async ($, on) => {
  conModelo('claude-sonnet-5-5')($, on)
  const bueno = await $.tool.call({ tool: 'Write', file_path: '/x/app.js', content: 'a' })
  expect(bueno.deny).toBeUndefined()
})
