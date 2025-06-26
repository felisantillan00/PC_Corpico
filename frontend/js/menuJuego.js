function revelarCarta(carta, url, texto) {
    if (carta.classList.contains('volteada')) return;
    const id = carta.dataset.id;
    let jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');
    if (!jugados.includes(id)) {
        jugados.push(id);
        localStorage.setItem('minijuegosJugados', JSON.stringify(jugados));
    }

    function nombreArchivo(id) {
        switch (id) {
            case 'quiz': return 'Quizz.png';
            case 'ahorcado': return 'Ahorcado.png';
            case 'relacionar': return 'Memory_Game.png';
            case 'puzzle': return 'Puzzle.png';
            default: return 'default.png';
        }
    }
    // reversible visual  
    carta.classList.add('volteada');
    const portada = carta.querySelector('.portada');
    portada.style.backgroundImage = `url('../resources/img/PortadaJuegos/${nombreArchivo(id)}')`;
    const titulo = carta.querySelector('.titulo-portada');
    if (titulo) titulo.textContent = texto;

    portada.setAttribute("aria-label", texto); // opcional para accesibilidad

    // Aumenta 1 punto
    let ptos = parseInt(localStorage.getItem('puntajeJugador') || '0') + 1;
    localStorage.setItem('puntajeJugador', ptos);

    setTimeout(() => location.href = url, 1000);
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

    // Intentamos autoplay; si falla, lo lanzamos al primer clic
    bg.play();
    const contenedor = document.querySelector('.cartas-container');
    const indicadores = document.querySelector('.indicadores');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    // 1) Quitar cartas ya jugadas
    const jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');
    document.querySelectorAll('.carta').forEach(c => {
        if (jugados.includes(c.dataset.id)) c.remove();
    });

    // 2) Array dinámico de cartas
    const cartas = [...contenedor.children];
    let index = 0;
    contenedor.style.transform = 'translateX(0)';
    // 3) Crear indicadores
    indicadores.innerHTML = '';
    cartas.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        indicadores.appendChild(dot);
    });
    const dots = indicadores.querySelectorAll('.dot');

    // 4) Función para mover carrusel
    function actualizarVista() {
        if (!cartas.length) return;
        const primera = cartas[0];
        const style = getComputedStyle(primera);
        const total = primera.offsetWidth
            + parseFloat(style.marginLeft)
            + parseFloat(style.marginRight);
        contenedor.style.transform = `translateX(-${index * total}px)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[index]?.classList.add('active');
    }

    // 5) Flechas
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




    // 7) Pinta puntaje inicial y carrusel
    const pts = parseInt(localStorage.getItem('puntajeJugador') || '0');
    document.getElementById('puntaje').textContent = `Puntaje actual: ${pts}`;
    actualizarVista();
});