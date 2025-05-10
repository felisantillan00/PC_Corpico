const preguntas = [
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
    }
];

const preguntaElement = document.getElementById("pregunta");
const respuestaButton = document.getElementById("boxBotones");
const siguienteButton = document.getElementById("btn-sig");

let posicionActual = 0;
let puntos = 0;

function empezar() {
    posicionActual = 0;
    puntos = 0;
    siguienteButton.innerHTML = "Siguiente";
    showPregunta();
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
        btnSeleccionado.classList.add("correcto");
        puntos++;
    } else {
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
    preguntaElement.innerHTML = `Tus puntos fueron ${puntos} de ${preguntas.length}!`;
    siguienteButton.innerHTML = "Volver a la ruleta";
    siguienteButton.style.visibility = "visible";
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