---
description: Tabla de tus repos: rama, cambios sin guardar y commits sin subir (solo lectura)
argument-hint: [carpeta con los repos]
allowed-tools: Bash(bash:*), Bash(git status:*), Bash(git branch:*)
model: haiku
---
Ejecuta `bash ${CLAUDE_PLUGIN_ROOT}/scripts/estado-repos.sh $ARGUMENTS` y muestra la tabla.
Luego, en 3 líneas máximo: cuáles repos tienen cambios sin guardar o commits sin subir, y cuáles están en `main` (avisar). No hagas commit, push ni cambies nada.
