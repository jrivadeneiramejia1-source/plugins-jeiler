import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

RUTA = Path(__file__).resolve().parent.parent / "scripts" / "limpiar_flujo.py"
spec = importlib.util.spec_from_file_location("limpiar_flujo", RUTA)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

MALO = {
    "id": "abc123",
    "nodes": [
        {"name": "Hook", "type": "n8n-nodes-base.webhook", "webhookId": "11111111-2222-3333-4444-555555555555",
         "parameters": {"path": "mi-ruta-secreta"}},
        {"name": "HTTP", "type": "n8n-nodes-base.httpRequest",
         "credentials": {"httpHeaderAuth": {"id": "9", "name": "Cuenta real"}},
         "parameters": {"url": "https://mi.n8n.com/webhook/abcdef123456"}},
    ],
    "connections": {},
    "pinData": {"Hook": [{"json": {"telefono": "3101234567"}}]},
    "meta": {"instanceId": "zzz"},
}
BUENO = {"nodes": [{"name": "Set", "type": "n8n-nodes-base.set", "parameters": {}}], "connections": {}, "pinData": {}}


class Pruebas(unittest.TestCase):
    def test_flujo_malo_queda_limpio(self):
        limpio, avisos = mod.limpiar(json.loads(json.dumps(MALO)))
        texto = json.dumps(limpio)
        for prohibido in ("credentials", "webhookId", "3101234567", "mi-ruta-secreta", "abcdef123456", "instanceId"):
            self.assertNotIn(prohibido, texto)
        self.assertGreaterEqual(len(avisos), 4)

    def test_flujo_bueno_no_cambia(self):
        limpio, avisos = mod.limpiar(json.loads(json.dumps(BUENO)))
        self.assertEqual(limpio, BUENO)
        self.assertEqual(avisos, [])

    def test_no_toca_el_original_y_rechaza_lo_que_no_es_n8n(self):
        with tempfile.TemporaryDirectory() as d:
            ruta = Path(d) / "f.json"
            ruta.write_text(json.dumps(MALO), encoding="utf-8")
            self.assertEqual(mod.main(["x", str(ruta)]), 0)
            self.assertIn("credentials", ruta.read_text(encoding="utf-8"))
            self.assertTrue((Path(d) / "f.limpio.json").exists())
            otro = Path(d) / "o.json"
            otro.write_text('{"hola": 1}', encoding="utf-8")
            self.assertEqual(mod.main(["x", str(otro)]), 1)
            self.assertFalse((Path(d) / "o.limpio.json").exists())


if __name__ == "__main__":
    unittest.main()
