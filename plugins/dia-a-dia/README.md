# dia-a-dia

Ordena tu día. Trae dos comandos y un panel con pendientes.

- `/buenos-dias`: resumen de tu Google Calendar y Gmail (solo lectura; necesita esos conectores).
- `/cierre-dia`: qué se hizo, qué falta y qué quedó sin probar.
- `/gasto`: anota un gasto o cobro en tu hoja de Drive.
- `/mi-dia`: abre el panel «Mi día». `/pendiente texto` agrega; `/hecho 2` marca; cada pendiente tiene un botón «Hecho». Se guardan entre sesiones.

No guarda claves ni envía nada por su cuenta.

Instalar: `/plugin install dia-a-dia --marketplace jrivadeneiramejia1-source/plugins-jeiler`

## /gasto
`/gasto gasto 20 mil cable HDMI` agrega una fila a tu hoja «Gastos Jeiler» de Drive (Fecha, Tipo, Valor, Descripción, Categoría). La hoja se busca por nombre; no se crea sola. En `plantillas/gastos-plantilla.csv` hay la plantilla vacía (sin datos). Tus gastos reales viven solo en Drive porque este repo es público.
