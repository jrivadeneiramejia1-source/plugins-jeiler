---
description: Quita credenciales, pinData y webhooks reales de un flujo, en un archivo nuevo
argument-hint: <ruta del flujo .json>
allowed-tools: Bash(python3:*)
model: haiku
---
Ejecuta: `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/limpiar_flujo.py $ARGUMENTS`

El script NO toca el original: crea `<nombre>.limpio.json`. Muestra su salida tal cual. Si dice «AVISO», di cuál parámetro revisar a mano. No hagas commit ni subas nada.
