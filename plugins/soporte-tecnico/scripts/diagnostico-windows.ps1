# Recoge datos del equipo. SOLO LEE: no cambia nada, no instala nada, no envía nada.
# Uso (PowerShell):  powershell -ExecutionPolicy Bypass -File diagnostico-windows.ps1
# Crea un archivo de texto nuevo "diagnostico-FECHA.txt" en la carpeta actual.
$ErrorActionPreference = 'SilentlyContinue'
$salida = Join-Path (Get-Location) ("diagnostico-{0}.txt" -f (Get-Date -Format 'yyyyMMdd-HHmm'))

function Seccion($titulo, $bloque) {
    "`n=== $titulo ===" | Out-File $salida -Append -Encoding UTF8
    try { & $bloque | Out-String | Out-File $salida -Append -Encoding UTF8 }
    catch { "No se pudo leer: $titulo" | Out-File $salida -Append -Encoding UTF8 }
}

"Diagnóstico generado el $(Get-Date)" | Out-File $salida -Encoding UTF8
Seccion 'Sistema' { Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber, OSArchitecture, LastBootUpTime }
Seccion 'Equipo' { Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model, TotalPhysicalMemory }
Seccion 'Procesador' { Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, LoadPercentage }
Seccion 'Memoria RAM libre (KB)' { Get-CimInstance Win32_OperatingSystem | Select-Object FreePhysicalMemory, TotalVisibleMemorySize }
Seccion 'Discos (espacio)' { Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" | Select-Object DeviceID, @{n='LibreGB';e={[math]::Round($_.FreeSpace/1GB,1)}}, @{n='TotalGB';e={[math]::Round($_.Size/1GB,1)}} }
Seccion 'Salud de discos' { Get-PhysicalDisk | Select-Object FriendlyName, MediaType, HealthStatus, OperationalStatus }
Seccion 'Red (IP)' { Get-NetIPConfiguration | Select-Object InterfaceAlias, IPv4Address, IPv4DefaultGateway }
Seccion 'Antivirus' { Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct | Select-Object displayName }
Seccion 'Actualizaciones recientes' { Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5 HotFixID, InstalledOn }
Seccion 'Programas que arrancan con Windows' { Get-CimInstance Win32_StartupCommand | Select-Object Name, Command }
Seccion 'Errores críticos del sistema (últimos 10)' { Get-WinEvent -FilterHashtable @{LogName='System'; Level=1,2} -MaxEvents 10 | Select-Object TimeCreated, ProviderName, Id }

Write-Host "Listo. Archivo creado: $salida"
Write-Host "Ojo: tiene el nombre del equipo. No lo subas a repos públicos."
