const temas = [
  "Ayudarse", "Democracia", "Equidad", "Honestidad", "Preocupacion",
  "Responsabilidad", "ResponsabilidadSocial",
  "Solidaridad", "Transparencia"
];

let temaActual = "";
let movimientosErroneos = 0;
let puzzlesResueltos = 0;
const maxErrores = 20;
const maxPuzzles = 5;
let rows, columns, carpeta;
let currTile = null, otherTile = null;
let puntaje = 0;
let styleEl; // para guardar la referencia del <style>

function iniciarJuego() {
  const dificultad = localStorage.getItem("nivelSeleccionado") || "facil";
  if (dificultad === "facil") {
    rows = 3;
    columns = 3;
    carpeta = "JuegoPuzzleFacil";
  } else {
    rows = 4;
    columns = 4;
    carpeta = "JuegoPuzzleDificil";
  }

  const board = document.getElementById("board");
  const boardSize = dificultad === "facil" ? 360 : 480;
  const piezaSize = boardSize / rows;

  board.style.width = `${boardSize}px`;

  if (styleEl) styleEl.remove();
  styleEl = document.createElement("style");
  styleEl.textContent = `
  #board {
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    gap: 5px;
    background-color: #fdfd63;
    padding: 5px;
    border: 5px solid rgb(253, 253, 100);
    box-sizing: border-box;
  }

  .pieza {
    aspect-ratio: 1 / 1; /* Mantiene celdas cuadradas */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #board img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Rellena completamente la celda */
    display: block;
    margin: 0;
    padding: 0;
    border: none;
  }
`;
  document.head.appendChild(styleEl);


  const temasJugados = JSON.parse(localStorage.getItem("temasPuzzleJugados") || "[]");
  const temasDisponibles = temas.filter(t => !temasJugados.includes(t));

  if (temasDisponibles.length === 0) {
    localStorage.removeItem("temasPuzzleJugados");
    return iniciarJuego(); // reiniciar lista
  }

  temaActual = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
  temasJugados.push(temaActual);
  localStorage.setItem("temasPuzzleJugados", JSON.stringify(temasJugados));
  document.getElementById("ronda").innerText = puzzlesResueltos + 1;

  movimientosErroneos = 0;
  document.getElementById("movimientosErrados").innerText = movimientosErroneos;
  document.getElementById("puntaje").innerText = puntaje;
  board.innerHTML = "";
  document.getElementById("ImageTitle").src =
    `../resources/img/${carpeta}/${temaActual}/0.png`;

  const totalPiezas = rows * columns;
  const piezas = mezclarArray(Array.from({ length: totalPiezas }, (_, i) => `${i + 1}`));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const valor = piezas.shift();
      const cont = document.createElement("div");
      cont.classList.add("pieza");
      cont.id = `${r}-${c}`;
      const img = document.createElement("img");
      img.src = `../resources/img/${carpeta}/${temaActual}/${valor}.png`;
      cont.append(img);
      cont.addEventListener("click", manejarClick);
      board.append(cont);
    }
  }
}

function manejarClick() {
  if (!currTile) {
    currTile = this;
    currTile.querySelector("img").classList.add("seleccionada");
    return;
  }
  if (this === currTile) {
    currTile.querySelector("img").classList.remove("seleccionada");
    currTile = null;
    return;
  }
  otherTile = this;
  const imgA = currTile.querySelector("img");
  const imgB = otherTile.querySelector("img");
  [imgA.src, imgB.src] = [imgB.src, imgA.src];

  currTile.querySelector("img").classList.remove("seleccionada");
  currTile = otherTile = null;

  if (!checkGanado()) {
    movimientosErroneos++;
    document.getElementById("movimientosErrados").innerText = movimientosErroneos;
    if (movimientosErroneos >= maxErrores) {
      puzzlesResueltos++;
      if (puzzlesResueltos === maxPuzzles) {
        mostrarModal(
          `😞 Perdiste esta ronda. Completaste ${puzzlesResueltos}/${maxPuzzles}. Fin del juego.`,
          () => {
            let total = parseInt(localStorage.getItem("puntajeJugador")) || 0;
            localStorage.setItem("puntajeJugador", total + puntaje);
            localStorage.removeItem("temasPuzzleJugados");
            window.location.href = "menuJuego.html";
          }
        );
      } else {
        mostrarModal(
          `❌ Perdiste esta ronda. Siguiente oportunidad… Puzzle ${puzzlesResueltos}/${maxPuzzles} `,
          iniciarJuego
        );
      }
    }

  }
}

function checkGanado() {
  const piezas = Array.from(document.getElementById("board").children);
  piezas.sort((a, b) => {
    const [ra, ca] = a.id.split("-").map(Number);
    const [rb, cb] = b.id.split("-").map(Number);
    return (ra * columns + ca) - (rb * columns + cb);
  });
  return piezas.every((pieza, i) => {
    const img = pieza.querySelector("img");
    const match = img.src.match(/(\d+)\.png$/);
    return match && match[1] === `${i + 1}`;
  });
}

function mostrarModal(texto, callback) {
  const modal = document.getElementById("modal");
  const modalTxt = document.getElementById("modal-texto");
  const container = document.querySelector(".container");
  modalTxt.innerText = texto;
  modal.classList.remove("oculto");
  container.classList.add("desenfocado");
  setTimeout(() => {
    modal.classList.add("oculto");
    container.classList.remove("desenfocado");
    if (callback) callback();
  }, 3000);
}

function mezclarArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

window.onload = () => {
  iniciarJuego();
  document.getElementById("confirmarPuzzle")?.addEventListener("click", () => {
    if (checkGanado()) {
      puzzlesResueltos++;
      puntaje += 10;
      document.getElementById("puntaje").innerText = puntaje;

      if (puzzlesResueltos === maxPuzzles) {
        mostrarModal(
          `🎉 ¡Ganaste el juego! Completaste ${puzzlesResueltos} rompecabezas.`,
          () => {
            let total = parseInt(localStorage.getItem("puntajeJugador")) || 0;
            localStorage.setItem("puntajeJugador", total + puntaje);
            localStorage.removeItem("temasPuzzleJugados");
            window.location.href = "menuJuego.html";
          }
        );
      } else {
        mostrarModal(
          `✅ ¡Muy bien! Completaste un puzzle. Van ${puzzlesResueltos}/${maxPuzzles}`,
          iniciarJuego
        );
      }
    }
  });
};
