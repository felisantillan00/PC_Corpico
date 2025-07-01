const btnFacil = document.getElementById('btnFacil');
const btnDificil = document.getElementById('btnDificil');

// Asegurar clases por si las pisan
btnFacil.classList.add("boton", "color-prin");
btnDificil.classList.add("boton", "color-prin");

// Como refuerzo: aplicar fuente por JS
btnFacil.style.fontFamily = "'Play', sans-serif";
btnDificil.style.fontFamily = "'Play', sans-serif";

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
    texto.textContent = `${nombre}, elige el nivel de dificultad`;
}
