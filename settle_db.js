import {db} from "./init-db.js";

db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS recibos_caja (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ciudad TEXT NOT NULL,
    fecha TEXT NOT NULL,
    pagado_a TEXT NOT NULL,
    valor INTEGER NOT NULL,
    concepto TEXT NOT NULL,
    valor_letras TEXT NOT NULL,
    documento TEXT NOT NULL,
    ndocumento TEXT NOT NULL,
    fecha_generacion TEXT DEFAULT CURRENT_TIMESTAMP,
    vigencia BOOLEAN
  )
`);

db.close();