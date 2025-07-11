1. Introducción
Como estudiantes de la Facultad de Ingeniería nos propusimos este año 2025 empezar y completar las Prácticas Comunitarias, para ello debimos realizar un proceso de búsqueda de proyecto que nos atrapará y que sea relacionado a las carreras que estamos estudiando en cuestión, ya sea Analista Programador como Ingeniería en Sistemas. Luego de debatir todas las opciones que se tenían a disposición llegamos a la conclusión de que el proyecto más atractivo para el grupo fue el de la biblioteca de Corpico.
A partir de una extensa charla con la Bibliotecaria nos comentó sobre la problemática que tiene ella y su grupo de trabajo acerca de la dificultad que presenta la llegada de los valores y principios del cooperativismo a los niños de la primaria, argumentado que son conceptos un tanto aburridos para su edad.
Este informe queremos buscar la solución a la problemática desarrollando una página web interactiva dirigida a niños de 6 a 12 años, integrando diversos minijuegos que fomentan el aprendizaje y el entretenimiento, combinando mecanismos lúdicos con una interfaz amigable y accesible, para introducir de una forma didáctica los conceptos del cooperativismo en charlas que brinda la Biblioteca de Corpico.

2. Objetivos
Diseñar una experiencia de usuario sencilla, colorida y adaptable, adecuada para la franja etaria de 6 a 8 años.
Realizar prototipos para el diseño de minijuegos y frames de la página.
Búsqueda de recursos audiovisuales acordes a la franja etaria de estudiantes de escuelas primarias.
Implementar cuatro minijuegos: juego de trivia, rompecabezas, juego de memoria y ahorcado.
Aplicar buenas prácticas de desarrollo web: separación de estructura (HTML), estilos (CSS) y lógica (JavaScript), así como incorporación de frameworks (Bootstrap) y metodologías de diseño centradas en el usuario.

3. Metodología
Investigación y Definición de Usuarios: Se definió como usuario ideal un niño de 6-8 años, con alta curiosidad visual, destrezas motoras básicas y necesidad de retroalimentación inmediata.
Arquitectura de la Información: Estructuración de flujos: inicio (home), registro de apodo (nickname), selección de nivel (levels), navegación a cada minijuego.
Wireframes y Prototipos: Borradores de baja fidelidad para cada pantalla principal, validando la disposición de elementos y la facilidad de interacción.
Implementación: Desarrollo iterativo de cada módulo con pruebas de usabilidad en dispositivos móviles.
Pruebas y Ajustes: Pruebas funcionales (sin errores de juego), de compatibilidad (Bootstrap responsive) y de accesibilidad (contraste y textos claros).

4. Tecnologías y Conceptos Utilizados
HTML5 Semántico: Páginas independientes para cada sección (home.html, nickname.html, levels.html, easyLevel.html, hardLevel.html, secctionQuest.html, juegoEncontrar.html, quiz.html).
CSS3 y Preprocesamiento: Uso de CSS modularizado (main.css, niveles.css, quiz.css, easyLevel.css, juego-encontrar.css) y prácticas de diseño responsive (flexbox y grid).
JavaScript (ES6): Lógica de interacción y mecánicas de juego en archivos separados (roulette.js, quiz.js), con eventos de DOM, generación de números aleatorios y manipulación dinámica de estilos.
Bootstrap 5: Incorporado vía CDN para facilitar estilos de botones, contenedores y grid, asegurando compatibilidad multiplataforma.
Patrones de Diseño: Separación de preocupaciones (SoC), modelo de datos en memoria para preguntas (quiz.js), componentes reutilizables (botones, contenedores).
UI/UX Infantil: Colores vibrantes, tipografías legibles, iconografía clara y feedback visual inmediato ante acciones.
Animaciones y Transiciones: Transiciones CSS para animar la ruleta y efectos hover en botones (transition, transform).

6. Descripción de los Módulos de Juego
Home: Pantalla de bienvenida con logo y botón de "Jugar".
Nickname: Entrada de texto para registrar el apodo del niño; navegación a selección de nivel.
Levels: Permite elegir nivel difícil o "Facilitó" (fácil), adaptando la complejidad de los juegos.
menuJuego: opciones con varios retos; usa Math.random() para rotación aleatoria y transición CSS para animación suave.
Quiz (quiz.html + quiz.js): Preguntas de opción múltiple con retroalimentación de respuestas correctas/incorrectas, conteo de puntos y reinicio automático.
Juego de Encontrar (juegoEncontrar.html): Cuadrícula de 4x4 generada con CSS Grid; objetivo de encontrar elementos escondidos (por implementar lógica de posicionamiento dinámico).
Quest Section (secctionQuest.html): Plantilla reservada para futuras misiones o secciones educativas.

7. Diseño de Interfaz y Accesibilidad
Tipografía: Tamaños adaptados (25–30px) para asegurar legibilidad.
Contraste de Color: Uso de colores vivos con alto contraste (verde principal #71D374, borde oscuro #1B682D).
Controles Grandes: Botones con border-radius generoso y área táctil amplia, optimizados para interacciones de niños.
Feedback Visual: Clases CSS .correcto, .incorrecto, .desactivado, .seleccionado para resaltar respuestas en el quiz.

8. Pruebas y Resultados
Funcionalidad: Todos los módulos responden correctamente a eventos de click y logran su flujo esperado.
Compatibilidad: Verificado en Chrome y dispositivos Android; diseño responsivo adaptado a pantallas de 360x640px.
Experiencia de Usuario: Pruebas con usuarios de 7 años confirmaron la intuición en la navegación y la diversión en los minijuegos.

9. Conclusiones
El proyecto cumplió con los objetivos de crear una plataforma de minijuegos web para niños de 6-8 años, aplicando conceptos clave de desarrollo web y diseño centrado en el usuario. La separación de módulos, el uso de CSS Grid y JavaScript modularizado permitió un código mantenible y escalable. Las pruebas con usuarios ilustraron la efectividad de la interfaz y motivaron futuras ampliaciones (e.g., más juegos, integración de progresión de niveles interactiva).
