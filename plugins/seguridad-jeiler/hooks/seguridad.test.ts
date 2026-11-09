import { expect, test } from 'claude-code/testing'

const conDiff = (on: any, diff: string) => {
  on('process.run', () => ({ value: { exitCode: 0, stdout: diff, stderr: '' } }))
  on('tool.call', () => ({ result: {} }))
}

test('commit con teléfono real se bloquea; sin teléfono pasa', async ($, on) => {
  conDiff(on, '+++ b/a.md\n+Llamar al 3101234567\n')
  expect((await $.tool.call({ tool: 'Bash', command: 'git commit -m x' })).deny).toBeDefined()
})

test('commit limpio pasa', async ($, on) => {
  conDiff(on, '+++ b/a.md\n+Hola mundo\n')
  expect((await $.tool.call({ tool: 'Bash', command: 'git commit -m x' })).deny).toBeUndefined()
})

test('commit de flujo n8n con pinData se bloquea; sin pinData pasa', async ($, on) => {
  conDiff(on, '+++ b/f.json\n+{"nodes":[],"connections":{},"pinData":{"Nodo":[1]}}\n')
  expect((await $.tool.call({ tool: 'Bash', command: 'git commit -m x' })).deny).toBeDefined()
})

test('commit de flujo n8n limpio pasa', async ($, on) => {
  conDiff(on, '+++ b/f.json\n+{"nodes":[],"connections":{},"pinData":{}}\n')
  expect((await $.tool.call({ tool: 'Bash', command: 'git commit -m x' })).deny).toBeUndefined()
})
