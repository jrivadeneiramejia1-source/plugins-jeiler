export type SinProbar = boolean

declare module 'claude-code' {
  interface PluginState {
    'comodidad-jeiler': { sinProbar: SinProbar }
  }
}
