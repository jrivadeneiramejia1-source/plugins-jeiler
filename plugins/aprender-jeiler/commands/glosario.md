---
description: Explica una palabra técnica y la guarda en tu hoja «Glosario Jeiler» de Drive
argument-hint: <palabra o concepto>
allowed-tools: mcp__Google_Drive__search_files, mcp__Google_Sheets__get_spreadsheet, mcp__Google_Sheets__get_values, mcp__Google_Sheets__append_values
model: sonnet
---
Palabra: $ARGUMENTS

1. Busca en Drive la hoja de cálculo «Glosario Jeiler» (`title contains 'Glosario Jeiler'`, tipo hoja, no en papelera). Si no existe, dilo y para: no la crees sin preguntar.
2. Lee el nombre de su primera pestaña (get_spreadsheet con `sheets.properties.title`) y las filas (get_values).
3. **Si la palabra ya está:** muestra su explicación y ejemplo guardados, y explica menos (aplica la skill `modo-aprendizaje`). No agregues fila repetida.
4. **Si no está:** explícala con la skill `modo-aprendizaje` (una frase + ejemplo de la vida diaria) y agrega UNA fila al final con `append_values`: `Palabra | Qué es | Ejemplo | Fecha de hoy (AAAA-MM-DD, hora de Colombia)`.
5. Termina con una línea: «Guardado en Glosario Jeiler» o «Ya estaba».
No borres ni cambies filas existentes. Español simple.
