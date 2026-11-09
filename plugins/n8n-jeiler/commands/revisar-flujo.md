---
description: Revisa un flujo de n8n: errores, manejo de fallos, seguridad y datos expuestos
argument-hint: <ruta del flujo .json>
model: sonnet
---
Revisa el flujo: $ARGUMENTS (solo leer, no cambiar nada).

Usa el agente `revisor-n8n`. Si tienes las skills `revisar-flujo-n8n`, `n8n-validation-expert` y `n8n-error-handling`, aplícalas.
Entrega una lista corta: problema → nodo → cómo arreglarlo, de lo más grave a lo menos. Marca aparte lo que NO debe subirse al repo (credenciales, pinData, webhooks reales; sugiere `/limpiar-flujo`).
Español simple.
