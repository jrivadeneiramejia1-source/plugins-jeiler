---
description: Plantilla de un agente con IA (qué hace, herramientas, límites y seguridad)
argument-hint: <qué debe hacer el agente>
model: sonnet
---
Agente: $ARGUMENTS

Usa las skills `crear-agente` y `seguridad-agentes` si están. Entrega una plantilla corta:
1. Objetivo en una frase.
2. Herramientas que necesita (solo las mínimas).
3. Qué NO puede hacer (gastar, borrar, publicar sin «sí»).
4. Dónde corre (n8n, Cloudflare Worker, etc.) y dónde van las claves (Secrets; nunca en el código).
5. Cómo se prueba con un caso bueno y uno malo.
6. Costo aproximado por mes: un rango en dólares con tus supuestos; para el cálculo exacto, Jeiler puede usar `/costo-estimado`. No inventes precios de modelos que no conozcas.

**Tu respuesta final debe traer las 6 secciones**, aunque hagas cálculos antes. Español simple. No crees archivos ni nada más: solo la plantilla.
