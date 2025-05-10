document.getElementById('btnFacil').addEventListener('click', () => {
    localStorage.setItem('nivelSeleccionado', 'facil');
    window.location.href = '../menuJuego.html';
});

document.getElementById('btnDificil').addEventListener('click', () => {
    localStorage.setItem('nivelSeleccionado', 'dificil');
    window.location.href = '../menuJuego.html';
});

// Mostrar nombre almacenado (si hay)
const nombre = localStorage.getItem('nombreJugador');
if (nombre) {
    const divNombre = document.createElement('div');
    divNombre.textContent = `Jugador: ${nombre}`;
    divNombre.classList.add('nombre-jugador');
    document.body.appendChild(divNombre);
}
