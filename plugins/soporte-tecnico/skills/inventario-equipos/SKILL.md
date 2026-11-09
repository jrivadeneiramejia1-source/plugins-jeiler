---
name: inventario-equipos
description: Arma una hoja de inventario de equipos (columnas, estados, fechas de mantenimiento). Usar cuando Jeiler quiera llevar el control de computadores o piezas.
---
# Inventario de equipos

Columnas recomendadas (hoja de cálculo): `Código | Tipo | Marca/Modelo | Ubicación o área | Estado (bueno/regular/malo) | Último mantenimiento | Próximo mantenimiento | Observaciones`.

- Un código corto por equipo (ej. `PC-001`), pegado en el equipo.
- «Próximo mantenimiento» = último + 6 meses (preventivo) salvo que se diga otra cosa. [P]
- Usa la skill `xlsx` para crear el archivo; guárdalo **fuera** de repos públicos si tiene datos reales.
- No pongas nombres de personas; usa el área.
