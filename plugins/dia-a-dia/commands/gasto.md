---
description: Anota un gasto o cobro en tu hoja «Gastos Jeiler» con una frase
argument-hint: <ej. gasto 20 mil cable HDMI>
allowed-tools: mcp__Google_Drive__search_files, mcp__Google_Sheets__get_spreadsheet, mcp__Google_Sheets__append_values
model: haiku
---
Frase: $ARGUMENTS

1. Entiende: **Tipo** (gasto o cobro), **Valor** en pesos colombianos (`20 mil` = 20000, `1,5 millones` = 1500000), **Descripción** corta y **Categoría**.
   Categorías: Repuestos, Transporte, Herramientas, Servicios digitales, Comida, Otros (elige la más probable; Jeiler puede agregar más).
2. Si falta el tipo o el valor, o el valor es dudoso, pregunta antes de escribir. No inventes.
3. Busca en Drive la hoja «Gastos Jeiler». Si no existe, dilo y para.
4. Lee el nombre de su primera pestaña y agrega UNA fila con `append_values`: `Fecha de hoy (AAAA-MM-DD, hora de Colombia) | Tipo | Valor | Descripción | Categoría`. El valor va como número, sin puntos ni «$».
5. Responde con una línea: «Anotado: <fecha> · <tipo> · $<valor> · <descripción> · <categoría>».
No borres ni cambies filas. Los datos reales quedan solo en Drive; nunca en repos públicos.
