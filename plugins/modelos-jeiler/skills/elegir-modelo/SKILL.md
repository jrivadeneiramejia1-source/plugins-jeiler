---
name: elegir-modelo
description: Decide qué modelo usar (Opus, Sonnet o Haiku) según la tarea. Usar cuando Jeiler pregunte con qué modelo trabajar o cuando una tarea cambie de planear a ejecutar.
---
# Elegir modelo

| Tarea | Modelo | Por qué |
|---|---|---|
| Planear, decidir, revisar riesgos, arquitectura | **Opus** | Razona mejor; cuesta más, así que solo piensa y no edita |
| Editar archivos, correr pruebas, seguir un plan | **Sonnet** | Rápido y barato para ejecutar |
| Preguntas cortas, significados, buscar un archivo | **Haiku** | Lo más barato para lo simple |

Flujo de Jeiler: `/planear` (Opus) → el plan queda en `.planes/` → Jeiler cambia a Sonnet con `/model` → `/ejecutar`.

Claude no puede cambiarse de modelo solo: lo cambia Jeiler con `/model`. Los comandos `/planear`, `/ejecutar` y `/rapido` fijan su propio modelo mientras corren.

Si dudas entre dos modelos, elige el más barato que pueda hacerlo bien y dilo en una frase.
