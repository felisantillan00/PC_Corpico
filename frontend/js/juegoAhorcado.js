const palabras = [
    "cooperativa", "solidaridad", "trabajo", "ayuda",
    "autogestion", "igualdad", "participacion", "democracia",
    "responsabilidad", "educacion", "sostenibilidad", "transparencia"
];

let palabra = "";
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

function startGame() {
    if (palabraActual > totalPalabras) {
        finalizarJuego();
        return;
    }

    palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    letrasUsadas = [];
    errores = 0;

    palabraContainer.innerHTML = palabra.replace(/./g, "_ ");
    erroresEl.textContent = errores;
    letrasUsadasEl.textContent = "";
    partes.forEach(part => part.style.display = "none");
    generarTeclado();
    progresoEl.textContent = `Palabra ${palabraActual} / ${totalPalabras}`;
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
        if (errores > maxErrores) {
            palabraContainer.textContent = palabra;
            mostrarMensaje(`😵 ¡Perdiste esta palabra! Puntos: ${puntos}`, "error");
            setTimeout(() => {
                avanzarRonda();
            }, 3000);
        }

    }

    btn.disabled = true;
}

function actualizarPalabra() {
    let mostrada = "";
    let ganaste = true;
    for (const letra of palabra) {
        if (letrasUsadas.includes(letra)) {
            mostrada += letra + " ";
        } else {
            mostrada += "_ ";
            ganaste = false;
        }
    }
    palabraContainer.textContent = mostrada;
    if (ganaste) {
        puntos += 10;
        mostrarMensaje(`🎉 ¡Correcto! Puntos: ${puntos}`, "acierto");
        setTimeout(() => {
            avanzarRonda();
        }, 3000);
    }

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
    overlay.style.display = "block"; // Mostrar fondo blanco

    setTimeout(() => {
        modal.style.display = "none";
        overlay.style.display = "none"; // Ocultar fondo blanco
    }, 3000);
}



function desactivarTeclado() {
    document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = true);
}

function avanzarRonda() {
    palabraActual++;
    startGame();
}
// Iniciar juego al cargar
startGame();