#!/usr/bin/env python3
"""Limpia un flujo de n8n para subirlo a un repo público.

Quita: credenciales, pinData (datos de prueba), webhookId, ids de instancia y
rutas/URLs de webhook reales. NO modifica el archivo original: crea uno nuevo
con el sufijo .limpio.json.
Uso: python3 limpiar_flujo.py flujo.json
"""
import json
import re
import sys
from pathlib import Path

WEBHOOK_URL = re.compile(r"https?://[^\"\s]+/webhook(-test)?/[A-Za-z0-9-]{8,}")
SOSPECHOSO = re.compile(r"(bearer\s+[A-Za-z0-9._-]{16,}|api[_-]?key\s*[=:]\s*\S{12,}|ghp_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,})", re.I)


def limpiar(flujo: dict) -> tuple[dict, list[str]]:
    """Devuelve (flujo limpio, lista de cambios y avisos)."""
    avisos: list[str] = []
    for nodo in flujo.get("nodes", []):
        nombre = nodo.get("name", "?")
        if nodo.pop("credentials", None):
            avisos.append(f"quitadas credenciales de «{nombre}»")
        if nodo.pop("webhookId", None):
            avisos.append(f"quitado webhookId de «{nombre}»")
        params = nodo.get("parameters", {})
        if "webhook" in str(nodo.get("type", "")).lower() and params.get("path"):
            params["path"] = "ruta-de-ejemplo"
            avisos.append(f"ruta de webhook de «{nombre}» cambiada por un ejemplo")
    if flujo.get("pinData"):
        flujo["pinData"] = {}
        avisos.append("vaciado pinData (datos de prueba)")
    for clave in ("id", "versionId"):
        flujo.pop(clave, None)
    meta = flujo.get("meta")
    if isinstance(meta, dict):
        meta.pop("instanceId", None)
    texto = json.dumps(flujo, ensure_ascii=False)
    if WEBHOOK_URL.search(texto):
        texto = WEBHOOK_URL.sub("https://ejemplo.invalid/webhook/ruta-de-ejemplo", texto)
        flujo = json.loads(texto)
        avisos.append("URL de webhook real cambiada por un ejemplo")
    if SOSPECHOSO.search(texto):
        avisos.append("AVISO: parece haber una clave escrita dentro de un parámetro; revísala a mano")
    return flujo, avisos


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print(__doc__)
        return 2
    origen = Path(argv[1])
    flujo = json.loads(origen.read_text(encoding="utf-8"))
    if "nodes" not in flujo or "connections" not in flujo:
        print("Esto no parece un flujo de n8n (faltan nodes/connections). No se hizo nada.")
        return 1
    limpio, avisos = limpiar(flujo)
    destino = origen.with_name(origen.stem + ".limpio.json")
    destino.write_text(json.dumps(limpio, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Creado: {destino}")
    for a in avisos or ["nada que limpiar"]:
        print(" -", a)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
