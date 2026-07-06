# GUÍA DE EJECUCIÓN Y PRUEBAS DEL SISTEMA

## Estimación estadística del valor de mercado de vehículos de segunda mano mediante métodos supervisados

La presente guía describe el procedimiento de ejecución y validación del sistema predictivo desarrollado para estimar el precio de vehículos de segunda mano. El contenido reúne las condiciones necesarias para iniciar el proyecto, ejecutar cada etapa del procesamiento, comprobar el funcionamiento de los modelos implementados y registrar los resultados obtenidos durante las pruebas.

El sistema fue desarrollado en Python mediante Google Colab y utiliza un conjunto de datos de vehículos usados procedente de CarDekho. La ejecución comprende la carga de los datos, la limpieza de registros, la transformación de variables, la normalización, la división del dataset, el entrenamiento de los modelos de Regresión Lineal Múltiple, Ridge y Lasso, así como la evaluación mediante las métricas R² y RMSE.

## 1. Condiciones necesarias para la ejecución

Antes de iniciar el sistema, se debe disponer de un entorno compatible con Python y acceso a los archivos empleados durante el desarrollo. La ejecución puede realizarse directamente desde Google Colab, debido a que este entorno permite cargar las bibliotecas requeridas y ejecutar el proyecto sin realizar una instalación local completa.

Las principales herramientas utilizadas son las siguientes:

- Python, como lenguaje de programación principal.
- Pandas, para la carga, inspección y transformación del dataset.
- NumPy, para las operaciones numéricas.
- Scikit-learn, para el preprocesamiento, entrenamiento, validación y evaluación.
- Matplotlib y Seaborn, para la elaboración de gráficos.
- Google Colab, como entorno de ejecución.
- GitHub, para almacenar el dataset y los recursos del proyecto.

La ejecución también requiere conexión a Internet, debido a que el conjunto de datos se carga desde un repositorio de GitHub mediante un enlace en formato RAW.

## 2. Inicio del entorno de trabajo

La ejecución comienza con la apertura del archivo principal del proyecto en Google Colab. Una vez abierto el notebook, se verifica que las celdas se encuentren organizadas siguiendo el orden establecido durante el desarrollo.

El entorno debe iniciarse desde la primera celda para asegurar que todas las bibliotecas, variables, funciones y objetos sean cargados correctamente. La ejecución parcial o desordenada puede ocasionar errores relacionados con variables no definidas, ausencia de archivos o modelos que todavía no han sido entrenados.

Como primera comprobación, se ejecuta la celda de importación de bibliotecas. El sistema debe reconocer correctamente los módulos utilizados y continuar sin mostrar errores de instalación o incompatibilidad.

## 3. Carga del conjunto de datos

El sistema obtiene el dataset de vehículos usados desde GitHub. La carga se realiza mediante Pandas, utilizando la dirección RAW del archivo CSV. Este procedimiento permite que todos los integrantes trabajen con la misma fuente de datos.

Después de ejecutar la celda correspondiente, se comprueba que el archivo haya sido leído correctamente. Para ello, se visualizan las primeras filas del dataset y se revisan sus dimensiones.

La carga se considera correcta cuando el sistema muestra los registros iniciales, reconoce las columnas disponibles y presenta una estructura coherente con las variables del proyecto, entre ellas:

- `name`
- `year`
- `selling_price`
- `km_driven`
- `fuel`
- `seller_type`
- `transmission`
- `owner`

La variable `selling_price` representa el precio de venta y funciona como variable objetivo. Las demás columnas se utilizan como características predictoras.

## 4. Verificación inicial de los datos

Una vez cargado el dataset, se realiza una inspección general para conocer el estado de los registros antes del procesamiento. Esta verificación permite confirmar la cantidad de filas y columnas, los tipos de datos, la presencia de valores nulos y la existencia de registros duplicados.

Durante esta etapa se ejecutan operaciones como:

- Visualización de las primeras filas.
- Revisión de las dimensiones del dataset.
- Identificación de los tipos de datos.
- Obtención de estadísticas descriptivas.
- Conteo de valores nulos.
- Conteo de registros duplicados.

La prueba se considera satisfactoria cuando el sistema muestra la información solicitada sin interrumpir la ejecución y permite identificar correctamente las variables numéricas y categóricas.

## 5. Prueba de limpieza de registros

El sistema elimina los registros duplicados mediante el método correspondiente de Pandas. Esta operación evita que una misma observación influya repetidamente durante el entrenamiento.

La prueba consiste en comparar la cantidad de registros antes y después de la eliminación de duplicados. El resultado esperado es una reducción equivalente al número de filas repetidas detectadas durante la inspección inicial.

También se verifica que la eliminación no modifique la estructura de las columnas ni genere valores vacíos adicionales. Al finalizar esta etapa, el dataset debe conservar únicamente registros únicos.

## 6. Prueba de tratamiento de valores atípicos

El sistema analiza los valores extremos presentes en las variables `selling_price` y `km_driven`. Debido a que algunos registros presentan precios o kilometrajes considerablemente alejados del comportamiento general, se aplica un filtrado basado en el percentil 99.

La ejecución debe conservar los registros ubicados dentro del rango establecido y retirar aquellos casos que puedan distorsionar el aprendizaje de los modelos.

La prueba se valida comparando:

- Cantidad de registros antes del filtrado.
- Cantidad de registros después del filtrado.
- Valor máximo del precio antes y después del tratamiento.
- Valor máximo del kilometraje antes y después del tratamiento.

El resultado esperado es un conjunto de datos con menor influencia de casos extremos, sin eliminar la mayor parte de la información disponible.

## 7. Prueba de transformación de variables categóricas

Las variables categóricas deben convertirse a una representación numérica para que puedan ser procesadas por los modelos de regresión.

La marca del vehículo se obtiene a partir de la columna `name`. Posteriormente, la columna original se elimina y se aplica One-Hot Encoding a variables como:

- Tipo de combustible.
- Tipo de vendedor.
- Tipo de transmisión.
- Categoría del propietario.
- Marca del vehículo.

Después de ejecutar la transformación, el sistema debe mostrar nuevas columnas binarias asociadas a las categorías identificadas.

La prueba se considera correcta cuando:

- Las variables textuales seleccionadas dejan de formar parte directa de la matriz de entrada.
- Las nuevas columnas contienen valores binarios.
- No se generan valores nulos.
- El dataset procesado conserva la misma cantidad de registros.
- La cantidad de variables predictoras aumenta de acuerdo con las categorías disponibles.

## 8. Separación de variables predictoras y variable objetivo

El sistema divide la información en dos componentes principales:

- `X`, que contiene las características técnicas y comerciales.
- `y`, que contiene la variable objetivo `selling_price`.

La prueba consiste en comprobar que `selling_price` haya sido retirada correctamente de la matriz de predictores y permanezca únicamente en la variable objetivo.

El número de filas de `X` y `y` debe ser exactamente el mismo. Cualquier diferencia indicaría una separación incorrecta o una modificación no controlada de los registros.

## 9. División del dataset en entrenamiento y prueba

El conjunto procesado se divide en 80 % para entrenamiento y 20 % para prueba mediante `train_test_split`. Se utiliza `random_state=42` para conservar la misma distribución en ejecuciones posteriores.

Después de ejecutar la división, el sistema genera:

- `X_train`
- `X_test`
- `y_train`
- `y_test`

La prueba se considera satisfactoria cuando la suma de los registros de entrenamiento y prueba coincide con el total del dataset procesado.

También se comprueba que:

- El conjunto de entrenamiento contiene aproximadamente el 80 % de los datos.
- El conjunto de prueba contiene aproximadamente el 20 %.
- Las variables predictoras mantienen la misma cantidad de columnas.
- La variable objetivo conserva la escala original del precio.

## 10. Prueba de normalización

La normalización se aplica únicamente a las variables predictoras mediante `StandardScaler`.

El escalador se ajusta con `X_train` y posteriormente se utiliza para transformar `X_train` y `X_test`. Esta secuencia evita que la información del conjunto de prueba intervenga durante el entrenamiento.

La prueba se valida comprobando que:

- Las variables de entrenamiento presentan una media cercana a cero.
- Las variables normalizadas tienen una desviación estándar cercana a uno.
- `X_train` y `X_test` conservan sus dimensiones.
- Los nombres de las columnas permanecen disponibles después de la conversión.
- La variable `selling_price` no es normalizada.

## 11. Entrenamiento de la Regresión Lineal Múltiple

La Regresión Lineal Múltiple se utiliza como modelo base para estimar el precio del vehículo a partir de una combinación lineal de las variables predictoras.

Durante la ejecución, el modelo se ajusta utilizando `X_train` y `y_train`. Luego, genera predicciones sobre `X_test`.

La prueba se considera correcta cuando:

- El modelo finaliza el entrenamiento sin errores.
- Se generan predicciones para todos los registros del conjunto de prueba.
- La cantidad de predicciones coincide con la cantidad de valores de `y_test`.
- Los resultados se expresan en la misma escala monetaria del precio original.

## 12. Entrenamiento de la Regresión Ridge

La Regresión Ridge incorpora una penalización L2 para controlar el crecimiento de los coeficientes y reducir problemas de multicolinealidad.

La ejecución sigue el mismo procedimiento aplicado al modelo lineal: entrenamiento con los datos preparados y generación de predicciones sobre el conjunto de prueba.

La prueba se considera satisfactoria cuando el modelo completa el ajuste, produce una predicción para cada registro y devuelve coeficientes numéricos asociados a las variables de entrada.

## 13. Entrenamiento de la Regresión Lasso

La Regresión Lasso aplica una penalización L1 y puede reducir algunos coeficientes hasta cero. Esta característica permite identificar variables con menor participación dentro del modelo.

La prueba verifica que el modelo pueda entrenarse con las variables normalizadas y generar predicciones sobre el conjunto de prueba.

También se comprueba la cantidad de coeficientes reducidos a cero, ya que este resultado evidencia el proceso de selección automática de variables realizado por Lasso.

## 14. Validación cruzada de los modelos

Para evaluar la estabilidad de los modelos, se utiliza validación cruzada K-Fold con cinco particiones.

El conjunto de entrenamiento se divide en cinco subconjuntos. En cada iteración, cuatro partes se utilizan para entrenar y una para validar. El procedimiento se repite hasta que cada subconjunto haya sido utilizado como validación.

La prueba se considera correcta cuando:

- Se completan las cinco iteraciones.
- Se obtiene un valor de R² para cada partición.
- Se obtiene un valor de RMSE para cada partición.
- Se calcula el promedio de las métricas.
- Los resultados no presentan variaciones excesivas entre las particiones.

La validación cruzada permite comprobar que el desempeño no depende únicamente de una sola división de los datos.

## 15. Evaluación mediante R²

El coeficiente de determinación R² mide la proporción de la variabilidad del precio que puede ser explicada por el modelo.

Después de generar las predicciones, se calcula R² comparando los precios reales con los precios estimados.

La prueba se considera satisfactoria cuando el sistema muestra un valor numérico válido y permite comparar los tres modelos bajo las mismas condiciones.

Un valor mayor de R² indica una mayor capacidad explicativa. Para la selección final, se considera el modelo que presente el mejor equilibrio entre rendimiento, estabilidad e interpretabilidad.

## 16. Evaluación mediante RMSE

El RMSE mide la magnitud promedio del error de predicción y se expresa en la misma unidad que el precio.

La prueba se realiza calculando la diferencia entre los precios reales y los estimados. El sistema eleva estas diferencias al cuadrado, obtiene el promedio y calcula la raíz cuadrada.

La ejecución se considera correcta cuando se genera un valor numérico positivo para cada modelo.

Un RMSE menor representa predicciones más cercanas a los precios reales. Esta métrica debe analizarse junto con R² para evitar una interpretación aislada del rendimiento.

## 17. Comparación del rendimiento de los modelos

Los resultados de Regresión Lineal Múltiple, Ridge y Lasso se organizan en una tabla comparativa.

La tabla debe contener como mínimo:

| Modelo | R² | RMSE |
|---|---:|---:|
| Regresión Lineal Múltiple | Resultado obtenido | Resultado obtenido |
| Regresión Ridge | Resultado obtenido | Resultado obtenido |
| Regresión Lasso | Resultado obtenido | Resultado obtenido |

La prueba se valida cuando los tres modelos han sido evaluados con el mismo conjunto de prueba y las métricas se muestran de forma ordenada.

La selección del modelo final se realiza considerando:

- Mayor valor de R².
- Menor valor de RMSE.
- Estabilidad en validación cruzada.
- Facilidad de interpretación.
- Comportamiento de los coeficientes.

## 18. Prueba gráfica de valores reales y predichos

El sistema genera una gráfica de dispersión que compara los precios reales con los precios estimados.

Cada punto representa un vehículo del conjunto de prueba. Cuando las predicciones son cercanas a los valores reales, los puntos se ubican próximos a la línea de referencia.

La prueba se considera satisfactoria cuando:

- Se representan todos los registros de prueba.
- Los ejes están identificados correctamente.
- Los valores reales se muestran en un eje.
- Los valores predichos se muestran en el otro eje.
- La gráfica permite observar la cercanía o dispersión de las predicciones.

## 19. Prueba de análisis de residuos

Los residuos representan la diferencia entre el precio real y el precio estimado.

El sistema calcula los residuos de cada modelo y los representa gráficamente para analizar la distribución de los errores.

La prueba se considera correcta cuando los residuos pueden visualizarse y se concentran principalmente alrededor de cero.

Una dispersión aleatoria y equilibrada indica que el modelo no mantiene un patrón evidente de error. En cambio, la presencia de agrupaciones o tendencias puede señalar variables omitidas, relaciones no lineales o casos que el modelo no explica adecuadamente.

## 20. Prueba de interpretación de variables

El sistema analiza los coeficientes aprendidos por cada modelo para identificar la influencia de las variables sobre el precio.

Los coeficientes positivos indican que el aumento o presencia de una característica se relaciona con un incremento del precio estimado. Los coeficientes negativos indican una relación inversa.

La prueba se considera satisfactoria cuando:

- Cada coeficiente se encuentra asociado con una variable.
- Los valores pueden ordenarse según su magnitud.
- Se genera un ranking de variables relevantes.
- Los resultados son coherentes con el dominio del proyecto.

La interpretación permite verificar que el sistema no se limita a generar una predicción, sino que también explica los factores que intervienen en ella.

## 21. Prueba de predicción con un vehículo nuevo

La prueba funcional principal consiste en ingresar las características de un vehículo no utilizado durante el entrenamiento y obtener una estimación de su precio.

Los datos de entrada deben conservar la misma estructura empleada durante el procesamiento. Las variables categóricas se transforman con las columnas creadas durante el entrenamiento y las variables numéricas se normalizan mediante el escalador previamente ajustado.

El procedimiento de prueba comprende:

1. Ingreso de las características del vehículo.
2. Validación de los datos ingresados.
3. Conversión de variables categóricas.
4. Alineación de las columnas con el conjunto de entrenamiento.
5. Normalización de las variables numéricas.
6. Envío de la información al modelo seleccionado.
7. Presentación del precio estimado.

La prueba se considera satisfactoria cuando el sistema procesa la información sin errores y devuelve un valor numérico de precio.

## 22. Prueba con datos válidos

Se ingresan datos que cumplen con los formatos y rangos observados en el dataset.

Ejemplo:

- Año: 2018.
- Kilometraje: 55 000.
- Combustible: gasolina.
- Transmisión: manual.
- Tipo de vendedor: concesionario.
- Propietario: primer propietario.
- Marca: una categoría existente en el conjunto de entrenamiento.

El resultado esperado es una predicción válida y expresada en la escala monetaria original.

## 23. Prueba con datos incompletos

Se ejecuta el sistema dejando uno o más campos sin información.

El resultado esperado es que la ejecución detecte la ausencia de valores antes de enviar los datos al modelo. El sistema no debe generar una predicción utilizando información incompleta.

La prueba permite comprobar la validación de entradas y evita resultados basados en registros insuficientes.

## 24. Prueba con valores fuera de rango

Se ingresan valores que se alejan considerablemente de los rangos presentes en el dataset, como un kilometraje negativo, un año futuro o una cantidad de propietarios no reconocida.

El resultado esperado es que el sistema identifique los valores inválidos y evite procesarlos como si fueran registros normales.

Esta prueba confirma que la entrada de datos mantiene coherencia con el dominio de vehículos de segunda mano.

## 25. Prueba con categoría no reconocida

Se introduce una marca, tipo de combustible o transmisión que no estuvo presente durante el entrenamiento.

El sistema debe controlar esta situación antes de realizar la predicción. La categoría no reconocida no debe provocar una desalineación entre las columnas de entrada y las variables utilizadas por el modelo.

La prueba se considera satisfactoria cuando la aplicación informa que la categoría no puede procesarse o la gestiona mediante un mecanismo previamente definido.

## 26. Prueba de reproducibilidad

El proyecto utiliza `random_state=42` en la división del dataset.

Para comprobar la reproducibilidad, se ejecuta nuevamente el notebook desde el inicio y se comparan las dimensiones, las particiones y las métricas obtenidas.

La prueba se considera correcta cuando los resultados principales se mantienen iguales o presentan únicamente diferencias mínimas derivadas del proceso numérico.

## 27. Prueba de tiempo de respuesta

El tiempo de respuesta se mide desde el ingreso de las características del vehículo hasta la presentación del precio estimado.

Debido a que el sistema utiliza modelos lineales y datos tabulares, la predicción debe generarse en un periodo breve.

La prueba se considera satisfactoria cuando el resultado se obtiene sin retrasos significativos y la ejecución no requiere volver a entrenar todos los modelos para cada predicción individual.

## 28. Registro de resultados

Los resultados de cada prueba deben quedar registrados de forma ordenada para demostrar el funcionamiento del sistema.

Se utiliza la siguiente estructura:

| N.° | Prueba realizada | Datos utilizados | Resultado esperado | Resultado obtenido | Estado |
|---:|---|---|---|---|---|
| 1 | Carga del dataset | URL RAW de GitHub | Dataset cargado correctamente | Completar con evidencia | Aprobado/Pendiente |
| 2 | Eliminación de duplicados | Dataset original | Registros únicos | Completar con evidencia | Aprobado/Pendiente |
| 3 | Transformación categórica | Variables de texto | Columnas numéricas | Completar con evidencia | Aprobado/Pendiente |
| 4 | División del dataset | Dataset procesado | 80 % entrenamiento y 20 % prueba | Completar con evidencia | Aprobado/Pendiente |
| 5 | Normalización | X_train y X_test | Escalas estandarizadas | Completar con evidencia | Aprobado/Pendiente |
| 6 | Entrenamiento lineal | Datos de entrenamiento | Modelo entrenado | Completar con evidencia | Aprobado/Pendiente |
| 7 | Entrenamiento Ridge | Datos de entrenamiento | Modelo entrenado | Completar con evidencia | Aprobado/Pendiente |
| 8 | Entrenamiento Lasso | Datos de entrenamiento | Modelo entrenado | Completar con evidencia | Aprobado/Pendiente |
| 9 | Evaluación de modelos | Datos de prueba | R² y RMSE calculados | Completar con evidencia | Aprobado/Pendiente |
| 10 | Predicción individual | Vehículo de prueba | Precio estimado | Completar con evidencia | Aprobado/Pendiente |

## 29. Evidencias de ejecución

La sección de evidencias debe mostrar el funcionamiento real del sistema y la correspondencia entre las pruebas descritas y los resultados obtenidos.

Las evidencias se organizan de acuerdo con el orden de ejecución:

1. Carga correcta del dataset.
2. Inspección de las columnas y dimensiones.
3. Eliminación de registros duplicados.
4. Filtrado de valores atípicos.
5. Transformación de variables categóricas.
6. División del dataset.
7. Normalización de variables.
8. Entrenamiento de cada modelo.
9. Resultados de validación cruzada.
10. Tabla comparativa de R² y RMSE.
11. Gráficas de predicciones.
12. Gráficas de residuos.
13. Ranking de variables.
14. Ejecución de una predicción individual.

Cada evidencia debe acompañarse de una breve descripción que explique qué se ejecutó y qué resultado se obtuvo.

## 30. Resultado general de las pruebas

La ejecución completa permite comprobar que el sistema procesa correctamente el conjunto de datos, transforma las variables, entrena los modelos y genera estimaciones de precio.

Las pruebas permiten verificar el cumplimiento de los principales requerimientos funcionales:

- Carga de información de vehículos.
- Limpieza y transformación de datos.
- Selección y preparación de variables.
- Entrenamiento de Regresión Lineal Múltiple, Ridge y Lasso.
- Evaluación mediante R² y RMSE.
- Comparación del desempeño.
- Generación de predicciones.
- Interpretación de las variables.
- Ingreso de datos para estimar un nuevo vehículo.

El sistema se considera funcional cuando todas las etapas se ejecutan en orden, los modelos generan resultados válidos y la predicción final puede ser interpretada en la escala original del precio.

## 31. Síntesis final

La ejecución y las pruebas realizadas permiten validar el funcionamiento técnico y predictivo del sistema. El proceso comienza con la carga del dataset, continúa con la limpieza, transformación y normalización de las variables, y finaliza con el entrenamiento y evaluación de los modelos supervisados.

La comparación entre Regresión Lineal Múltiple, Ridge y Lasso permite identificar la alternativa que presenta el mejor equilibrio entre precisión, estabilidad e interpretabilidad. Las métricas R² y RMSE proporcionan una evaluación cuantitativa, mientras que las gráficas de predicción, los residuos y los coeficientes permiten analizar el comportamiento del sistema de forma visual y explicativa.

La prueba de predicción individual demuestra la aplicación práctica del modelo, debido a que permite ingresar las características de un vehículo y obtener una estimación basada en los patrones aprendidos. De esta manera, la sección de ejecución y pruebas evidencia que el sistema no solo ha sido desarrollado, sino también comprobado mediante procedimientos reproducibles y resultados verificables.
