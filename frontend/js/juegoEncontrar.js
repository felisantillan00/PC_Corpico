document.addEventListener("DOMContentLoaded", () => {
    const dificultad = localStorage.getItem("nivelSeleccionado") || "facil"; // por defecto "facil"

    const moves = document.getElementById("moves-count");
    const tiempo = document.getElementById("time");
    const btnDetener = document.getElementById("stop");
    const contenedorJuego = document.querySelector(".game-container");
    const resultado = document.getElementById("result");
    const nombre = document.getElementById("nombre");

    let cartas;
    let intervalo;
    let primeraCarta = false;
    let seguntaCarta = false;

    const items = [
        { name: "Ayudarse", image: "../resources/img/Ayudarse.png" },
        { name: "Democracia", image: "../resources/img/Democracia.png" },
        { name: "Equidad", image: "../resources/img/Equidad.png" },
        { name: "Honestidad", image: "../resources/img/Honestidad.png" },
        { name: "Preocupacion", image: "../resources/img/Preocupacion.png" },
        { name: "Solidaridad", image: "../resources/img/Solidaridad.png" },
        { name: "Responsabilidad", image: "../resources/img/Responsabilidad.png" },
        { name: "ResponsabilidadSocial", image: "../resources/img/ResponsabilidadSocial.png" },
        { name: "Transparencia", image: "../resources/img/Transparencia.png" },
        // { name: "", image: "" },
    ];

    let segundos = 0, minutos = 0;
    let cantMovimientos = 0, victorias = 0;
    let puntos = 0;

    const timeGenerator = () => {
        segundos += 1;
        if (segundos >= 60) {
            minutos += 1;
            segundos = 0;
        }

        let valorEnSegundos = segundos < 10 ? `0${segundos}` : segundos;
        let valorEnMinutos = minutos < 10 ? `0${minutos}` : minutos;
        tiempo.innerHTML = "<span>Tiempo: </span> " + valorEnMinutos + ":" + valorEnSegundos;

    };

    const contarMovimientos = () => {
        cantMovimientos += 1;
        moves.innerHTML = `<span>Movimientos:</span>${cantMovimientos}`;
    };

    const generateRandom = (size = 4) => {
        let arrayTemp = [...items];
        let valoresDeLasCartas = [];

        let cantidadNecesaria = (size * size) / 2;
        let maxDisponible = Math.min(cantidadNecesaria, arrayTemp.length);

        for (let i = 0; i < maxDisponible; i++) {
            const randomIndex = Math.floor(Math.random() * arrayTemp.length);
            valoresDeLasCartas.push(arrayTemp[randomIndex]);
            arrayTemp.splice(randomIndex, 1);
        }
        return valoresDeLasCartas;
    };



    const generarMatriz = (valoresDeLasCartas, size = 4) => {
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

        for (let i = 0; i < size * size; i++) {

            if (i === 8) {
                contenedorJuego.innerHTML += `<div class="separador" data-separador></div>`;
            }
            const mitad = i < 8 ? "arriba" : "abajo";
            contenedorJuego.innerHTML += `
                <div class="card-container" data-card-value="${valoresDistribuidos[i].name}" data-mitad="${mitad}">
                    <div class="card-before">?</div>
                    <div class="card-after">
                    ${valoresDistribuidos[i].tipo === "imagen"
                    ? `<img src="${valoresDistribuidos[i].image}" class="image"/>`

                    : `${valoresDistribuidos[i].name === "ResponsabilidadSocial"
                        ? `<div class="palabra">
                                <div>Responsabilidad</div>
                                <div>social</div>
                            </div>`
                        : `<span class="palabra">${valoresDistribuidos[i].name}</span>`
                    }`


                }    
                    </div>
                </div>
                `;
        }

        contenedorJuego.style.gridTemplateColumns = `repeat(${size},auto)`;

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

                                puntos += 10;

                                victorias += 1;
                                if (victorias == Math.floor(valoresDistribuidos.length / 2)) {
                                    resultado.innerHTML = `
                                            <h2>¡Ganaste!</h2>
                                            <h4>Puntaje: ${puntos}</h4>
                                            <h4>Movimientos: ${cantMovimientos}</h4>
                                            <h4>Tiempo: ${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}</h4>
                                        `;
                                    document.querySelector(".zona-juego-con-ayuda").style.display = "none";
                                    resultado.style.display = "block";
                                    contenedorJuego.style.display = "none";
                                    moves.style.display = "none";
                                    tiempo.style.display = "none";
                                    btnDetener.style.display = "none";
                                    nombre.style.display = "none";
                                    resultado.style.display = "block";

                                    clearInterval(intervalo);

                                    let puntosGuardados = parseInt(localStorage.getItem('puntajeJugador')) || 0;
                                    localStorage.setItem('puntajeJugador', puntosGuardados + puntos);

                                    setTimeout(() => {
                                        window.location.href = "../pages/menuJuego.html";
                                    }, 5000);
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


    btnDetener.addEventListener("click", () => {
        clearInterval(intervalo);
        window.location.href = "../pages/menuJuego.html";
    });

    const mostrarAyudaDerecha = (valores) => {
        const contenedor = document.getElementById("ayuda-derecha");
        contenedor.innerHTML = `
    <div class="contenedor-ayuda">
      <p class="text">Ayuda:</p>
      <div class="ayuda-columna">
        ${valores.map(item => `
          <div class="ayuda-item">
            <img src="${item.image}" alt="${item.name}" />
            <span>${item.name === "ResponsabilidadSocial" ? "Responsabilidad<br>social" : item.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
    };


    const iniciar = () => {
        resultado.innerText = "";
        segundos = 0;
        minutos = 0;
        cantMovimientos = 0;
        puntos = 0;
        victorias = 0;
        intervalo = setInterval(timeGenerator, 1000);
        moves.innerHTML = `<span>Movimientos:</span> ${cantMovimientos}`;

        const valoresDeLasCartas = generateRandom();

        // Mostrar u ocultar ayuda
        const ayudaDerecha = document.getElementById("ayuda-derecha");
        if (dificultad === "dificil") {
            ayudaDerecha.style.display = "none";
            contenedorJuego.parentElement.style.justifyContent = "center";
            contenedorJuego.style.width = "100%";
        } else {
            ayudaDerecha.style.display = "flex";
            mostrarAyudaDerecha(valoresDeLasCartas);
        }

        generarMatriz(valoresDeLasCartas);
    };


    iniciar();
});