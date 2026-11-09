---
name: diagnostico-equipo
description: Diagnóstico ordenado de computadores con fallas (lento, no enciende, sin internet, pantalla, ruido, calentamiento). Usar cuando Jeiler describa un síntoma de un equipo.
---
# Diagnóstico de equipos

**Orden fijo: lo más fácil y menos riesgoso primero.** [P] regla práctica, sin verificar con fuente.

1. **Pregunta lo básico:** marca/modelo, Windows u otro, desde cuándo, qué cambió (instalación, golpe, corte de luz).
2. **Respaldo antes de tocar:** si el equipo enciende, confirma que hay copia de lo importante.
3. **Revisión rápida:** cables y cargador, luces, ruidos, temperatura, espacio libre en disco, programas que arrancan al inicio.
4. **Datos:** correr `scripts/diagnostico-windows.ps1` (solo lee) y leer: disco casi lleno, RAM baja, estado del disco, errores críticos.
5. **Causa y arreglo:** una causa a la vez; cambia una cosa y vuelve a probar.
6. **Cierre:** registrar en el informe (skill `informe-servicio`).

## Síntomas comunes
| Síntoma | Causas probables | Primero revisar |
|---|---|---|
| Lento | Disco casi lleno, poca RAM, muchos programas al inicio, disco dañado | Espacio libre, administrador de tareas, salud del disco |
| No enciende | Cargador/batería, fuente, RAM floja | Cargador probado, luces, quitar y poner RAM |
| Sin internet | Router, cable, controlador, IP | Otro dispositivo en la misma red, reiniciar router |
| Se calienta/apaga | Polvo, pasta térmica, ventilador | Limpieza, temperatura, ruido del ventilador |

## Nunca sin permiso del dueño
Formatear, borrar archivos, cambiar contraseñas, instalar programas no pedidos.
