from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración correcta de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Esto permite conexiones desde cualquier lugar
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, etc.
    allow_headers=["*"],
)

# Cargar el modelo
@app.post("/predecir")
async def predecir(datos: dict):
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
    
