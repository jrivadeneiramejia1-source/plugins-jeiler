---
name: redes-e-impresoras
description: Diagnóstico de wifi, internet e impresoras en Windows (sin internet, impresora que no imprime, cola trabada). Usar cuando el problema sea red o impresión.
---
# Redes e impresoras ([P] práctica común, sin probar aquí)

## Sin internet — de lo fácil a lo difícil
1. ¿Otro dispositivo en la misma red sí tiene internet? Si no, es el router o el proveedor: reinicia el router (apagar 30 s).
2. ¿El PC está en modo avión o sin wifi activado?
3. `ipconfig /all`: si la IP empieza por `169.254`, no recibió IP del router.
4. `ping 8.8.8.8` responde pero `ping google.com` no → cambiar DNS (por ejemplo a 8.8.8.8 y 1.1.1.1 en las propiedades del adaptador).
5. Último recurso: `netsh winsock reset` y `netsh int ip reset` (piden reiniciar); anota lo que cambias.

## Impresora que no imprime
1. ¿Está encendida, con papel, cable o wifi bien y sin luces de error?
2. ¿Es la impresora predeterminada y no está «sin conexión»?
3. Cola trabada: en administrador, `net stop spooler`, borra los archivos de `C:\Windows\System32\spool\PRINTERS`, luego `net start spooler`.
4. Reinstalar el controlador (driver) desde la página del fabricante.
5. Impresora por red: haz `ping` a su IP; si cambió la IP, fíjale una fija en el router.

Siempre anota en el informe (skill `informe-servicio`) qué se probó y qué resultado dio.
