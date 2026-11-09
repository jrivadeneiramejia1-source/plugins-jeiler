---
name: respaldo-y-formateo
description: Respaldo antes de formatear y lista de tareas después (drivers, programas, activación legal). Usar cuando se vaya a formatear o reinstalar Windows en un equipo.
---
# Respaldo y formateo ([P] práctica común, sin probar aquí)

## Antes de formatear
1. **Pregunta al dueño qué es importante** (documentos, fotos, correos, contraseñas del navegador, licencias) y confirma por escrito que quiere formatear.
2. Respaldo en un disco externo o nube **del cliente**: carpetas `Documentos`, `Escritorio`, `Descargas`, `Imágenes`, `Videos`, y datos de programas (correo, WhatsApp de escritorio).
3. Comando seguro (copia sin borrar nada del destino): `robocopy C:\Users\NOMBRE\Documents D:\Respaldo\Documents /E /R:1 /W:1 /XJ`. No uses `/MIR`: borra en el destino.
4. Comprueba que el respaldo abre (abre 2 o 3 archivos y compara el tamaño total).
5. Apunta la clave de Windows/Office **que ya tenga el cliente** (no uses programas pirata) y el modelo exacto del equipo para bajar drivers.
6. Descarga los drivers (red primero) a una USB antes de empezar.

## Después de formatear
1. Windows Update hasta que no queden pendientes.
2. Drivers: red, video, audio, chipset (de la página del fabricante).
3. Activación **legal** con la licencia del cliente. Si no tiene, díselo; no instales activadores.
4. Programas básicos (navegador, lector de PDF, ofimática, antivirus) desde su sitio oficial.
5. Restaurar el respaldo y comprobar que todo está.
6. Informe de servicio con lo hecho (skill `informe-servicio`).

**Nunca** formatear sin respaldo confirmado ni sin permiso escrito del dueño.
