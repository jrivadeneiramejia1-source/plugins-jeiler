---
description: Estima cuánto costaría una tarea con IA antes de correrla
argument-hint: <tarea y tamaño, ej. "resumir 200 mensajes al día">
model: haiku
---
Tarea: $ARGUMENTS

Método: tokens ≈ caracteres ÷ 4. Costo = (tokens de entrada × precio de entrada + tokens de salida × precio de salida) ÷ 1.000.000.

Precios por millón de tokens (entrada/salida), vistos el 2026-11-09 en el repo `claude-octopus1` [pueden haber cambiado; confírmalos en la página de precios de Anthropic]:
- Sonnet 5.5: 2 USD de entrada y 10 USD de salida
- Opus 5.5: 4 USD de entrada y 20 USD de salida
- Haiku: **desconocido** (no inventes un precio; pídeselo a Jeiler o déjalo como «desconocido»).

No leas archivos del computador para esto: usa solo estos precios y lo que Jeiler te dé. Si el texto de la tarea no se entiende, pregunta.
Entrega: supuestos (cuántas veces, tamaño), costo por vez, por día y por mes en dólares, y una opción más barata. Para pesos colombianos pregunta la tasa de cambio del día; no la inventes. Español simple y breve.
