---
description: Guía de diagnóstico de un equipo con síntoma (lento, no enciende, sin internet...)
argument-hint: <síntoma, ej. "el PC está lento">
model: sonnet
---
Síntoma: $ARGUMENTS

Usa la skill `diagnostico-equipo`. Entrega:
1. Las 3 causas más probables, de más a menos común.
2. Pasos de revisión del más fácil al más difícil (máximo 6), cada uno con qué mirar y qué significa.
3. Qué NO hacer todavía (formatear, borrar, abrir el equipo sin respaldo).
4. Si hace falta datos del PC, indica el script `scripts/diagnostico-windows.ps1` (solo lee) y cómo ejecutarlo.

Español simple; si usas un término técnico, explícalo en pocas palabras. No inventes datos del equipo: pregunta lo que falte (marca, Windows, ruido, luces).
