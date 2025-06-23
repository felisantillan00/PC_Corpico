const sonidoCorrecto = new Audio('../resources/sounds/correct_sound.mp3');
const sonidoIncorrecto = new Audio('../resources/sounds/incorrect_sound.mp3');

const preguntasFacil = [
    {
        preg: "¿Qué hacen las personas en una cooperativa?",
        respuestas: [
            { texto: "Solo obedecen a un jefe sin opinar", correcta: false },
            { texto: "Compiten para ver quién gana más dinero.", correcta: false },
            { texto: "Trabajan juntas y toman decisiones en grupo.", correcta: true },
        ]
    },
    {
        preg: "¿Por qué es bueno ayudar a los demás en una cooperativa?",
        respuestas: [
            { texto: " Porque así todos pueden mejorar su vida.", correcta: true },
            { texto: " Porque solo algunas personas deben beneficiarse.", correcta: false },
            { texto: "Porque es obligatorio ayudar.", correcta: false },
        ]
    },
    {
        preg: "Si en tu barrio no hay una librería y muchas personas necesitan libros, ¿qué pueden hacer?",
        respuestas: [
            { texto: "Ir a comprar los libros a otra ciudad.", correcta: false },
            { texto: "Esperar que alguien abra una librería.", correcta: false },
            { texto: "Formar una cooperativa para vender libros a buen precio.", correcta: true },
        ]
    },
    {
        preg: "¿Qué pasa si las personas de una cooperativa no trabajan juntas?",
        respuestas: [
            { texto: "No pasaría nada, todo seguiría igual.", correcta: false },
            { texto: "La cooperativa podría cerrar o no funcionar bien.", correcta: true },
            { texto: "La cooperativa crecería más rápido.", correcta: false },
        ]
    },
    {
        preg: "¿Cómo puedes ser cooperativo en la escuela?",
        respuestas: [
            { texto: "Compartiendo, ayudando y trabajando en equipo.", correcta: true },
            { texto: "Haciendo todo solo y sin compartir.", correcta: false },
            { texto: "Ignorando a los demás y pensando solo en ti.", correcta: false },
        ]
    },
    {
        preg: "¿Por qué es importante ayudar a los demás?",
        respuestas: [
            { texto: "Porque solo algunos deben ayudar.", correcta: false },
            { texto: "Porque así todos vivimos mejor.", correcta: true },
            { texto: "Porque es obligatorio.", correcta: false },
        ]
    },
    {
        preg: "¿Qué harías si ves que un compañero necesita ayuda en una tarea o en un juego?",
        respuestas: [
            { texto: "Le digo que busque ayuda en otro lado.", correcta: false },
            { texto: "No lo ayudo porque cada uno debe hacer su trabajo.", correcta: false },
            { texto: "Lo ayudo porque todos podemos aprender juntos.", correcta: true },
        ]
    },
    {
        preg: "¿Qué ventajas tiene trabajar en equipo en lugar de hacerlo solo?",
        respuestas: [
            { texto: "Se trabaja más rápido y mejor.", correcta: true },
            { texto: "Es más difícil y lleva más tiempo.", correcta: false },
            { texto: "No hay ninguna ventaja.", correcta: false },
        ]
    }
];

const preguntasDificil = [
    {
        preg: "Historia de las Cooperativas – ¿En qué país nació la primera cooperativa?",
        respuestas: [
            { texto: "Francia", correcta: false },
            { texto: "Inglaterra", correcta: true },
        ]
    },
    {
        preg: "¿Qué hicieron los primeros cooperativistas para ayudar a su comunidad?",
        respuestas: [
            { texto: "Crearon un supermercado juntos", correcta: true },
            { texto: "Jugaron al fútbol", correcta: false },
        ]
    },
    {
        preg: "¿Qué grupo de personas fundó la primera cooperativa moderna y por qué lo hicieron?",
        respuestas: [
            { texto: "Agricultores que querían compartir cosechas", correcta: false },
            { texto: "Comerciantes que buscaban nuevos clientes", correcta: false },
            { texto: "Tejedores que necesitaban comprar productos básicos a precios justos", correcta: true },
            { texto: "Panaderos que deseaban vender más pan", correcta: false },
        ]
    },
    {
        preg: "¿Qué principios básicos siguieron los fundadores de la primera cooperativa?",
        respuestas: [
            { texto: "Ayuda mutua, democracia y educación", correcta: true },
            { texto: "Competencia, ahorro y exclusividad", correcta: false },
            { texto: "Innovación, jerarquía y comercio", correcta: false },
            { texto: "Trabajo duro, independencia y secreto", correcta: false },
        ]
    },
    {
        preg: "¿Cómo ayuda el cooperativismo a las comunidades?",
        respuestas: [
            { texto: "Generando empleos y promoviendo la igualdad", correcta: true },
            { texto: "Permitiendo que solo algunos se beneficien", correcta: false },
            { texto: "Impulsando solo a las grandes empresas", correcta: false },
            { texto: "Eliminando el trabajo en equipo", correcta: false },
        ]
    },
    {
        preg: "¿Qué diferencia a una cooperativa de una empresa tradicional?",
        respuestas: [
            { texto: "Las cooperativas son dirigidas por sus miembros y no por accionistas", correcta: true },
            { texto: "Las cooperativas solo venden productos importados", correcta: false },
            { texto: "Las empresas tradicionales no buscan ganancias", correcta: false },
            { texto: "Las cooperativas no permiten trabajar en equipo", correcta: false },
        ]
    }
];

const preguntaElement = document.getElementById("pregunta");
const respuestaButton = document.getElementById("boxBotones");
const siguienteButton = document.getElementById("btn-sig");

let preguntas = [];
let posicionActual = 0;
let puntos = 0;

function empezar() {
    preguntas = obtenerPreguntasPorDificultad();
    posicionActual = 0;
    puntos = 0;
    siguienteButton.innerHTML = "Siguiente";
    showPregunta();
}

function obtenerPreguntasPorDificultad() {
    const nivel = localStorage.getItem("nivelSeleccionado"); // ej. "facil" o "dificil"
    switch (nivel) {
        case "facil":
            return preguntasFacil;
        case "dificil":
            return preguntasDificil;
    }
}

function showPregunta() {
    resetEstado();
    let preguntaActual = preguntas[posicionActual];
    let preguntanro = posicionActual + 1;
    preguntaElement.innerHTML = preguntanro + ". " + preguntaActual.preg;

    preguntaActual.respuestas.forEach(respuesta => {
        const button = document.createElement("button");
        button.innerHTML = respuesta.texto;
        button.classList.add("btn-preg");
        button.classList.add("color-prin");
        respuestaButton.appendChild(button);
        if (respuesta.correcta) {
            button.dataset.correcta = respuesta.correcta;
        }
        button.addEventListener("click", seleccionRespuesta);
    });
}

function resetEstado() {
    siguienteButton.style.visibility = "hidden";
    while (respuestaButton.firstChild) {
        respuestaButton.removeChild(respuestaButton.firstChild);
    }
}
function seleccionRespuesta(e) {
    const btnSeleccionado = e.target;
    const esCorrecto = btnSeleccionado.dataset.correcta === "true";

    if (esCorrecto) {
        sonidoCorrecto.currentTime = 0;  
        sonidoCorrecto.play();
        btnSeleccionado.classList.add("correcto");
        puntos += 10;
    } else {
        sonidoIncorrecto.currentTime = 0;
        sonidoIncorrecto.play();
        btnSeleccionado.classList.add("incorrecto");
    }

    Array.from(respuestaButton.children).forEach(button => {
        if (button !== btnSeleccionado) {
            button.classList.add("desactivado"); // Clase para el color gris
        } else {
            button.classList.add("seleccionado"); // Clase para mantener las letras claras
        }
        if (button.dataset.correcta === "true") {
            button.classList.add("correcto");
        }
        button.disabled = true; // Desactivar todos los botones
    });

    siguienteButton.style.visibility = "visible";
}

function showPuntos() {
    resetEstado();
    preguntaElement.innerHTML = `Tus puntos fueron ${puntos} de 80!`;
    let puntaje = parseInt(localStorage.getItem('puntajeJugador') || 0);
    localStorage.setItem('puntajeJugador', puntaje + puntos);
    setTimeout(() => {
        window.location.href = 'menuJuego.html';
    }, 3000); // 3 segundos
}

function handleSiguientebutton() {
    posicionActual++;
    if (posicionActual < preguntas.length) {
        showPregunta();
    } else {
        showPuntos();
    }
}

siguienteButton.addEventListener("click", () => {
    if (posicionActual < preguntas.length) {
        handleSiguientebutton();
    } else {
        empezar();
    }
});

empezar();