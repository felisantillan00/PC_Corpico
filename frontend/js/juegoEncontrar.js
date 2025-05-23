const moves = document.getElementById("moves-count");
const tiempo = document.getElementById("time");
const btnComenzar = document.getElementById("start");
const btnDetener = document.getElementById("stop");
const contenedorJuego = document.querySelector(".game-container");
const resultado = document.getElementById("result");
const controles = document.querySelector(".controls-container");
let cartas;
let intervalo;
let primeraCarta = false;
let seguntaCarta = false;

const items = [
    { name: "ayudarse", image: "../resources/img/Ayudarse.jpg" },
    { name: "democracia", image: "../resources/img/Democracia.jpg" },
    { name: "equidad", image: "../resources/img/equidad.jpg" },
    { name: "honestidad", image: "../resources/img/Honestidad.jpeg" },
    { name: "igualdad", image: "../resources/img/igualdad.jpeg" },
    { name: "solidaridad", image: "../resources/img/solidaridad.jpg" },
    { name: "responsabilidad", image: "../resources/img/responsabilidad.jpg" },
    { name: "preocupacion", image: "../resources/img/preocupacionXlosDemas.jpg" },
    { name: "responsabilidadSocial", image: "../resources/img/ResponsabilidadSocial.png" },
    { name: "transparencia", image: "../resources/img/Transparencia.jpg" },
    // { name: "", image: "" },
];

let segundos = 0, minutos = 0;
let cantMovimientos = 0, victorias = 0;

const timeGenerator = () => {
    segundos += 1;
    if (segundos >= 60) {
        minutos += 1;
        segundos = 0;
    }

    let valorEnSegundos = segundos < 10 ? `0${segundos}` : segundos;
    let valorEnMinutos = minutos < 10 ? `0${minutos}` : minutos;
    tiempo.innerHTML = `<span>Time: </span>${valorEnMinutos}:${valorEnSegundos}`;
};

const contarMovimientos = () => {
    cantMovimientos += 1;
    moves.innerHTML = `<span>Moves:</span>${cantMovimientos}`;
};

//Pick random objects from the items array
const generateRandom = (tamaño = 4) => {

    let arrayTemp = [...items];

    let valoresDeLasCartas = [];

    tamaño = (tamaño * tamaño) / 2;

    for (let i = 0; i < tamaño; i++) {
        const randomIndex = Math.floor(Math.random() * arrayTemp.length);
        valoresDeLasCartas.push(arrayTemp[randomIndex]);
        arrayTemp.splice(randomIndex, 1);
    }
    return valoresDeLasCartas;
};

const generarMatriz = (valoresDeLasCartas, tamaño = 4) => {
    contenedorJuego.innerHTML = "";

    let primeraMitad = [];
    let segundaMitad = [];

    valoresDeLasCartas.forEach((carta) => {
        primeraMitad.push({ ...carta, tipo: "imagen" });
        segundaMitad.push({ ...carta, tipo: "texto" });
    });
    primeraMitad.sort(() => Math.random() - 0.5);
    segundaMitad.sort(() => Math.random() - 0.5);

    let valoresDistribuidos = [...primeraMitad, ...segundaMitad];

    for (let i = 0; i < tamaño * tamaño; i++) {

        if (i === 8) {
            contenedorJuego.innerHTML += `
            <div class="separador"></div>`
        }
        const mitad = i < 8 ? "arriba" : "abajo";
        contenedorJuego.innerHTML += `
            <div class="card-container" data-card-value="${valoresDistribuidos[i].name}" data-mitad="${mitad}">
                <div class="card-before">?</div>
                <div class="card-after">
                ${valoresDistribuidos[i].tipo === "imagen" 
                    ? `<img src="${valoresDistribuidos[i].image}" class="image"/>` 
                    : `<span class="palabra">${
                        valoresDistribuidos[i].name === "responsabilidadSocial"
                        ? "responsabilidad<br>social"
                        : valoresDistribuidos[i].name}</span>`}
                </div>
            </div>
            `;
    }

    contenedorJuego.style.gridTemplateColumns = `repeat(${tamaño},auto)`;

    cartas = document.querySelectorAll(".card-container");
    cartas.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched") && card !== primeraCarta) {
                const mitad = card.getAttribute("data-mitad");
                if (!primeraCarta) {
                    primeraCarta = card;
                    firstCardValue = card.getAttribute("data-card-value");
                    mitadPrimera = mitad;
                    card.classList.add("flipped");
                } else {
                    if (mitad !== mitadPrimera) {
                        card.classList.add("flipped");
                        contarMovimientos();
                        seguntaCarta = card;
                        let secondCardValue = card.getAttribute("data-card-value");
                        if (firstCardValue == secondCardValue) {
                            primeraCarta.classList.add("matched");
                            seguntaCarta.classList.add("matched");

                            victorias += 1;
                            if (victorias == Math.floor(valoresDistribuidos.length / 2)) {
                                resultado.innerHTML = `<h2>You Won</h2>
                                        <h4>Moves: ${cantMovimientos}</h4>`;
                                detenerJuego();
                            }
                        } else {
                            let [tempFirst, tempSecond] = [primeraCarta, seguntaCarta];

                            let delay = setTimeout(() => {
                                tempFirst.classList.remove("flipped");
                                tempSecond.classList.remove("flipped");
                            }, 500);
                        }
                        primeraCarta = false;
                        seguntaCarta = false;
                        mitadPrimera = null;
                    } else {
                        console.log("Debes elegir una carta de la otra mitad.");
                    }
                }
            }
        });
    });
};

//Start game
btnComenzar.addEventListener("click", () => {
    cantMovimientos = 0;
    segundos = 0;
    minutos = 0;
    //controls amd buttons visibility
    controles.classList.add("hide");
    btnDetener.classList.remove("hide");
    btnComenzar.classList.add("hide");
    //Start timer
    intervalo = setInterval(timeGenerator, 1000);
    //initial moves
    moves.innerHTML = `<span>Moves:</span> ${cantMovimientos}`;
    iniciar();
});

//Stop game
btnDetener.addEventListener(
    "click",
    (detenerJuego = () => {
        controles.classList.remove("hide");
        btnDetener.classList.add("hide");
        btnComenzar.classList.remove("hide");
        clearInterval(intervalo);
    })
);

//Initialize values and func calls
const iniciar = () => {
    resultado.innerText = "";
    victorias = 0;
    let valoresDeLasCartas = generateRandom();
    console.log(valoresDeLasCartas);
    generarMatriz(valoresDeLasCartas);
};
