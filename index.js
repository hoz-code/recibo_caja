import express from "express";
import path from "path";

import { fileURLToPath } from "url";
import { db } from "./init-db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8081;


// Middleware obligatorio para poder recibir JSON en req.body
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());





app.get('/a', (req, res) => {
    console.log("Data received get:");
    res.send({ "response": "Data received successfully" });
})

app.post('/save', (req, res) => {

    const {
        ciudad, fecha, pagado_a, valor,
        concepto, valor_letras, documento,
        nDocumento
    } = req.body;
    const vigencia = true; // Asignar un valor predeterminado a vigencia
    
    const querySave = `INSERT INTO recibos_caja (
        ciudad, fecha, pagado_a, 
        valor, concepto, valor_letras, 
        documento, ndocumento, vigencia) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const statement = db.prepare(querySave);
        const result = statement.run(
            ciudad, fecha, pagado_a,
            valor, concepto, valor_letras,
            documento, nDocumento, vigencia
        );

        console.log("Data saved successfully:", result.lastInsertRowid);
        res.status(200).json({
            message: "Data saved successfully",
            id: result.lastInsertRowid
        });

    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).json({
            message: "Error saving data",
            error: error.message
        });
    }


})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})