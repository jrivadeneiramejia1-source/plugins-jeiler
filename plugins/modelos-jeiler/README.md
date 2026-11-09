# modelos-jeiler

Opus planea, Sonnet ejecuta, Haiku responde lo simple.

- `/planear <tarea>` (Opus): guarda el plan en `.planes/`, no cambia nada más.
- `/ejecutar` (Sonnet): sigue el plan más reciente paso a paso.
- `/rapido <pregunta>` (Haiku): respuesta corta y barata.
- Agentes `planificador` (Opus, solo lee), `ejecutor` (Sonnet) y `rapido` (Haiku).
- Skills `elegir-modelo` y `explicar-simple`.
- Mod: si estás en Opus, no deja editar archivos fuera de `.planes/` ni hacer commit/push/borrar; y la barra muestra el modelo (una línea por plugin, no choca con la de `reglas-jeiler`). Para ejecutar, cámbiate a Sonnet con `/model`.

Claude no se cambia de modelo solo: lo haces tú con `/model`.

Instalar: `/plugin install modelos-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler`
