import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Pendiente } from '../types'

const PANEL = 'mi-dia'
const pendientes = atom({ plugin: 'dia-a-dia', key: 'pendientes' } as const, [], {
  shape: 'pendientes-1',
})

async function guardar($: any, lista: Pendiente[]): Promise<void> {
  await $.store.set('pendientes', lista)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const guardados = await $.store.get('pendientes')
    if (Array.isArray(guardados)) await update($, pendientes, () => guardados as Pendiente[])
    await $.command.register({ name: 'mi-dia', description: 'Abre el panel Mi día' })
    await $.command.register({ name: 'pendiente', description: 'Agrega un pendiente: /pendiente comprar cable' })
    await $.command.register({ name: 'hecho', description: 'Marca un pendiente como hecho: /hecho 2' })
    return next(e)
  })

  on('command.run', { command: 'mi-dia' }, async $ => {
    await $.ui.open({ id: PANEL, title: 'Mi día' })
    return { text: 'Panel Mi día abierto.' }
  })

  on('command.run', { command: 'pendiente' }, async ($, e) => {
    const texto = e.args.trim()
    if (!texto) return { text: 'Escribe el pendiente: /pendiente comprar cable' }
    const lista = await update($, pendientes, l => [...l, { id: Date.now(), texto, hecho: false }].slice(-100))
    await guardar($, lista)
    return { text: `Agregado: ${texto}` }
  })

  on('command.run', { command: 'hecho' }, async ($, e) => {
    const n = Number(e.args.trim())
    const actual = await read($, pendientes)
    const objetivo = actual[n - 1]
    if (!objetivo) return { text: 'Dime el número del pendiente: /hecho 2' }
    const lista = await update($, pendientes, l => l.map(p => (p.id === objetivo.id ? { ...p, hecho: true } : p)))
    await guardar($, lista)
    return { text: `Hecho: ${objetivo.texto}` }
  })

  on('ui.render', { component: 'Pane', requestId: PANEL }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const lista = await read($, pendientes)
    return (
      <Box flexDirection="column">
        {lista.length === 0 && <Text dimColor>Sin pendientes. Usa /pendiente texto.</Text>}
        {lista.map((p, i) => (
          <Box key={`p${p.id}`}>
            <Text dimColor={p.hecho}>
              {i + 1}. {p.hecho ? '✔' : '○'} {p.texto}{' '}
            </Text>
            <Button
              key={`b${p.id}`}
              label={p.hecho ? 'Reabrir' : 'Hecho'}
              onPress={async () => {
                const nueva = await update($, pendientes, l => l.map(x => (x.id === p.id ? { ...x, hecho: !x.hecho } : x)))
                await guardar($, nueva)
              }}
            />
          </Box>
        ))}
      </Box>
    )
  })
}
