
let btn_save = document.getElementById('guardar');

btn_save.addEventListener('click', async () => {

    const confiFetch = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(getData()) };
    console.log(confiFetch);
    try {
        const response = await fetch('http://localhost:8081/save', confiFetch);
        const data = await response.json();
        if (response.ok) {
            console.log("¡Éxito!", data);
        } else {
            console.error("Error controlado por el servidor:", data);
        }
    }
    catch (error) {
        console.error('Error: xxxxxxxx', error.message);
    }


    function getData() {
        let documentoTipo;
        if (!document.getElementById('cc').checked && !document.getElementById('nit').checked) {
            alert('Por favor, selecciona si el documento es C.C. o NIT.');
            document.getElementById('cc').focus(); // Enfoca la atención en la opción
            return; // Detiene la ejecución para que no se guarde
        } else {
            if (document.getElementById('cc').checked) {
                documentoTipo = 'cc';
            } else if (document.getElementById('nit').checked) {
                documentoTipo = 'nit';
            }
        }
        const data = {
            ciudad: document.getElementById('ciudad').value,
            fecha: `${document.getElementById('ano').value}-${document.getElementById('mes').value}-${document.getElementById('dia').value}`,
            pagado_a: document.getElementById('pagado_a').value,
            valor: document.getElementById('valor').value,
            concepto: `${document.getElementById('concepto1').value} ${document.getElementById('concepto2').value}`,
            valor_letras: document.getElementById('valor_letras').value,
            documento: documentoTipo,
            nDocumento: document.getElementById('nCedula').value
        };
        return data;
    }
});


