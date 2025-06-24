function revelarCarta(carta, url, texto) {
    if (carta.classList.contains('volteada')) return;
    const id = carta.dataset.id;
    let jugados = JSON.parse(localStorage.getItem('minijuegosJugados') || '[]');
    if (!jugados.includes(id)) {
        jugados.push(id);
        localStorage.setItem('minijuegosJugados', JSON.stringify(jugados));
    }

    // reversible visual  
    carta.classList.add('volteada');
    carta.querySelector('.dorso').textContent = texto;

    // Aumenta 1 punto
    let ptos = parseInt(localStorage.getItem('puntajeJugador') || '0') + 1;
    localStorage.setItem('puntajeJugador', ptos);

    setTimeout(() => location.href = url, 1000);
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