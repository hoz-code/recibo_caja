import { db } from "./init-db.js";

const query = db.prepare(`SELECT * FROM recibos_caja;`);
console.log(query.all());
query.close();

