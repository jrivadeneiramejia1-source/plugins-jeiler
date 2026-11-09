---
description: Revisión antes de subir una rama: pruebas, claves, datos personales y licencias
model: sonnet
---
Revisa el repositorio actual ANTES de subir. Solo leer y correr pruebas; no hagas commit ni push.

1. `git status` y `git diff` (qué cambia).
2. Busca claves, tokens, contraseñas, teléfonos, cédulas o nombres de personas en el diff. Si hay, muéstralo SIN imprimir el valor completo.
3. Si hay pruebas (`package.json`, `tests/`), córrelas y reporta pasan/fallan.
4. Si se copió algo de terceros: ¿tiene licencia abierta y está en `third-party/`?
5. Confirma que la rama NO es `main`.

Resultado: lista de 5 líneas con ✔ (se comprobó y está bien), ✘ (falló) o ⚠ (no había nada que comprobar, por ejemplo no hay pruebas) y qué quedó sin probar. No pongas ✔ si no verificaste nada. Español simple. Subir solo con el «sí» de Jeiler.
