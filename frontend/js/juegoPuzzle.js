const temas = [
    "Ayudarse", "Democracia", "Equidad", "Honestidad", "Igualdad",
    "PreocupacionXlosDemas", "Responsabilidad", "ResponsabilidadSocial",
    "Solidaridad", "Transparencia"
];

let temaActual = "";
let movimientosErroneos = 0;
let puzzlesResueltos = 0;
const maxErrores = 20;
const maxPuzzles = 5;

const rows = 3;
const columns = 3;
let juegoTerminado = false;

let currTile = null;
let otherTile = null;

let puntaje = 0;

function iniciarJuego() {
    temaActual = temas[Math.floor(Math.random() * temas.length)];
    movimientosErroneos = 0;

    document.getElementById("movimientosErrados").innerText = movimientosErroneos;
    document.getElementById("puntaje").innerText = puntaje;
    document.getElementById("board").innerHTML = "";
    document.getElementById("ImageTitle").src = `../resources/img/JuegoPuzzle/${temaActual}/0.jpg`;

    const piezas = mezclarArray(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const valor = piezas.shift();
            const tile = document.createElement("img");
            tile.src = `../resources/img/JuegoPuzzle/${temaActual}/${valor}.jpg`;
            console.log(`Cargando: resources/img/JuegoPuzzle/${temaActual}/${valor}.jpg`);
            tile.id = `${r}-${c}`;
            tile.addEventListener("click", manejarClick);
            document.getElementById("board").append(tile);
        }
    }
}

function manejarClick() {
    if (!currTile) {
        currTile = this;
        currTile.classList.add("seleccionada");
        return;
    }

    if (this === currTile) {
        currTile.classList.remove("seleccionada");
        currTile = null;
        return;
    }

    otherTile = this;
    const tempSrc = currTile.src;
    currTile.src = otherTile.src;
    otherTile.src = tempSrc;

    currTile.classList.remove("seleccionada");

    currTile = null;
    otherTile = null;

    if (!checkGanado()) {
        movimientosErroneos++;
        document.getElementById("movimientosErrados").innerText = movimientosErroneos;

        if (movimientosErroneos === maxErrores) {
            mostrarModal("❌ Alcanzaste el máximo de errores. Reiniciando juego...", () => {
                puzzlesResueltos = 0;
                puntaje = 0;
                iniciarJuego();
            });
        }

    }
}
function mostrarModal(texto, callback) {
    const modal = document.getElementById("modal");
    const modalTexto = document.getElementById("modal-texto");

    modalTexto.innerText = texto;
    modal.classList.remove("oculto");

    setTimeout(() => {
        modal.classList.add("oculto");
        if (callback) callback();
    }, 3000); // 3 segundos
}


function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function checkGanado() {
    const piezas = Array.from(document.getElementById("board").children);

    piezas.sort((a, b) => {
        const [ra, ca] = a.id.split("-").map(Number);
        const [rb, cb] = b.id.split("-").map(Number);
        return (ra * columns + ca) - (rb * columns + cb);
    });

    for (let i = 0; i < piezas.length; i++) {
        const src = piezas[i].src;
        const match = src.match(/(\d+)\.jpg$/);
        const numero = match ? match[1] : null;
        const esperado = `${i + 1}`;
        if (numero !== esperado) return false;
    }

    return true;
}



window.onload = () => {
    iniciarJuego();
    const boton = document.getElementById("confirmarPuzzle");
    if (boton) {
        boton.addEventListener("click", () => {
            if (checkGanado()) {
                puzzlesResueltos++;
                puntaje += 10;
                document.getElementById("puntaje").innerText = puntaje;

                if (puzzlesResueltos == maxPuzzles) {
                    mostrarModal(`🎉 ¡Ganaste el juego! Completaste ${puzzlesResueltos} rompecabezas.`, () => {
                        let puntajeActual = parseInt(localStorage.getItem("puntajeJugador")) || 0;
                        localStorage.setItem("puntajeJugador", puntajeActual + puntaje);
                        window.location.href = "menuJuego.html";
                    });
                }
                else {
                    mostrarModal(`✅ ¡Muy bien! Completaste un puzzle. Van ${puzzlesResueltos}/5`, () => {
                        iniciarJuego();
                    });
                }
            }


        });
    }
};
