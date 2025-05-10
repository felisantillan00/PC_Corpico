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
    // Elegir una palabra aleatoria
    palabra = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    letrasUsadas = [];
    errores = 0;

    // Resetear todo
    palabraContainer.innerHTML = palabra.replace(/./g, "_ ");
    erroresEl.textContent = errores;
    letrasUsadasEl.textContent = "";
    partes.forEach(part => part.style.display = "none");
    generarTeclado();
}

function startGame() {
    if (palabraActual > totalPalabras) {
        alert(`🎉 ¡Terminaste las ${totalPalabras} palabras!`);
        preguntaElement.innerHTML = `Tus puntos fueron ${puntos} de las ${totalPalabras} palabras en el minijuego Ahorcado!`;
        let puntaje = parseInt(localStorage.getItem('puntajeJugador') || 0);
        localStorage.setItem('puntajeJugador', puntaje + puntos);
        setTimeout(() => {
            window.location.href = 'menuJuego.html';
        }, 3000); // 3 segundos
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
        puntos = + 6;

    } else {
        errores++;
        btn.classList.add("wrong");
        erroresEl.textContent = errores;
        mostrarParte(errores);
        if (errores > maxErrores) {
            palabraContainer.textContent = palabra;
            setTimeout(() => {
                alert("😵 ¡Perdiste esta palabra!");
                avanzarRonda();
            }, 500);
            puntos = - 3;
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
        setTimeout(() => {
            alert("🎉 ¡Correcto!");
            avanzarRonda();
        }, 500);
    }
}

function mostrarParte(errorCount) {
    if (errorCount <= partes.length) {
        partes[errorCount - 1].style.display = "block";
    }
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