function revelarCarta(carta, url, texto) {
    const id = carta.dataset.id;

    let jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');
    if (!jugados.includes(id)) {
        jugados.push(id);
        localStorage.setItem('minijuegosJugados', JSON.stringify(jugados));
    }

    // Ya no modificamos ni portada ni texto: asumimos que están predefinidos

    setTimeout(() => location.href = url, 300); // podés ajustar el delay si querés dar tiempo al efecto hover
}

function mostrarModal(idModal) {
    document.querySelector(".contenedor").classList.add("desenfocado");
    document.getElementById(idModal).classList.remove("oculto");
}

function ocultarModal(idModal) {
    document.getElementById(idModal).classList.add("oculto");
    document.querySelector(".contenedor").classList.remove("desenfocado");
}

function reiniciarJuego() {
    mostrarModal('modal-confirmacion');

    document.getElementById('btnConfirmarReinicio').onclick = () => {
        localStorage.setItem('puntajeJugador', 0);
        localStorage.removeItem('minijuegosJugados');
        document.getElementById("puntaje").textContent = "Puntaje actual: 0";
        ocultarModal('modal-confirmacion');

        mostrarModal('modal-exito');
        setTimeout(() => {
            ocultarModal('modal-exito');
            window.location.href = './start/home.html';
        }, 2000);
    };

    document.getElementById('btnCancelarReinicio').onclick = () => {
        ocultarModal('modal-confirmacion');
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const bg = document.getElementById('bg-music');
    bg.volume = 1;
    bg.play();

    const contenedor = document.querySelector('.cartas-container');
    const indicadores = document.querySelector('.indicadores');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');

    // Quitar cartas jugadas
    document.querySelectorAll('.carta').forEach(c => {
        if (jugados.includes(c.dataset.id)) c.remove();
    });

    const cartas = [...contenedor.children];

    // ⛔️ Si no quedan cartas, mostrar mensaje de felicitaciones y salir
    if (cartas.length === 0) {
        const contenedorPrincipal = document.querySelector('.contenedor');
        const nombre = localStorage.getItem('nombreJugador') || "Jugador";
        const puntaje = localStorage.getItem('puntajeJugador') || 0;
        iniciarFuegosArtificiales(8000); // Iniciar fuegos artificiales por 10 segundos
        contenedorPrincipal.innerHTML = `
            <p id="puntaje" style="font-size:1.4rem; margin-bottom: 2rem;">🎉 ¡Felicitaciones ${nombre}! 🎉<br><br>Completaste todos los juegos.<br><br>Puntaje final: <strong>${puntaje}</strong></p>
            <div class="btn-contenedor">
                <button id="reiniciar" class="btn-reiniciar">Reiniciar juego</button>
            </div>
        `;
        document.getElementById('reiniciar').addEventListener('click', () => {
            localStorage.setItem('puntajeJugador', 0);
            localStorage.removeItem('minijuegosJugados');
            window.location.href = './start/home.html';
        });

        return;
    }

    // Si quedan juegos, continúa con el carrusel
    let index = 0;
    contenedor.style.transform = 'translateX(0)';

    indicadores.innerHTML = '';
    cartas.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        indicadores.appendChild(dot);
    });
    const dots = indicadores.querySelectorAll('.dot');


    function iniciarFuegosArtificiales(duracion = 6000) {
        const canvas = document.getElementById("canvas-fuegos");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particulas = [];

        function crearExplosión(x, y) {
            const colores = ['#FF0000', '#00FFFF', '#00FF00', '#FFFF00', '#FF00FF', '#FFA500', '#FF69B4', '#00FF9F'];

            const color = colores[Math.floor(Math.random() * colores.length)];

            for (let i = 0; i < 50; i++) {
                const angulo = Math.random() * 2 * Math.PI;
                const velocidad = Math.random() * 5 + 2;
                particulas.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angulo) * velocidad,
                    vy: Math.sin(angulo) * velocidad,
                    alpha: 1,
                    color: color,
                });
            }
        }

        function animar() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particulas.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // gravedad
                p.alpha -= 0.01;

                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, 2 * Math.PI);
                ctx.fill();
            });

            // limpiar las partículas apagadas
            for (let i = particulas.length - 1; i >= 0; i--) {
                if (particulas[i].alpha <= 0) {
                    particulas.splice(i, 1);
                }
            }

            ctx.globalAlpha = 1;
            requestAnimationFrame(animar);
        }

        // Lanzar explosiones en lugares aleatorios
        const intervalo = setInterval(() => {
            const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
            const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
            crearExplosión(x, y);
        }, 500);

        animar();

        setTimeout(() => {
            clearInterval(intervalo);
        }, duracion);
    }



    function actualizarVista() {
        if (!cartas.length) return;
        const primera = cartas[0];
        const style = getComputedStyle(primera);

        const isMobile = window.innerWidth < 768;

        const total = isMobile
            ? primera.offsetHeight + parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0)
            : primera.offsetWidth + parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);

        contenedor.style.transform = isMobile
            ? `translateY(-${index * total}px)`
            : `translateX(-${index * total}px)`;

        dots.forEach(d => d.classList.remove('active'));
        dots[index]?.classList.add('active');
    }

    nextBtn.onclick = () => {
        if (index < cartas.length - 1) {
            index++;
            actualizarVista();
        }
    };
    prevBtn.onclick = () => {
        if (index > 0) {
            index--;
            actualizarVista();
        }
    };

    // Mostrar nombre y puntaje
    const nombre = localStorage.getItem('nombreJugador') || "Jugador";
    const pts = parseInt(localStorage.getItem('puntajeJugador') || '0');
    document.getElementById('puntaje').textContent = `Puntaje: ${pts}`;
    const nombreEl = document.getElementById('nombreJugador');
    if (nombreEl) nombreEl.textContent = nombre;

    actualizarVista();
    if (window.innerWidth >= 768) {
        setInterval(() => {
            if (index < cartas.length - 1) {
                index++;
            } else {
                index = 0;
            }
            actualizarVista();
        }, 3000); // 5 segundos
    }
    cartas.forEach(carta => {
        const id = carta.dataset.id;

        const nombreArchivo = (id) => {
            switch (id) {
                case 'quiz': return 'Quizz.png';
                case 'ahorcado': return 'Ahorcado.png';
                case 'relacionar': return 'Memory_Game.png';
                case 'puzzle': return 'Puzzle.png';
                default: return 'default.png';
            }
        };

        const frente = carta.querySelector('.frente');
        cartas.forEach(carta => {
            const id = carta.dataset.id;
            const frente = carta.querySelector('.frente');

            const nombreArchivo = (id, esMovil) => {
                let base;
                switch (id) {
                    case 'quiz': base = 'Quizz'; break;
                    case 'ahorcado': base = 'Ahorcado'; break;
                    case 'relacionar': base = 'Memory_Game'; break;
                    case 'puzzle': base = 'Puzzle'; break;
                    default: base = 'default'; break;
                }
                return esMovil ? `${base}_movile.png` : `${base}.png`;
            };

            const esMovil = window.innerWidth < 768;
            frente.style.backgroundImage = `url('../resources/img/PortadaJuegos/${nombreArchivo(id, esMovil)}')`;
        });

    });
});