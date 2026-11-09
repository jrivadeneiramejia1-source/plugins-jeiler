# reglas-jeiler

Mod guardián. Bloquea, con un aviso en español:

- subir a `main`/`master` o subir a la fuerza (`--force`);
- modificar o borrar archivos de rutas con `consulta-previa` o `indígena` (crear archivos nuevos sí se puede);
- `rm -rf` sobre `/`, `~`, `*` o `.`;
- claves o tokens en archivos, comandos o en lo que se va a guardar con `git commit`.

La barra muestra la rama y los cambios sin subir (⚠ si estás en main). Si la revisión falla, por seguridad no deja ejecutar.

Instalar: `/plugin install reglas-jeiler --marketplace jrivadeneiramejia1-source/plugins-jeiler`
