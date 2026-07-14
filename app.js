// Dirección pública del backend alojado en Render
const API_URL =
    "https://api-proyecto-ae-vehiculos.onrender.com";

// Obtener el formulario
const formulario = document.getElementById("formulario-auto");

// Ejecutar cuando el usuario envíe el formulario
formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    // Elementos visuales
    const boton = document.getElementById("boton-calcular");
    const textoBoton = document.getElementById("texto-boton");
    const cargador = document.getElementById("cargador");
    const mensajeError = document.getElementById("mensaje-error");
    const panelResultado = document.getElementById("panel-resultado");

    mensajeError.textContent = "";
    panelResultado.classList.add("oculto");

    // Recoger los datos del formulario
    const datosVehiculo = {
        brand: document.getElementById("marca").value,

        year: Number(
            document.getElementById("anio").value
        ),

        km_driven: Number(
            document.getElementById("kilometraje").value
        ),

        fuel: document.getElementById("combustible").value,

        seller_type:
            document.getElementById("vendedor").value,

        transmission:
            document.getElementById("transmision").value,

        owner:
            document.getElementById("propietario").value
    };

    // Validaciones básicas
    if (!datosVehiculo.brand) {
        mensajeError.textContent =
            "Selecciona una marca.";
        return;
    }

    if (
        !datosVehiculo.year ||
        datosVehiculo.year < 1990 ||
        datosVehiculo.year > 2026
    ) {
        mensajeError.textContent =
            "Ingresa un año válido entre 1990 y 2026.";
        return;
    }

    if (
        Number.isNaN(datosVehiculo.km_driven) ||
        datosVehiculo.km_driven < 0
    ) {
        mensajeError.textContent =
            "Ingresa un kilometraje válido.";
        return;
    }

    // Activar estado de carga
    boton.disabled = true;
    textoBoton.textContent = "Calculando...";
    cargador.classList.remove("oculto");

    try {
        // AQUÍ VA EL CÓDIGO FETCH
        const respuesta = await fetch(
            `${API_URL}/predecir`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(datosVehiculo)
            }
        );

        // Convertir la respuesta de Render a JSON
        const resultado = await respuesta.json();

        // Revisar si la API devolvió un error
        if (!respuesta.ok) {
            throw new Error(
                resultado.detail ||
                "No se pudo calcular el precio."
            );
        }

        // Obtener el precio
        const precio = Number(
            resultado.precio_estimado
        );

        if (!Number.isFinite(precio)) {
            throw new Error(
                "La API devolvió un precio inválido."
            );
        }

        // Mostrar precio
        document.getElementById(
            "precio-resultado"
        ).textContent = precio.toLocaleString(
            "es-PE",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

        // Mostrar moneda
        document.getElementById(
            "moneda-resultado"
        ).textContent = resultado.moneda || "INR";

        // Mostrar resumen del vehículo
        document.getElementById(
            "resumen-marca"
        ).textContent = datosVehiculo.brand;

        document.getElementById(
            "resumen-anio"
        ).textContent = datosVehiculo.year;

        document.getElementById(
            "resumen-kilometraje"
        ).textContent =
            `${datosVehiculo.km_driven.toLocaleString("es-PE")} km`;

        // Hacer visible el resultado
        panelResultado.classList.remove("oculto");

        panelResultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    } catch (error) {
        console.error("Error:", error);

        mensajeError.textContent =
            `Error: ${error.message}`;

    } finally {
        // Restaurar el botón
        boton.disabled = false;
        textoBoton.textContent =
            "Calcular valor estimado";
        cargador.classList.add("oculto");
    }
});

