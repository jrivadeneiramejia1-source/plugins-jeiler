import { expect, test } from 'claude-code/testing'

const intentar = ($: any, _on: any, input: any) => $.tool.call(input)

test('bloquea subir a main y deja subir a una rama', async ($, on) => {
  on('tool.call', () => ({ result: {} }))
  const malo = await intentar($, on, { tool: 'Bash', command: 'git push origin main' })
  expect(malo.deny).toBeDefined()
  const bueno = await intentar($, on, { tool: 'Bash', command: 'git push -u origin mi-rama' })
  expect(bueno.deny).toBeUndefined()
})

test('bloquea tocar carpetas indígenas pero deja leerlas', async ($, on) => {
  on('tool.call', () => ({ result: {} }))
  const malo = await intentar($, on, { tool: 'Edit', file_path: '/x/consulta-previa/a.md', old_string: 'a', new_string: 'b' })
  expect(malo.deny).toBeDefined()
  const malo2 = await intentar($, on, { tool: 'Bash', command: 'rm /x/indigena/a.md' })
  expect(malo2.deny).toBeDefined()
  const bueno = await intentar($, on, { tool: 'Bash', command: 'cat /x/consulta-previa/a.md' })
  expect(bueno.deny).toBeUndefined()
})

test('bloquea claves en archivos y borrados peligrosos', async ($, on) => {
  on('tool.call', () => ({ result: {} }))
  const falsa = 'ghp_' + 'a'.repeat(30)
  const malo = await intentar($, on, { tool: 'Write', file_path: '/x/a.txt', content: falsa })
  expect(malo.deny).toBeDefined()
  const malo2 = await intentar($, on, { tool: 'Bash', command: 'rm -rf ~' })
  expect(malo2.deny).toBeDefined()
  const bueno = await intentar($, on, { tool: 'Bash', command: 'ls -la' })
  expect(bueno.deny).toBeUndefined()
})
