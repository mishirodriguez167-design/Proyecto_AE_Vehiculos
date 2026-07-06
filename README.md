**Estimación estadística del valor de mercado de vehículos de segunda
mano mediante métodos supervisados**

La presente documentación describe de manera integral el desarrollo del
sistema de aprendizaje estadístico orientado a la estimación del precio
de vehículos de segunda mano. Su contenido reúne la información
necesaria para comprender el propósito del proyecto, la procedencia de
los datos, el tratamiento aplicado al conjunto de registros, los modelos
implementados, el procedimiento de evaluación y el funcionamiento
general de la solución desarrollada.

# 1. Descripción general del proyecto

El proyecto tiene como finalidad estimar el valor de mercado de
vehículos usados a partir de características técnicas y comerciales
registradas en un conjunto de datos estructurado. Para ello, se aplican
métodos de aprendizaje supervisado de regresión, los cuales permiten
aprender relaciones estadísticas entre las características de cada
vehículo y su precio de venta conocido.

La solución busca reducir la subjetividad presente en los procesos
tradicionales de tasación. En lugar de depender únicamente del criterio
de una persona, el sistema utiliza información histórica para generar
una estimación sustentada en patrones observados en el mercado. Al mismo
tiempo, se prioriza la interpretabilidad, de modo que sea posible
reconocer qué variables tienen mayor influencia en la formación del
precio final.

# 2. Problema abordado

La valoración de un vehículo de segunda mano puede variar
considerablemente debido a factores como la antigüedad, el kilometraje
recorrido, el tipo de combustible, la transmisión, el historial de
propietarios y las condiciones comerciales de venta. Cuando estos
elementos no se analizan de forma sistemática, la estimación puede
resultar imprecisa y generar incertidumbre para compradores, vendedores
o responsables de una tasación.

Frente a esta situación, el proyecto plantea un sistema predictivo que
procesa información técnica y comercial para obtener una estimación
automática del precio. El desafío principal consiste en alcanzar un
nivel adecuado de precisión sin perder la capacidad de explicar el
comportamiento del modelo, razón por la cual se emplean algoritmos
paramétricos e interpretables.

# 3. Objetivo de la solución

El objetivo principal es desarrollar un modelo predictivo basado en
aprendizaje estadístico supervisado que permita estimar el precio de
vehículos usados mediante el análisis de sus características. Para
lograrlo, se realiza la preparación del conjunto de datos, la selección
y transformación de variables, el entrenamiento de distintos modelos de
regresión y la comparación de su rendimiento mediante métricas
estadísticas.

La solución también permite identificar la participación de las
variables predictoras dentro del resultado, facilitando una lectura
analítica del precio estimado y proporcionando una base más objetiva
para la valoración del vehículo.

# 4. Conjunto de datos utilizado

El desarrollo se basa en el conjunto de datos de vehículos usados de
CarDekho, disponible públicamente para fines de análisis y
experimentación. Cada registro representa un vehículo e incorpora
información relacionada con su condición técnica y comercial. La
variable objetivo del estudio es el precio de venta, mientras que las
demás columnas funcionan como variables predictoras.

Las principales variables consideradas son las siguientes:

- name: nombre o denominación comercial del vehículo.

- year: año de fabricación del vehículo.

- selling_price: precio de venta registrado y variable objetivo del
  modelo.

- km_driven: cantidad de kilómetros recorridos.

- fuel: tipo de combustible utilizado.

- seller_type: clasificación del vendedor, como particular o
  concesionario.

- transmission: tipo de transmisión del vehículo.

- owner: información relacionada con el número o categoría de
  propietarios anteriores.

La información fue cargada desde un repositorio de GitHub mediante un
enlace en formato RAW, lo que permite disponer del archivo sin depender
de una ubicación local específica. Este procedimiento favorece la
reproducibilidad del proyecto y facilita el acceso coordinado por parte
de los integrantes del equipo.

# 5. Preparación y tratamiento de los datos

Antes de iniciar el entrenamiento, se realizó una inspección general del
dataset con el propósito de conocer su estructura, dimensiones, tipos de
datos y condiciones de calidad. Esta revisión permitió identificar
registros duplicados, valores extremos y variables que requerían
transformación para ser utilizadas por los modelos de regresión.

## 5.1. Limpieza de registros

Se eliminaron los registros duplicados para evitar que una misma
observación influyera más de una vez en el proceso de aprendizaje.
Asimismo, se verificó la presencia de valores nulos y se revisaron los
rangos lógicos de las variables numéricas. La limpieza permitió trabajar
con un conjunto de datos más consistente y reducir posibles distorsiones
en los resultados.

## 5.2. Tratamiento de valores atípicos

Se identificaron precios de venta y kilometrajes considerablemente
alejados del comportamiento general del conjunto de datos. Para
disminuir el efecto de estos casos sobre la pendiente y los coeficientes
de los modelos, se aplicó un filtrado mediante percentiles, conservando
los registros ubicados dentro de rangos estadísticamente razonables.
Este procedimiento se realizó de manera controlada para no eliminar
innecesariamente información útil.

## 5.3. Transformación de variables categóricas

Las variables expresadas mediante texto, como el tipo de combustible, el
tipo de vendedor, la transmisión, la categoría de propietario y la
marca, fueron convertidas a una representación numérica mediante la
técnica One-Hot Encoding. Esta transformación crea columnas binarias que
indican la presencia o ausencia de cada categoría y permite que los
algoritmos de regresión procesen adecuadamente la información
cualitativa.

La marca del vehículo fue obtenida a partir del nombre registrado.
Después de esta extracción, la columna original se retiró del conjunto
de predictores para evitar el tratamiento directo de nombres completos
con alta variabilidad textual.

## 5.4. Normalización de variables

Las variables predictoras presentan escalas diferentes. Por ejemplo, el
año se expresa en unidades de calendario, mientras que el kilometraje
puede alcanzar decenas o cientos de miles. Para evitar que una variable
domine el entrenamiento únicamente por su magnitud, se aplicó
StandardScaler, obteniendo variables con media cercana a cero y
desviación estándar próxima a uno.

El escalador se ajustó únicamente con los datos de entrenamiento y
posteriormente se aplicó al conjunto de prueba. Esta secuencia evita la
fuga de información y conserva la validez de la evaluación. La variable
objetivo no fue normalizada, ya que el precio debe mantenerse en su
escala original para que el resultado sea interpretable.

# 6. Organización del conjunto de datos

Luego del preprocesamiento, se separaron las variables predictoras en la
matriz X y el precio de venta en la variable y. El conjunto completo fue
dividido en dos partes: 80 % para entrenamiento y 20 % para prueba. La
primera parte se utilizó para que los modelos aprendieran las relaciones
presentes en los datos; la segunda se reservó para comprobar el
comportamiento del sistema frente a registros no utilizados durante el
aprendizaje.

La partición se realizó con el parámetro random_state igual a 42. Esta
configuración permite reproducir la misma distribución en ejecuciones
posteriores y facilita la comparación de resultados entre distintos
modelos y etapas del proyecto.

Después de la codificación de las variables categóricas, el conjunto de
prueba quedó conformado por 701 registros y 41 variables predictoras.
Esta organización permitió evaluar el sistema bajo una estructura
consistente y equivalente a la utilizada durante el entrenamiento.

# 7. Modelos de aprendizaje implementados

El proyecto incorpora tres modelos de regresión supervisada. Todos
fueron entrenados utilizando la misma información y evaluados bajo
condiciones equivalentes, lo que permite realizar una comparación
objetiva de su rendimiento.

## 7.1. Regresión Lineal Múltiple

La Regresión Lineal Múltiple se empleó como modelo base. Su
funcionamiento consiste en estimar el precio mediante una combinación
lineal de las características del vehículo. Cada variable recibe un
coeficiente que representa su contribución en la predicción. La
principal fortaleza de este modelo es su facilidad de interpretación, ya
que permite analizar de forma directa la relación entre los predictores
y el precio.

## 7.2. Regresión Ridge

La Regresión Ridge incorpora una penalización de tipo L2 sobre los
coeficientes. Esta regularización reduce la varianza del modelo y
contribuye a controlar problemas de multicolinealidad entre variables
relacionadas, como el año de fabricación y el kilometraje. Ridge
conserva todos los predictores, pero limita el crecimiento excesivo de
sus coeficientes, produciendo un modelo más estable.

## 7.3. Regresión Lasso

La Regresión Lasso aplica una penalización de tipo L1. A diferencia de
Ridge, puede reducir algunos coeficientes exactamente a cero, realizando
de manera implícita una selección de variables. Esta propiedad favorece
la construcción de modelos más compactos y facilita la identificación de
las características con mayor participación en la estimación.

# 8. Entrenamiento y validación

Los modelos fueron entrenados con el subconjunto destinado al
aprendizaje. Para fortalecer la evaluación y reducir el riesgo de
sobreajuste, se utilizó validación cruzada K-Fold con cinco particiones.
En cada iteración, cuatro partes del conjunto se emplearon para entrenar
y la parte restante para validar. El procedimiento se repitió hasta
utilizar cada partición como conjunto de validación.

La validación cruzada permitió observar la estabilidad de los modelos
frente a distintas distribuciones de datos y obtener una estimación más
confiable de su capacidad de generalización. Posteriormente, los modelos
entrenados fueron evaluados con el conjunto de prueba reservado desde el
inicio del proceso.

# 9. Métricas de evaluación

El rendimiento de los modelos se analizó mediante el coeficiente de
determinación R² y la raíz del error cuadrático medio RMSE. Estas
métricas ofrecen perspectivas complementarias sobre la calidad de las
predicciones.

## 9.1. Coeficiente de determinación R²

El coeficiente R² expresa la proporción de la variabilidad del precio
que puede ser explicada por las características consideradas en el
modelo. Un valor más cercano a uno indica una mayor capacidad
explicativa. Esta métrica permite determinar en qué medida el modelo
reproduce el comportamiento observado en los datos reales.

## 9.2. Raíz del error cuadrático medio RMSE

El RMSE mide la magnitud promedio del error de predicción y se expresa
en la misma unidad que el precio. Un valor menor indica que las
estimaciones se encuentran más próximas a los valores reales. Debido a
que penaliza con mayor intensidad los errores grandes, resulta útil para
identificar modelos que generan desviaciones importantes en determinados
casos.

# 10. Interpretación de los resultados

La comparación realizada mostró un comportamiento similar entre los
modelos lineales evaluados. Las técnicas de regularización permitieron
controlar la complejidad del modelo y mantener coeficientes más
estables. La selección final debe considerar el equilibrio entre
precisión, estabilidad e interpretabilidad, utilizando los valores
obtenidos en las pruebas y en la validación cruzada.

El análisis de los coeficientes y de la relevancia de las variables
evidenció que el valor del vehículo se encuentra relacionado
principalmente con su antigüedad, el kilometraje recorrido y
determinadas características comerciales. Esto confirma que el sistema
no se limita a producir una cifra, sino que permite comprender los
factores que intervienen en la estimación.

La distribución de los errores constituye un elemento adicional de
evaluación. Una mayor concentración de residuos alrededor de cero
representa predicciones con menor desviación, mientras que la presencia
de errores extremos indica casos cuyo comportamiento no es explicado
completamente por las variables disponibles.

# 11. Funcionamiento general del sistema

El sistema recibe las características de un vehículo y las procesa
siguiendo las mismas transformaciones aplicadas durante el
entrenamiento. Las variables categóricas son convertidas al formato
requerido, las variables numéricas son normalizadas con el escalador
previamente ajustado y el conjunto resultante es enviado al modelo
seleccionado.

Como resultado, el sistema genera una estimación del precio de venta. La
predicción conserva la escala monetaria original, permitiendo su
interpretación directa. El resultado debe entenderse como una
aproximación estadística basada en los patrones del dataset y no como
una tasación comercial definitiva.

# 12. Tecnologías y herramientas empleadas

- Python, como lenguaje principal de procesamiento y modelado.

- Pandas, para la carga, exploración y transformación de datos.

- NumPy, para operaciones numéricas y manejo de arreglos.

- Scikit-learn, para la división de datos, normalización, entrenamiento,
  validación y evaluación de modelos.

- Matplotlib y Seaborn, para la elaboración de gráficos y el análisis
  visual.

- Google Colab, como entorno interactivo para ejecutar el proyecto.

- GitHub, para almacenar los archivos, compartir recursos y mantener el
  control de versiones.

# 13. Estructura general de los recursos del proyecto

Los recursos del proyecto se organizan de forma que cada componente
pueda ser identificado con facilidad. El repositorio contiene el
conjunto de datos utilizado, los archivos de procesamiento y
entrenamiento, los recursos gráficos generados durante el análisis y la
documentación técnica correspondiente. Esta organización permite revisar
el proceso completo, reproducir los resultados y mantener una separación
clara entre datos, código, modelos y evidencias.

El archivo principal reúne la carga del dataset, el análisis
exploratorio, la limpieza, la transformación de variables, la
normalización, la división de los datos, el entrenamiento de los modelos
y la evaluación final. Los archivos complementarios conservan los
conjuntos procesados y los resultados necesarios para las pruebas del
sistema.

# 14. Ejecución del proyecto

La ejecución comienza con la carga de las bibliotecas y del conjunto de
datos. A continuación, se realiza la inspección inicial, la depuración
de registros y la transformación de las variables. Después se separan
los datos en entrenamiento y prueba, se aplica la normalización y se
entrenan los modelos de Regresión Lineal Múltiple, Ridge y Lasso.

Finalizado el entrenamiento, se calculan las métricas de evaluación, se
comparan los resultados y se analizan los errores de predicción. El
modelo seleccionado se utiliza posteriormente para procesar las
características ingresadas por el usuario y obtener el precio estimado
del vehículo.

# 15. Alcances y limitaciones

La solución desarrollada permite estimar precios a partir de las
variables disponibles en el dataset y proporciona una interpretación de
los factores que influyen en el resultado. El sistema es reproducible,
utiliza modelos estadísticos transparentes y puede ampliarse mediante la
incorporación de nuevos registros o características adicionales.

La precisión depende de la calidad, actualidad y representatividad de
los datos utilizados. Existen factores que pueden influir en el precio
real y que no se encuentran incluidos en el conjunto de datos, como el
estado mecánico, la conservación estética, el historial de
mantenimiento, la ubicación geográfica o las condiciones particulares de
negociación. Por esta razón, la estimación debe utilizarse como
referencia analítica y no como sustituto de una evaluación técnica
especializada.

# 16. Síntesis final

El proyecto integra técnicas de procesamiento de datos y aprendizaje
estadístico supervisado para atender un problema real de estimación de
precios. El procedimiento desarrollado comprende la preparación del
dataset, la transformación de variables, la construcción de modelos
interpretables y la evaluación de su comportamiento mediante métricas
objetivas.

La aplicación de Regresión Lineal Múltiple, Ridge y Lasso permitió
comparar alternativas con diferentes mecanismos de control de
complejidad. Los resultados demuestran que las características técnicas
y comerciales contienen información relevante para explicar el valor de
los vehículos usados y que la regularización puede contribuir a obtener
modelos más estables.

La documentación del proyecto reúne los elementos esenciales para
comprender el problema, reproducir el procedimiento y revisar el
funcionamiento de la solución. De esta manera, el repositorio no solo
conserva el código, sino también el fundamento técnico, metodológico y
funcional del sistema desarrollado.
