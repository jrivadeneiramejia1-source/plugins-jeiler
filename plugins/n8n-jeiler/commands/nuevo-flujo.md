---
description: Arma la base de un flujo de n8n (JSON) sin credenciales ni datos reales
argument-hint: <qué debe hacer el flujo>
model: sonnet
---
Flujo pedido: $ARGUMENTS

1. Si tienes las skills `n8n-workflow-patterns`, `plantillas-n8n` y `n8n-node-configuration` (plugin agent-skills-jeiler), úsalas. Si no, sigue lo de abajo.
2. Elige el patrón más simple (disparador → pasos → salida). Incluye un nodo de manejo de errores.
3. Entrega el JSON importable en n8n **sin** credenciales, **sin** `pinData` y con la ruta de webhook `ruta-de-ejemplo`. Donde haga falta una cuenta, deja una nota: «Conectar credencial: <servicio>».
4. Guarda el archivo nuevo como `<nombre-corto>.json` (no sobrescribas nada).
5. Termina con: qué hace cada nodo en una línea, y qué debe conectar Jeiler a mano.

Español simple. Di qué quedó sin probar (no hay n8n aquí para importarlo).
