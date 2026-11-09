---
description: Publica una app en Cloudflare por pasos: pruebas, versión de prueba, tu «sí» y producción
disable-model-invocation: true
model: sonnet
---
Publicar la app del repositorio actual en Cloudflare. **No pases al paso 4 sin un «sí» explícito de Jeiler en esta conversación.**

1. **Antes:** rama distinta de `main`; sin cambios sin guardar (`git status`); corre las pruebas si existen; revisa que no haya claves ni datos personales (como en `/antes-de-subir`). Si algo falla, para y dilo.
2. **Detecta el tipo:** si hay `wrangler.toml` o `wrangler.jsonc` → Worker; si es una carpeta estática (HTML/JS, `_headers`) → Pages. Si dudas, pregunta.
3. **Versión de prueba (no es producción):**
   - Worker: `npx wrangler versions upload` (sube una versión sin activarla). [P]
   - Pages: `npx wrangler pages deploy <carpeta> --branch=prueba` (da una URL de prueba). [P]
   Muestra la URL o el id de versión y qué revisar. **Detente y pregunta:** «¿La subo a producción?»
4. **Producción, solo con «sí»:** Worker: `npx wrangler versions deploy` o `npx wrangler deploy`; Pages: `npx wrangler pages deploy <carpeta> --branch=main`. [P]
5. Cierra con la URL pública y cómo volver atrás (en el panel de Cloudflare: Deployments → Rollback).

Reglas: nunca pidas ni guardes tokens; si wrangler pide iniciar sesión, Jeiler corre `npx wrangler login` él mismo. Di qué quedó sin probar. Español simple.
