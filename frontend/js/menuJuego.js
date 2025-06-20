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

function centrarCartasVisibles() {
    const contenedor = document.querySelector('.cartas-container');
    const visibles = Array.from(contenedor.querySelectorAll('.carta'))
        .filter(carta => carta.style.display !== 'none');

    if (window.innerWidth <= 767 && visibles.length > 0) {
        const cartaCentral = visibles[Math.floor(visibles.length / 2)];
        cartaCentral.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    }
}
// Mostrar puntaje y ocultar cartas jugadas
document.addEventListener('DOMContentLoaded', () => {
    const puntaje = localStorage.getItem('puntajeJugador');
    document.getElementById('puntaje').textContent = `Puntaje actual: ${puntaje}`;

    const jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');

    document.querySelectorAll('.carta').forEach(carta => {
        const id = carta.dataset.id;
        if (jugados.includes(id)) {
            carta.style.display = 'none';
        }
    });

    centrarCartasVisibles(); // 👈 Llamada al final del DOMContentLoaded
});

document.addEventListener("DOMContentLoaded", () => {
    const puntajeActual = parseInt(localStorage.getItem('puntajeJugador')) || 0;
    document.getElementById("puntaje").textContent = `Puntaje actual: ${puntajeActual}`;
});
function reiniciarJuego() {
    localStorage.setItem('puntajeJugador', 0); // Reinicia el puntaje acumulado
    document.getElementById("puntaje").textContent = "Puntaje actual: 0";
    localStorage.removeItem('minijuegosJugados');
    window.location.href = './start/home.html';
    alert("🔄 Puntaje reiniciado.");
}

