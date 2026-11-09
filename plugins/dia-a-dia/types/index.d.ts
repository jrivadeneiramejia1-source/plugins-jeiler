export type Pendiente = { id: number; texto: string; hecho: boolean }

declare module 'claude-code' {
  interface PluginState {
    'dia-a-dia': { pendientes: Shaped<Pendiente[]> }
  }
}
