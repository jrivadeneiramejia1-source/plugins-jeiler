# Reglas para trabajar en este repo (es público)
- Nada de datos de personas ni de clientes. Los ejemplos son inventados.
- Nunca pedir ni guardar claves, tokens ni contraseñas.
- Archivos de comunidades indígenas: no se modifican ni se suben a servicios externos.
- Nada que gaste plata o créditos sin el «sí» de Jeiler.
- Nada se publica solo; nunca a `main` directo (rama y PR; Jeiler dice «sí» antes de unir).
- Un bloqueo (mod) se prueba siempre con un caso bueno y uno malo: `claude plugin test plugins/<nombre>`.
- Responder a Jeiler en español simple y decir siempre qué quedó sin probar.

## Estructura
`plugins/<nombre>/` = un plugin (`.claude-plugin/plugin.json`, `agents/`, `commands/`, `skills/`, `hooks/` para los mods). `.claude-plugin/marketplace.json` lista los plugins.
Validar: `claude plugin validate plugins/<nombre>`.
