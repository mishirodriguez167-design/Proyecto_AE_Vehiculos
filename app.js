const urlAPI = 'https://api-proyecto-ae-vehiculos.onrender.com/predecir';


const formulario = document.getElementById("formulario-auto");
const botonCalcular = document.getElementById("boton-calcular");
const textoBoton = document.getElementById("texto-boton");
const cargador = document.getElementById("cargador");

const mensajeError = document.getElementById("mensaje-error");
const panelResultado = document.getElementById("panel-resultado");

const precioResultado = document.getElementById("precio-resultado");
const monedaResultado = document.getElementById("moneda-resultado");

const resumenMarca = document.getElementById("resumen-marca");
const resumenAnio = document.getElementById("resumen-anio");
const resumenKilometraje = document.getElementById(
    "resumen-kilometraje"
);


formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    limpiarMensajes();

    const datosVehiculo = obtenerDatosFormulario();

    if (!validarDatos(datosVehiculo)) {
        return;
    }

    activarCarga(true);

    try {
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

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                resultado.detail ||
                "La API no pudo realizar la predicción."
            );
        }

        mostrarResultado(
            resultado,
            datosVehiculo
        );

    } catch (error) {
        console.error("Error:", error);

        mensajeError.textContent =
            error.message ||
            "No fue posible conectarse con el servidor.";

        panelResultado.classList.add("oculto");

    } finally {
        activarCarga(false);
    }
});


function obtenerDatosFormulario() {
    return {
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
}


function validarDatos(datos) {
    const anioActual = new Date().getFullYear();

    if (!datos.brand) {
        mensajeError.textContent =
            "Selecciona la marca del vehículo.";

        return false;
    }

    if (
        !Number.isInteger(datos.year) ||
        datos.year < 1990 ||
        datos.year > anioActual
    ) {
        mensajeError.textContent =
            `El año debe estar entre 1990 y ${anioActual}.`;

        return false;
    }

    if (
        !Number.isFinite(datos.km_driven) ||
        datos.km_driven < 0
    ) {
        mensajeError.textContent =
            "El kilometraje debe ser un número positivo.";

        return false;
    }

    return true;
}


function mostrarResultado(resultado, datosVehiculo) {
    const precio = Number(
        resultado.precio_estimado
    );

    if (!Number.isFinite(precio)) {
        throw new Error(
            "El servidor devolvió una predicción inválida."
        );
    }

    precioResultado.textContent = precio.toLocaleString(
        "es-PE",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

    monedaResultado.textContent =
        resultado.moneda || "INR";

    resumenMarca.textContent = datosVehiculo.brand;
    resumenAnio.textContent = datosVehiculo.year;

    resumenKilometraje.textContent =
        `${datosVehiculo.km_driven.toLocaleString("es-PE")} km`;

    panelResultado.classList.remove("oculto");

    panelResultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


function activarCarga(estaCargando) {
    botonCalcular.disabled = estaCargando;

    textoBoton.textContent = estaCargando
        ? "Calculando estimación..."
        : "Calcular valor estimado";

    cargador.classList.toggle(
        "oculto",
        !estaCargando
    );
}


function limpiarMensajes() {
    mensajeError.textContent = "";
    panelResultado.classList.add("oculto");
}


