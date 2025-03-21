const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const resultDisplay = document.createElement("div"); // Para mostrar el resultado en pantalla
document.body.appendChild(resultDisplay); // Lo agregamos al body

let degree = 0;

// Lista de opciones de la ruleta
const segments = ["Preguntas", "Minijuego", "XXX", "Shoka"];

const segmentSize = 360 / segments.length; // Tamaño de cada segmento

// Función para girar la rueda
function spinWheel() {
    let randomSpin = Math.floor(1000 + Math.random() * 3000); // Gira entre 1000 y 3000 grados
    degree += randomSpin; // Mantiene la acumulación de giros
    wheel.style.transition = "transform 3s ease-out";
    wheel.style.transform = `rotate(${degree}deg)`;

    // Restablece la rueda y calcula la opción seleccionada
    setTimeout(() => {
        wheel.style.transition = "none";
        let finalDegree = degree % 360; // Obtener el ángulo final en el rango 0-360
        let selectedIndex = Math.floor((360 - finalDegree + segmentSize / 2) % 360 / segmentSize);
        let resultado = segments[selectedIndex]; // Obtener el texto correspondiente
        if (resultado === "Preguntas") {
            setTimeout(() => {
                window.location.href = "quiz.html"; // Redirige a quiz.html
            }, 1000); // Espera 2 segundos antes de redirigir
        }
        if (resultado === "Minijuego"){
            setTimeout(() => {
                window.location.href = "quiz.html"; // Redirige a quiz.html
            }, 1000); // Espera 2 segundos antes de redirigir
        }
        if (resultado === "XXX"){
            setTimeout(() => {
                window.location.href = "quiz.html"; // Redirige a quiz.html
            }, 1000); // Espera 2 segundos antes de redirigir            
        }
        if (resultado === "Shoka"){
            setTimeout(() => {
                window.location.href = "quiz.html"; // Redirige a quiz.html
            }, 1000); // Espera 2 segundos antes de redirigir
        }
    }, 3000);
}
spinButton.addEventListener("click", spinWheel);