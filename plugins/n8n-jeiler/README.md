# n8n-jeiler

Para trabajar flujos de n8n más rápido y sin exponer datos.

- `/nuevo-flujo <qué hace>`: base del flujo en JSON, sin credenciales ni datos reales.
- `/revisar-flujo <archivo>`: errores, manejo de fallos y datos expuestos (agente `revisor-n8n`).
- `/limpiar-flujo <archivo>`: crea `<nombre>.limpio.json` sin credenciales, `pinData`, `webhookId` ni webhooks reales. No toca el original. Pruebas: `python3 -I -m unittest discover -s tests`.

Funciona mejor con las skills de n8n de `agent-skills-jeiler`, pero no las exige.

Instalar: `/plugin install n8n-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler`
