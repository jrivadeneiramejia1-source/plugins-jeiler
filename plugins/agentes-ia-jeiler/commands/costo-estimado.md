---
description: Estima cuánto costaría una tarea con IA antes de correrla
argument-hint: <tarea y tamaño, ej. "resumir 200 mensajes al día">
model: haiku
---
Tarea: $ARGUMENTS

Método: tokens ≈ caracteres ÷ 4. Costo = (tokens de entrada × precio de entrada + tokens de salida × precio de salida) ÷ 1.000.000.
Precios por millón de tokens (entrada/salida), vistos en `claude-octopus1/CLAUDE.md` [F, pueden haber cambiado]: Sonnet 5.5 = $2/$10, Opus 5.5 = $4/$20. Haiku no aparece ahí: pregúntalo o márcalo como desconocido.
Entrega: supuestos (cuántas veces, tamaño), costo por vez, por día y por mes en dólares y en pesos (pregunta la tasa de cambio, no la inventes), y una opción más barata. Español simple.
