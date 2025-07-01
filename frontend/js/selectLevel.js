document.getElementById('btnFacil').addEventListener('click', () => {
    localStorage.setItem('nivelSeleccionado', 'facil');
    window.location.href = '../menuJuego.html';
});

document.getElementById('btnDificil').addEventListener('click', () => {
    localStorage.setItem('nivelSeleccionado', 'dificil');
    window.location.href = '../menuJuego.html';
});

// Mostrar nombre almacenado dentro del texto principal
const nombre = localStorage.getItem('nombreJugador');
if (nombre) {
    const texto = document.getElementById('textoDificultad');
    texto.textContent = `${nombre}, elije el nivel de dificultad`;
}
