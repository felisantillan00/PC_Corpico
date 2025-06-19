const temas = ["Ayudarse", "Democracia", "Equiedad", "Honestidad", "Igualdad", "PreocupacionXlosDemas", "Responsabilidad", "ResponsabilidadSocial", "Solaridad", "Transaparencia"];
let temaActual = "";
let movimientosErroneos = 0;
let puzzlesResueltos = 0;
const maxErrores = 20;
const maxPuzzles = 5;

const rows = 3;
const columns = 3;

let currTile;
let otherTile;

function iniciarJuego() {
    temaActual = temas[Math.floor(Math.random() * temas.length)];
    movimientosErroneos = 0;

    document.getElementById("movimientosErrados").innerText = movimientosErroneos;
    document.getElementById("board").innerHTML = "";
    document.getElementById("ImageTitle").src = `../resources/img/JuegoPuzzle/${temaActual}/0.jpg`;

    let piezas = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    piezas = mezclarArray(piezas);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = `${r}-${c}`;
            tile.src = `../resources/img/JuegoPuzzle/${temaActual}/${piezas.shift()}.jpg`;

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile || !currTile) return;

    const [r1, c1] = currTile.id.split("-").map(Number);
    const [r2, c2] = otherTile.id.split("-").map(Number);

    const esAdyacente =
        (Math.abs(r1 - r2) === 1 && c1 === c2) || // vertical
        (Math.abs(c1 - c2) === 1 && r1 === r2);   // horizontal

    if (esAdyacente) {
        // Swap válido
        const currNombre = currTile.src.split("/").pop();
        const otherNombre = otherTile.src.split("/").pop();

        currTile.src = `../resources/img/JuegoPuzzle/${temaActual}/${otherNombre}`;
        otherTile.src = `../resources/img/JuegoPuzzle/${temaActual}/${currNombre}`;
        
        movimientosErroneos++;
        document.getElementById("movimientosErrados").innerText = movimientosErroneos;

        setTimeout(() => {
            if (checkGanado()) {
                puzzlesResueltos++;
                if (puzzlesResueltos >= maxPuzzles) {
                    alert("¡Ganaste el juego! Completaste 5 rompecabezas.");
                    puzzlesResueltos = 0;
                } else {
                    alert(`¡Muy bien! Completaste un puzzle. Van ${puzzlesResueltos}/5`);
                }
                iniciarJuego();
            }
        }, 100);
    } else {
        // Movimiento inválido
        movimientosErroneos++;
        document.getElementById("movimientosErrados").innerText = movimientosErroneos;

        if (movimientosErroneos >= maxErrores) {
            alert("¡Perdiste! Usaste los 20 movimientos inválidos.");
            puzzlesResueltos = 0;
            iniciarJuego();
        }
    }
    currTile = null;
    otherTile = null;
}

function checkGanado() {
    const board = document.getElementById("board").children;
    for (let i = 0; i < board.length; i++) {
        const nombreArchivo = board[i].src.match(/(\d+\.jpg)$/)?.[1]; // solo "3.jpg"
        const esperado = `${i + 1}.jpg`;
        if (nombreArchivo !== esperado) {
            return false;
        }
    }
    return true;
}

window.onload = iniciarJuego;