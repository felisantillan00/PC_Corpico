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
    setInterval(() => {
        if (index < cartas.length - 1) {
            index++;
        } else {
            index = 0;
        }
        actualizarVista();
    }, 2000); // Cambia cada 5 segundos
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
        frente.style.backgroundImage = `url('../resources/img/PortadaJuegos/${nombreArchivo(id)}')`;
    });
});