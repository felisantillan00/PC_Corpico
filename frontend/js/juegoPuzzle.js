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
const rows = 3, columns = 3;
let currTile = null, otherTile = null;
let puntaje = 0;

function iniciarJuego() {
  const temasJugados = JSON.parse(localStorage.getItem("temasPuzzleJugados") || "[]");
  const temasDisponibles = temas.filter(t => !temasJugados.includes(t));

  if (temasDisponibles.length === 0) {
    // Todos los temas ya fueron jugados, reiniciamos la lista
    localStorage.removeItem("temasPuzzleJugados");
    return iniciarJuego(); // volver a empezar desde cero
  }

  temaActual = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
  temasJugados.push(temaActual);
  localStorage.setItem("temasPuzzleJugados", JSON.stringify(temasJugados));
  document.getElementById("ronda").innerText = puzzlesResueltos + 1;

  movimientosErroneos = 0;
  document.getElementById("movimientosErrados").innerText = movimientosErroneos;
  document.getElementById("puntaje").innerText = puntaje;
  document.getElementById("board").innerHTML = "";
  document.getElementById("ImageTitle").src =
    `../resources/img/JuegoPuzzle/${temaActual}/0.jpg`;

  const piezas = mezclarArray(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const board = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const valor = piezas.shift();
      // Creo el wrapper
      const cont = document.createElement("div");
      cont.classList.add("pieza");
      cont.id = `${r}-${c}`;                    // importante para ordenar luego
      // Creo la imagen
      const img = document.createElement("img");
      img.src = `../resources/img/JuegoPuzzle/${temaActual}/${valor}.jpg`;
      // Anido y escucho clicks sobre el wrapper
      cont.append(img);
      cont.addEventListener("click", manejarClick);
      board.append(cont);
    }
  }
}

function manejarClick() {
  // this === <div class="pieza" id="r-c">
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
  // Swapeo los src de las imágenes hijas
  const imgA = currTile.querySelector("img");
  const imgB = otherTile.querySelector("img");
  [imgA.src, imgB.src] = [imgB.src, imgA.src];

  currTile.classList.remove("seleccionada");
  currTile = otherTile = null;

  if (!checkGanado()) {
    movimientosErroneos++;
    document.getElementById("movimientosErrados").innerText = movimientosErroneos;
    if (movimientosErroneos >= maxErrores) {
      mostrarModal(
        "❌ Alcanzaste el máximo de errores. Reiniciando juego…",
        () => { puzzlesResueltos = puntaje = 0; iniciarJuego(); }
      );
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
    const match = img.src.match(/(\d+)\.jpg$/);
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
