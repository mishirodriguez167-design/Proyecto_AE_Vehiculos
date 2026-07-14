from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# =====================================================
# APLICACIÓN
# =====================================================

app = FastAPI(
    title="API de Tasación Automotriz",
    version="1.0.0"
)


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# CARGAR PIPELINE
# =====================================================

BASE_DIR = Path(__file__).resolve().parent
RUTA_MODELO = BASE_DIR / "modelo_tasacion_automotriz.pkl"

if not RUTA_MODELO.exists():
    raise RuntimeError(
        f"No se encontró el pipeline en: {RUTA_MODELO}"
    )

modelo = joblib.load(RUTA_MODELO)

print("Pipeline cargado correctamente.")


# =====================================================
# ESTRUCTURA DE ENTRADA
# =====================================================

class VehiculoEntrada(BaseModel):
    year: int = Field(
        ge=1990,
        le=2026,
        description="Año de fabricación"
    )

    km_driven: float = Field(
        ge=0,
        description="Kilometraje recorrido"
    )

    fuel: str
    seller_type: str
    transmission: str
    owner: str
    brand: str


# =====================================================
# RUTAS GENERALES
# =====================================================

@app.get("/")
def inicio():
    return {
        "status": "ok",
        "message": "API de tasación automotriz funcionando",
        "documentacion": "/docs",
        "endpoint": "/predecir"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# =====================================================
# PREDICCIÓN
# =====================================================

@app.post("/predecir")
def estimar_precio(datos: VehiculoEntrada):

    try:
        df_entrada = pd.DataFrame([{
            "year": datos.year,
            "km_driven": datos.km_driven,
            "fuel": datos.fuel,
            "seller_type": datos.seller_type,
            "transmission": datos.transmission,
            "owner": datos.owner,
            "brand": datos.brand
        }])

        print("Datos recibidos:")
        print(df_entrada)

        prediccion = modelo.predict(df_entrada)

        precio_estimado = max(
            0,
            float(prediccion[0])
        )

        return {
            "precio_estimado": round(precio_estimado, 2),
            "moneda": "INR",
            "vehiculo": {
                "marca": datos.brand,
                "anio": datos.year,
                "kilometraje": datos.km_driven
            }
        }

    except Exception as error:
        print("Error de predicción:", str(error))

        raise HTTPException(
            status_code=500,
            detail=f"Error al realizar la predicción: {str(error)}"
        )
