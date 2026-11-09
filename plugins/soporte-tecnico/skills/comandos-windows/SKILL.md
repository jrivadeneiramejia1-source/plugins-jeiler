---
name: comandos-windows
description: Comandos de Windows explicados y seguros para diagnosticar y reparar (red, disco, archivos del sistema, batería). Usar cuando Jeiler necesite un comando para un PC con Windows.
---
# Comandos de Windows (todos [P]: práctica común, sin probar aquí)

Abrir **Símbolo del sistema** o **PowerShell** «como administrador» (clic derecho → *Ejecutar como administrador*).

| Para qué | Comando | Qué hace / ojo |
|---|---|---|
| Ver la red | `ipconfig /all` | Muestra IP, puerta de enlace y DNS. Solo lee. |
| ¿Hay internet? | `ping 8.8.8.8` y luego `ping google.com` | Si el primero responde y el segundo no, el problema es el DNS. |
| Ver por dónde sale | `tracert google.com` | Muestra los saltos hasta el destino. |
| Reparar archivos del sistema | `sfc /scannow` | Tarda; no lo interrumpas. |
| Reparar la imagen de Windows | `DISM /Online /Cleanup-Image /RestoreHealth` | Úsalo si `sfc` no pudo arreglar todo. Necesita internet. |
| Revisar el disco | `chkdsk C:` (solo lee) · `chkdsk C: /f` (repara) | `/f` pide reiniciar y puede tardar horas; haz respaldo antes. |
| Salud de discos | `Get-PhysicalDisk` (PowerShell) | `HealthStatus` debe decir `Healthy`. |
| Informe de batería | `powercfg /batteryreport` | Crea un HTML con el desgaste de la batería. |
| Qué arranca con Windows | `Get-CimInstance Win32_StartupCommand` (PowerShell) | Solo lee. |

**No usar sin permiso del dueño:** `format`, `del /s`, `diskpart clean`, `netsh wlan show profile ... key=clear` (muestra contraseñas de wifi guardadas).
Antes de cualquier reparación: respaldo (skill `respaldo-y-formateo`) y cambia una cosa a la vez.
