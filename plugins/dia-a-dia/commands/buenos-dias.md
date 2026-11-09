---
description: Resumen de tu día: eventos de Calendar y correos importantes (solo lectura)
allowed-tools: mcp__Google_Calendar__list_events, mcp__Google_Calendar__list_calendars, mcp__Gmail__search_threads, mcp__Gmail__get_thread
model: sonnet
---
Haz mi resumen de hoy, SOLO LEYENDO (no envíes, borres, respondas ni marques nada).

1. **Calendar:** `list_events` de hoy y mañana con `timeZone: "America/Bogota"` (mi calendario guarda la hora en UTC y puede correr los eventos), `startTime` a las 00:00 de hoy, `endTime` a las 00:00 de pasado mañana, `orderBy: "startTime"`. Si no hay eventos, dilo en una línea.
2. **Gmail:** `search_threads` con `query: "is:unread newer_than:2d in:inbox -category:promotions"`, `pageSize: 15` y `view: "THREAD_VIEW_SUMMARY"`. Los resultados son vistas previas: si un correo parece importante y el resumen no alcanza, léelo con `get_thread`.
   - **Urgentes:** alertas de seguridad (nuevo inicio de sesión), pagos, clientes, fechas límite.
   - **Pedidos y envíos:** una sola línea con el estado más reciente de cada pedido.
   - **Ruido:** newsletters y ofertas; solo di cuántos hay.
3. Si el panel «Mi día» tiene pendientes, recuérdamelos con `/mi-dia`.

Formato: 3 secciones cortas («Hoy», «Correos», «Pendientes»), una línea por cosa, español simple. No copies el contenido completo de los correos. Si un conector no responde, dilo en una línea y sigue con lo demás.
