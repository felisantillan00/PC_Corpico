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
    { name: "bee", image: "../resources/img/bee.png" },
    { name: "crocodile", image: "../resources/img/crocodile.png" },
    { name: "macaw", image: "../resources/img/macaw.png" },
    { name: "gorilla", image: "../resources/img/gorilla.png" },
    { name: "tiger", image: "../resources/img/tiger.png" },
    { name: "monkey", image: "../resources/img/monkey.png" },
    { name: "chameleon", image: "../resources/img/chameleon.png" },
    { name: "piranha", image: "../resources/img/piranha.png" },
    { name: "anaconda", image: "../resources/img/anaconda.png" },
    { name: "sloth", image: "../resources/img/sloth.png" },
    { name: "cockatoo", image: "../resources/img/cockatoo.png" },
    { name: "toucan", image: "../resources/img/toucan.png" },
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
    tiempo.innerHTML = `<span>Time:</span>${valorEnMinutos}:${valorEnSegundos}`;
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
    valoresDeLasCartas = [...valoresDeLasCartas, ...valoresDeLasCartas];
    valoresDeLasCartas.sort(() => Math.random() - 0.5);
    for (let i = 0; i < tamaño * tamaño; i++) {
        contenedorJuego.innerHTML += `
     <div class="card-container" data-card-value="${valoresDeLasCartas[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${valoresDeLasCartas[i].image}" class="image"/></div>
     </div>
     `;
    }

    contenedorJuego.style.gridTemplateColumns = `repeat(${tamaño},auto)`;

    cartas = document.querySelectorAll(".card-container");
    cartas.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched") && card !== primeraCarta) {
                card.classList.add("flipped");
                if (!primeraCarta) {
                    primeraCarta = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    contarMovimientos();
                    seguntaCarta = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        primeraCarta.classList.add("matched");
                        seguntaCarta.classList.add("matched");
                        primeraCarta = false;
                        victorias += 1;
                        if (victorias == Math.floor(valoresDeLasCartas.length / 2)) {
                            resultado.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${cantMovimientos}</h4>`;
                            detenerJuego();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [primeraCarta, seguntaCarta];
                        primeraCarta = false;
                        seguntaCarta = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 500);
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
