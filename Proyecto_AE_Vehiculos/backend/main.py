from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Estimación de Vehículos")

# Configuración CORS para permitir conexión con tu Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo
modelo = joblib.load('modelo_vehiculos.pkl')

class DatosVehiculo(BaseModel):
    marca: str
    anio: int
    kilometraje: float

@app.post("/predecir")
def estimar_precio(vehiculo: DatosVehiculo):
    datos_diccionario = {
        'Marca': [vehiculo.marca],
        'Año': [vehiculo.anio],
        'Kilometraje': [vehiculo.kilometraje]
    }
    df_entrada = pd.DataFrame(datos_diccionario)
    prediccion = modelo.predict(df_entrada)
    return {"precio_estimado": float(prediccion[0])}
    