# seguridad-jeiler

Tres mods de seguridad.

- **Aviso de créditos:** antes de usar herramientas que pueden gastar (Higgsfield, Canva video, ElevenLabs, AudioPod) muestra un aviso. Solo avisa; no bloquea.
- **Guardián de n8n:** al guardar un flujo `.json` con credenciales, `pinData` (datos de prueba) o URL de webhook real, avisa; y bloquea el `git commit` si el flujo va así.
- **Escáner de datos personales:** avisa si un archivo trae teléfono, cédula o correo; bloquea el `git commit` si hay teléfono o cédula con forma colombiana. Los archivos `lock` se saltan.

Pueden dar falsas alarmas (un número largo que parece teléfono): en ese caso díselo a Claude y confirma que es inventado.

Instalar: `/plugin install seguridad-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler`
