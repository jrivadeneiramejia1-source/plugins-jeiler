# plugins-jeiler

Plugins y mods de Claude Code para el día a día de Jeiler. Un *plugin* es un paquete con comandos (`/algo`), ayudantes (subagentes), skills y mods; un *mod* cambia la interfaz o bloquea acciones.

## Instalar (en cualquier computador)
```
/plugin marketplace add jrivadeneiramejia1-source/plugins-jeiler
/plugin install modelos-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler
```
Cambia `modelos-jeiler` por el plugin que quieras.

| Plugin | Qué hace |
|---|---|
| `modelos-jeiler` | Opus planea (`/planear`), Sonnet ejecuta (`/ejecutar`), Haiku responde lo simple (`/rapido`). Mod: en Opus no deja editar fuera de `.planes/`. |
| `reglas-jeiler` | Mod guardián: bloquea subir a `main`, tocar carpetas indígenas (nombres con `consulta-previa` o `indígena`), `rm -rf` peligrosos y claves en el código. Muestra rama y cambios sin subir. |
| `dia-a-dia` | `/buenos-dias`, `/cierre-dia`, panel «Mi día» (`/pendiente`, `/hecho`). |
| `soporte-tecnico` | `/diagnostico`, informe de servicio, inventario; script de Windows que solo lee. |
| `apps-jeiler` | `/estado-repos`, `/antes-de-subir`, `/actualizar-drive` (solo si lo pides), agente `auditor`. |
| `seguridad-jeiler` | Aviso antes de gastar créditos, guardián de flujos n8n y escáner de teléfonos/cédulas/correos. |
| `comodidad-jeiler` | Semáforo de contexto, recordatorio «sin probar», `/bitacora`, sugerir modelo y aviso al terminar. |
| `n8n-jeiler` | `/nuevo-flujo`, `/revisar-flujo`, `/limpiar-flujo` (script con pruebas) y agente revisor. |
| `clientes-jeiler` | `/cotizar`, `/briefing`, `/acta-entrega`, `/mensaje-cliente`. |
| `agentes-ia-jeiler` | `/elegir-api-gratis`, `/costo-estimado`, `/nuevo-agente`. |
| `aprender-jeiler` | Modo aprendizaje y `/glosario` (se guarda en tu hoja «Glosario Jeiler» de Drive). |
| `agent-skills-jeiler`, `app-skills-jeiler`, `apk-skills-jeiler`, `servicios-skills-jeiler`, `video-crear-jeiler`, `video-editar-jeiler` | Tus repos de skills, instalables como plugin (cada repo tiene su `plugin.json`; funcionan cuando se une su PR). |

## Qué está probado y qué no
**Probado de verdad (sesiones reales de Claude Code):**
- Instalar desde GitHub el marketplace y los plugins (incluidos los repos de skills).
- Bloqueo en Opus: no deja crear archivos en Opus y sí en Sonnet.
- `reglas-jeiler`: bloquea `git push origin main`, borrar en carpetas `consulta-previa`/`indígena` y claves en archivos.
- `seguridad-jeiler`: bloquea un `git commit` con teléfono; deja pasar uno limpio y subir una rama.
- Comandos `/limpiar-flujo` y `/estado-repos` con su script.
- Hojas de Drive: buscar por nombre, leer, agregar fila y limpiar (lo que hacen `/gasto` y `/glosario`).
- `/buenos-dias`: las consultas a Calendar y Gmail funcionan.
- Todos los mods pasan `claude plugin test`, `claude plugin validate` y la revisión de tipos con `tsc`.
- El script de Windows: sintaxis correcta y no se rompe cuando no puede leer algo.

**Sin probar (se necesita verlo en pantalla o en Windows):**
- Cómo se dibujan la banda (semáforo y «sin probar»), el panel «Mi día», los avisos y la notificación al terminar.
- Que el script de Windows imprima datos reales en un PC con Windows.
- `/publicar-app` (los subcomandos de wrangler existen, pero no se publicó nada).
- Los comandos de clientes, agentes y n8n que solo generan texto: su formato es válido, su calidad se ve usándolos.
