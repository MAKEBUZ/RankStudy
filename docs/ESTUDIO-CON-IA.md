# Estudio con materiales propios y preguntas asistidas por IA

## Ampliación del concepto

RankStudy combina estudio personal y competición académica. El estudiante podrá subir materiales, organizarlos por materia y tema, practicar con preguntas derivadas de sus fuentes y proponer contenido para la nivelación y las competiciones. Una biblioteca privada alimentará el estudio personal; un banco revisado alimentará las partidas clasificatorias.

Estado: alcance solicitado, pendiente de implementación. La aplicación actual dispone de banco versionado y moderación humana, pero todavía no tiene biblioteca de estudiantes, extracción de materiales ni generación y validación automática con IA.

## Recorrido del estudiante

1. Subir un PDF con texto o un archivo TXT a «Mis materiales», indicando título, materia y nivel. El OCR de documentos escaneados se estima aparte.
2. Consultar el texto extraído y comprobar qué páginas se pudieron procesar. Un archivo ilegible no debe producir preguntas inventadas.
3. Abrir «Estudiar con IA»: seleccionar material, temas y cantidad de preguntas. Cada pregunta incluye explicación y una referencia al fragmento que la sustenta.
4. Practicar con el material propio sin modificar el ELO competitivo. Las preguntas aún no publicadas se identifican como borradores asistidos por IA.
5. Proponer preguntas al banco compartido mediante una acción explícita y con permiso para utilizar el contenido. El archivo original sigue siendo privado.
6. Consultar el estado de la revisión y corregir propuestas rechazadas.

## Generación y dos instancias de aprobación

La generación produce candidatos; no cuenta como aprobación. Las dos instancias deben aprobar exactamente la misma versión. Cualquier modificación invalida ambas revisiones anteriores y exige volver a revisar.

Propuesta pendiente de confirmación del responsable: primera instancia automática y segunda instancia humana.

| Etapa | Comprobación | Resultado |
| --- | --- | --- |
| Generación | Recuperar fragmentos pertinentes y redactar enunciado, cuatro opciones, solución, explicación y referencias | Borrador con fuente y versión del modelo |
| Primera instancia automática | Validar formato, opciones diferentes, respuesta única, respaldo en la fuente, coherencia y duplicados; comprobar matemáticamente los ejercicios compatibles | Apto para revisión, rechazado o no verificable |
| Segunda instancia humana propuesta | Un revisor autorizado diferente del autor comprueba corrección, claridad, nivel, dificultad, fuente y permiso de publicación | Publicada o rechazada con motivo |

Un problema verificable numérica o simbólicamente debe incluir resultado reproducible, unidades y tolerancia cuando corresponda. Un cálculo incorrecto o una contradicción bloquean la publicación. Para materias sin comprobación matemática aplicable se registra «no aplica», con las comprobaciones semánticas y de fuente correspondientes. «No verificable» nunca equivale a aprobación.

Si se eligen dos instancias automáticas, será necesario definir un verificador independiente del generador, una política de abstención y una evaluación contra preguntas revisadas por expertos antes de habilitar publicación automática. El acuerdo entre modelos no demuestra por sí solo que una respuesta sea correcta.

## IA y redes neuronales

El apartado de producto será «Estudiar con IA». La configuración administrativa permitirá identificar proveedor, modelo generador, modelo verificador y versiones. Integrar modelos preentrenados y entrenar una red neuronal propia son trabajos distintos: el alcance inicial propone integración; entrenar modelos propios requiere datos autorizados, evaluación, infraestructura y presupuesto específicos.

La generación utilizará fragmentos recuperados del material seleccionado. El texto subido se tratará como contenido, nunca como instrucciones para ejecutar herramientas, revelar información o cambiar permisos. Las referencias deben apuntar a fragmentos realmente extraídos. No se enviará un material a un proveedor externo sin informar al estudiante y obtener su autorización en el flujo de generación.

El proveedor y el presupuesto de uso siguen por definir. La interfaz debe indicar «IA no configurada» cuando no haya integración real, sin sustituirla por resultados simulados presentados como generación real.

## Uso en nivelación y competición

Solo las versiones que superen las dos instancias podrán entrar al banco público de nivelación, duelos, torneos y competiciones por ELO. Se conservarán los snapshots actuales para que editar o retirar una pregunta no altere una partida en curso ni su historial.

La práctica privada no modifica ELO. Para reducir la ventaja de memorizar contenido propio, la selección clasificatoria debe excluir preguntas aportadas por cualquiera de los participantes y registrar exposición previa. Si no queda un banco suficiente, debe indicar la falta de contenido; no reutilizar automáticamente borradores.

La dificultad sugerida por IA será provisional. Su ajuste requiere revisión académica y, con suficientes respuestas, mediciones de dificultad y discriminación. El modelo matemático de validación de respuestas es distinto del modelo que estima dificultad y del cálculo del ELO.

## Cambio solicitado de puntos

El cambio de ELO por partida queda limitado a [−11, +11]. Se mantienen los rangos Bronce, Plata, Oro, Platino y Diamante y la puntuación por respuesta de 100 por acierto más hasta 50 por velocidad.

La implementación conserva el cálculo variable según el rival, con K=32, y limita el resultado a once puntos en cada dirección. Se aplica a victoria, derrota, empate y abandono, dentro del rating global 400–2400. Con igual ELO, victoria +11, derrota −11 y empate 0; con niveles distintos, un empate puede modificar el ELO. La nivelación inicial y los resultados históricos se conservan.

## Datos y controles necesarios

- Materiales y fragmentos: propietario, acceso privado, tamaño, formato, hash, texto extraído y referencias de página.
- Trabajos de generación: estados en cola, procesando, completado o fallido; cuotas, coste, timeout y reintentos sin duplicados.
- Candidatos y validaciones: versión, procedencia, modelos, resultado reproducible, evidencias, motivos y revisores.
- Publicación: aprobación de ambas instancias vinculada a la versión, permiso de compartir, publicación atómica y auditoría.
- Archivos: límites de tamaño y páginas, validación del contenido real del archivo, extracción aislada y limpieza de temporales; acceso solo del propietario o de los roles expresamente autorizados.
- Eliminación: retirar el material privado, gestionar sus derivados y conservar únicamente la evidencia necesaria de contenido publicado y partidas históricas según la política acordada.

## Backlog de ampliación

Estas referencias son locales; todavía no son claves de Jira. Las estimaciones originales de cuatro sprints no incluyen todo este incremento.

| Referencia | Entrega | Criterio de aceptación principal | Ubicación propuesta |
| --- | --- | --- | --- |
| IA-01 | Biblioteca privada del estudiante | Subir, listar, consultar y eliminar materiales propios; rechazar acceso de otra cuenta | Sprint 4 |
| IA-02 | Extracción PDF y TXT con referencias | Texto y páginas trazables, límites y errores claros; extender la tarea original RSY-91, actual RSY-224 | Sprint 4 |
| IA-03 | Generación basada en fuentes | Preguntas estructuradas con referencias verificadas, cuotas y errores; extender RSY-89/90, actuales RSY-222/223 | Sprint 4 |
| IA-04 | Validación automática independiente | Rechazar contradicciones, opciones ambiguas y cálculos incorrectos; abstenerse si falta evidencia | Sprint 4 |
| IA-05 | Dos instancias vinculadas a la versión | Impedir publicación con una sola aprobación o revisión obsoleta; extender RSY-92, actual RSY-225 | Sprint 4 |
| IA-06 | Estudio y práctica privada | Resolver, ver explicación y referencia, registrar progreso privado sin cambiar ELO | Sprint 4 |
| IA-07 | Publicación en el banco competitivo | Consentimiento para compartir, selección de versiones aprobadas y exclusión del contenido propio | Sprint 4, integración con sprints 1 a 3 |
| IA-08 | Evaluación académica y operativa | Conjunto experto separado, errores por materia, calidad de referencias, coste y latencia; extender RSY-93, actual RSY-226 | Sprint 4 |
| ELO-01 | Ajustar el intervalo de puntos | Implementado el límite −11/+11 en el cálculo compartido; comprobar límites, resultados, abandono e idempotencia | Ajuste del Sprint 2 |

## Pruebas para considerar terminada la ampliación

Un estudiante sube un material y otro no puede leerlo. La extracción identifica páginas y maneja archivos inválidos. La generación real devuelve preguntas trazables. Una pregunta con error matemático es rechazada; una sin evidencia queda sin publicar. La aprobación de una versión anterior no autoriza una versión nueva. Una propuesta que supera ambas instancias aparece en el banco permitido. La práctica no afecta ELO; una partida clasificatoria no expone el material privado ni utiliza preguntas propias de sus participantes. Fallos del proveedor y reintentos no generan publicaciones ni cargos duplicados por la lógica de la aplicación.
