async function predecirPrecio() {
    // 1. Obtenemos los valores del formulario
    const marca = document.getElementById('marca').value;
    const anio = document.getElementById('anio').value;
    const kilometraje = document.getElementById('kilometraje').value;

    // 2. Enviamos los datos a tu API en Render
    const urlAPI = 'https://api-proyecto-ae-vehiculos.onrender.com/predecir';

    try {
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marca: marca,
                anio: parseInt(anio),
                kilometraje: parseFloat(kilometraje)
            })
        });

        // 3. Procesamos la respuesta
        if (!response.ok) {
            throw new Error('Error en la conexión con el servidor');
        }

        const data = await response.json();
        
        // 4. Mostramos el resultado en el HTML
        document.getElementById('resultado').innerText = "Precio estimado: $" + data.precio_estimado.toFixed(2);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultado').innerText = "Error al conectar con el servidor. Intenta de nuevo.";
    }
}

