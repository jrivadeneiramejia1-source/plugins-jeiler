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

## Qué está probado y qué no
Ver cada README. Los mods tienen pruebas con caso bueno y malo (`claude plugin test`). Sin probar en una sesión real: cómo se ve la barra de estado, el panel «Mi día» en pantalla, el script de PowerShell (no había Windows) y el comando `/buenos-dias` con tus cuentas.
