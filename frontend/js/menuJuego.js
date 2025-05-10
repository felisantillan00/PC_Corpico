function revelarCarta(carta, url, texto) {
    if (carta.classList.contains('volteada')) return;
    const id = carta.dataset.id;
    // Marcar el juego como completado
    const jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');
    if (!jugados.includes(id)) {
        jugados.push(id);
        localStorage.setItem('minijuegosJugados', JSON.stringify(jugados));
    }

    carta.classList.add('volteada');
    carta.querySelector('.dorso').textContent = texto;

    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}

// Inicializar puntaje si no existe
if (localStorage.getItem('puntajeJugador') === null) {
    localStorage.setItem('puntajeJugador', 0);
}

// Mostrar puntaje y ocultar cartas jugadas
document.addEventListener('DOMContentLoaded', () => {
    const puntaje = localStorage.getItem('puntajeJugador');
    document.getElementById('puntaje').textContent = `Puntaje actual: ${puntaje}`;

    const jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');

    document.querySelectorAll('.carta').forEach(carta => {
        const id = carta.dataset.id;
        if (jugados.includes(id)) {
            carta.style.display = 'none'; // Ocultar carta
        }
    });
});

function reiniciarJuego() {
    localStorage.removeItem('puntajeJugador');
    localStorage.removeItem('minijuegosJugados');
    window.location.href = './start/home.html';
}
