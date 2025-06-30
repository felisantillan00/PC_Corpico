const palabrasFacil = [
    { palabra: "Ayudarse", pista: "Acción de colaborar entre personas" },
    { palabra: "Democracia", pista: "Forma de gobierno donde todos pueden opinar" },
    { palabra: "Equidad", pista: "Dar a cada uno lo que necesita para igualar oportunidades" },
    { palabra: "Honestidad", pista: "Valor de decir siempre la verdad" },
    { palabra: "Igualdad", pista: "Todos tenemos los mismos derechos" }
];

const palabrasDificil = [
    { palabra: "Preocupacion por los demas", pista: "Pensar en el bienestar de otras personas" },
    { palabra: "Responsabilidad", pista: "Cumplir con lo que te corresponde" },
    { palabra: "Responsabilidad social", pista: "Ayudar a la comunidad desde tu lugar" },
    { palabra: "Solidaridad", pista: "Apoyar a alguien sin esperar nada a cambio" },
    { palabra: "Transparencia", pista: "Actuar con claridad y sin esconder nada" }
];

let palabras = [];
let palabra = "";
let pista = "";
let letrasUsadas = [];
let errores = 0;
let palabraActual = 1;
let puntos = 0;
const maxErrores = 6;
const totalPalabras = 5;

const palabraContainer = document.getElementById("word");
const teclado = document.getElementById("keyboard");
const erroresEl = document.getElementById("errors");
const letrasUsadasEl = document.getElementById("used-letters");
const partes = document.querySelectorAll(".part");
const progresoEl = document.getElementById("progreso");
const pistaEl = document.getElementById("pista");

function startGame() {
    if (palabraActual === 1) {
        palabras = obtenerPalabrasPorDificultad();
    }

    if (palabraActual > totalPalabras || palabras.length === 0) {
        finalizarJuego();
        return;
    }

    const palabraObj = palabras.splice(Math.floor(Math.random() * palabras.length), 1)[0];
    palabra = palabraObj.palabra.toUpperCase();
    pista = palabraObj.pista;

    letrasUsadas = [];
    errores = 0;

    palabraContainer.innerHTML = "";
    for (const letra of palabra) {
        const span = document.createElement("span");
        span.classList.add("letra");
        if (letra === " ") {
            span.innerHTML = "&nbsp;";  // para que el espacio sea detectado en CSS
            span.classList.add("espacio"); // clase para CSS
        } else {
            span.textContent = "_";
        }
        palabraContainer.appendChild(span);
    }
    pistaEl.textContent = `Pista: ${pista}`;
    erroresEl.textContent = errores;
    letrasUsadasEl.textContent = "";
    partes.forEach(part => part.style.display = "none");
    generarTeclado();
    progresoEl.textContent = `Palabra ${palabraActual} / ${totalPalabras}`;
    fitWord();
}

function obtenerPalabrasPorDificultad() {
    const nivel = localStorage.getItem("nivelSeleccionado");
    switch (nivel) {
        case "facil":
            return [...palabrasFacil];
        case "dificil":
            return [...palabrasDificil];
        default:
            return [...palabrasFacil];
    }
}

function finalizarJuego() {
    const modalFinal = document.getElementById("modalFinal");
    const textoFinal = document.getElementById("textoFinal");
    const overlay = document.getElementById("overlayBlanco");

    textoFinal.textContent = `🎉 ¡Terminaste! Puntaje total: ${puntos}`;
    modalFinal.style.display = "block";
    overlay.style.display = "block";

    let puntaje = parseInt(localStorage.getItem('puntajeJugador') || 0);
    localStorage.setItem('puntajeJugador', puntaje + puntos);

    setTimeout(() => {
        modalFinal.style.display = "none";
        overlay.style.display = "none";
        window.location.href = 'menuJuego.html';
    }, 3000);
}

function generarTeclado() {
    teclado.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => manejarLetra(letra, btn);
        teclado.appendChild(btn);
    }
}

function manejarLetra(letra, btn) {
    if (letrasUsadas.includes(letra)) return;

    letrasUsadas.push(letra);
    letrasUsadasEl.textContent = letrasUsadas.join(" ");

    if (palabra.includes(letra)) {
        btn.classList.add("correct");
        actualizarPalabra();
    } else {
        errores++;
        btn.classList.add("wrong");
        erroresEl.textContent = errores;
        mostrarParte(errores);
        if (errores === maxErrores) {
            palabraContainer.innerHTML = "";
            for (const letra of palabra) {
                const span = document.createElement("span");
                span.classList.add("letra");
                span.textContent = letra;
                palabraContainer.appendChild(span);
            }

            document.querySelector(".contenido-juego").classList.add("invisible");
            mostrarMensaje(`😵 ¡Perdiste esta palabra! Puntos: ${puntos}`, "error");
            setTimeout(() => {
                document.querySelector(".contenido-juego").classList.remove("invisible");
                avanzarRonda();
            }, 3000);
        }
    }

    btn.disabled = true;
}

function actualizarPalabra() {
    const spans = palabraContainer.querySelectorAll(".letra");
    let ganaste = true;

    for (let i = 0; i < palabra.length; i++) {
        const letra = palabra[i];
        if (letra === " ") {
            spans[i].innerHTML = "&nbsp;";
        } else if (letrasUsadas.includes(letra)) {
            spans[i].textContent = letra;
        } else {
            spans[i].textContent = "_";
            ganaste = false;
        }

    }

    if (ganaste) {
        puntos += 10;
        document.querySelector(".contenido-juego").classList.add("invisible");
        mostrarMensaje(`🎉 ¡Correcto! Puntos: ${puntos}`, "acierto");
        setTimeout(() => {
            document.querySelector(".contenido-juego").classList.remove("invisible");
            avanzarRonda();
        }, 3000);
    }

    fitWord();
}

function mostrarParte(errorCount) {
    if (errorCount <= partes.length) {
        partes[errorCount - 1].style.display = "block";
    }
}

function mostrarMensaje(texto, tipo) {
    const modal = document.getElementById("mensajeModal");
    const mensajeTexto = document.getElementById("mensajeTexto");
    const overlay = document.getElementById("overlayBlanco");

    mensajeTexto.textContent = texto;
    modal.className = `modal-puntos ${tipo}`;
    modal.style.display = "block";
    overlay.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        overlay.style.display = "none";
    }, 3000);
}

function avanzarRonda() {
    palabraActual++;
    startGame();
}

function fitWord() {
    const el = document.getElementById("word");
    const parentWidth = el.parentElement.clientWidth - 16;

    let fontSize = 20;
    let letterSpacing = 10;

    el.style.fontSize = fontSize + 'px';
    el.style.letterSpacing = letterSpacing + 'px';

    const isMobile = window.innerWidth <= 767;
    const minFontSize = isMobile ? 16 : 40;

    while (el.scrollWidth > parentWidth && fontSize > minFontSize) {
        fontSize *= 0.95;
        letterSpacing *= 0.95;
        el.style.fontSize = fontSize + 'px';
        el.style.letterSpacing = letterSpacing + 'px';
    }
}

startGame();
