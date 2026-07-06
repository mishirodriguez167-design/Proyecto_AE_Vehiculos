async function enviarDatos() {
    // 1. Capturar los valores que el usuario escribió en el formulario HTML
    const marca = document.getElementById('marca').value;
    const anio = parseInt(document.getElementById('anio').value);
    const kilometraje = parseFloat(document.getElementById('kilometraje').value);

    // 2. Empaquetar los datos en un formato JSON estructurado
    const payload = {
        marca: marca,
        anio: anio,
        kilometraje: kilometraje
    };

    const resultadoTexto = document.getElementById('resultado');
    resultadoTexto.innerText = "Calculando con el modelo estadístico...";

    try {
        // 3. HACER LA PETICIÓN EN RED (¡REEMPLAZA CON TU URL DE RENDER!)
        const urlRender = 'https://api-prediccion-vehiculos.onrender.com/predecir';
        
        const respuesta = await fetch(urlRender, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Enviamos el paquete de datos
        });

        // 4. Recibir la respuesta del servidor de Render
        const datosRespuesta = await respuesta.json();
        
        // 5. Mostrar el precio estimado en la pantalla de forma bonita
        resultadoTexto.innerText = `Valor Estimado de Mercado: $${datosRespuesta.precio_estimado.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    } catch (error) {
        console.error("Error en la petición:", error);
        resultadoTexto.innerText = "Hubo un error al conectar con el servidor de IA.";
    }
}

