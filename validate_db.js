import { db } from "./init-db.js";

const query = db.prepare(`SELECT * FROM sqlite_master ORDER BY name;`);
console.log(query.all());
query.close();

