from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Estimación de Vehículos")

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Cargar el modelo UNA SOLA VEZ al iniciar la API
modelo = joblib.load('modelo_vehiculos.pkl')

# 2. Definir el esquema de datos
class DatosVehiculo(BaseModel):
    marca: str
    anio: int
    kilometraje: float

# 3. Única ruta de predicción
@app.post("/predecir")
def estimar_precio(vehiculo: DatosVehiculo):
    datos_diccionario = {
        'Marca': [vehiculo.marca],
        'Año': [vehiculo.anio],
        'Kilometraje': [vehiculo.kilometraje]
    }
    df_entrada = pd.DataFrame(datos_diccionario)
    
    # Realizar la predicción con el modelo ya cargado
    prediccion = modelo.predict(df_entrada)
    
    return {"precio_estimado": float(prediccion[0])}
