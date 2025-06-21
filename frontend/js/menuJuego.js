function revelarCarta(carta, url, texto) {
    if (carta.classList.contains('volteada')) return;
    const id = carta.dataset.id;
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

function reiniciarJuego() {
    localStorage.setItem('puntajeJugador', 0);
    localStorage.removeItem('minijuegosJugados');
    document.getElementById("puntaje").textContent = "Puntaje actual: 0";
    alert("🔄 Puntaje reiniciado.");
    window.location.href = './start/home.html';
}


document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector('.cartas-container');
    const cartas = [...contenedor.querySelectorAll('.carta')].filter(c => c.style.display !== 'none');
    const indicadores = document.querySelector('.indicadores');
    let index = 0;

    // Crear dots según la cantidad de cartas
    cartas.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        indicadores.appendChild(dot);
    });
    const dots = indicadores.querySelectorAll('.dot');

    function actualizarVista() {
        contenedor.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index]?.classList.add('active');
    }

    document.getElementById('next').addEventListener('click', () => {
        if (index < cartas.length - 1) {
            index++;
            actualizarVista();
        }
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (index > 0) {
            index--;
            actualizarVista();
        }
    });

    actualizarVista();
    const puntaje = parseInt(localStorage.getItem('puntajeJugador')) || 0;
    document.getElementById("puntaje").textContent = `Puntaje actual: ${puntaje}`;


});



if (jugados.includes(carta.dataset.id)) {
    carta.style.opacity = '0';
    carta.style.pointerEvents = 'none';
    setTimeout(() => {
        carta.style.display = 'none';
        carta.style.opacity = '';
    }, 300); // da tiempo al fade-out
}
