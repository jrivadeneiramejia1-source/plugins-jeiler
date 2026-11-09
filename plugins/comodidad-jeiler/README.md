# comodidad-jeiler

Cinco mods de comodidad.

- **Semáforo de contexto:** banda sobre el prompt cuando la conversación llega al 70 % o más (usa `/compact` o abre sesión nueva).
- **Recordatorio «sin probar»:** si un turno editó código y no se corrieron pruebas, la banda lo recuerda.
- **Bitácora:** anota los archivos tocados en cada turno (guarda hasta 300 entradas, hora de Colombia). `/bitacora` muestra lo de hoy; pégala en `/cierre-dia`.
- **Sugerir modelo:** un aviso corto (cada 3 prompts) si el texto parece para Haiku, Sonnet u Opus.
- **Aviso al terminar:** aviso emergente (y notificación del sistema, si tu terminal la permite) cuando un turno dura más de 60 segundos. No hay sonido: solo funciona en macOS.

Todo se guarda en la sesión y en el almacén del mod; no se envía nada fuera.

Instalar: `/plugin install comodidad-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler`
