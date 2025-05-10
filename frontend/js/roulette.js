// const wheel = document.getElementById("wheel");
// const spinButton = document.getElementById("spinButton");
// const resultDisplay = document.createElement("div"); // Para mostrar el resultado en pantalla
// document.body.appendChild(resultDisplay); // Lo agregamos al body

// let degree = 0;

// // Lista de opciones de la ruleta
// const segments = ["Preguntas", "Ahorcado", "XXX", "Shoka"];

// const segmentSize = 360 / segments.length; // Tamaño de cada segmento

// // Función para girar la rueda
// function spinWheel() {
//     let randomSpin = Math.floor(1000 + Math.random() * 3000); // Gira entre 1000 y 3000 grados
//     degree += randomSpin; // Mantiene la acumulación de giros
//     wheel.style.transition = "transform 3s ease-out";
//     wheel.style.transform = `rotate(${degree}deg)`;

//     // Restablece la rueda y calcula la opción seleccionada
//     setTimeout(() => {
//         wheel.style.transition = "none";
//         let finalDegree = degree % 360; // Obtener el ángulo final en el rango 0-360
//         let selectedIndex = Math.floor((360 - finalDegree + segmentSize / 2) % 360 / segmentSize);
//         let resultado = segments[selectedIndex]; // Obtener el texto correspondiente
//         if (resultado === "Preguntas") {
//             setTimeout(() => {
//                 window.location.href = "quiz.html"; // Redirige a quiz.html
//             }, 1000); // Espera 2 segundos antes de redirigir
//         }
//         if (resultado === "Ahorcado"){
//             setTimeout(() => {
//                 window.location.href = "quiz.html"; // Redirige a quiz.html
//             }, 1000); // Espera 2 segundos antes de redirigir
//         }
//         if (resultado === "XXX"){
//             setTimeout(() => {
//                 window.location.href = "quiz.html"; // Redirige a quiz.html
//             }, 1000); // Espera 2 segundos antes de redirigir            
//         }
//         if (resultado === "Shoka"){
//             setTimeout(() => {
//                 window.location.href = "quiz.html"; // Redirige a quiz.html
//             }, 1000); // Espera 2 segundos antes de redirigir
//         }
//     }, 3000);
// }
// spinButton.addEventListener("click", spinWheel);

//OPCION 2
// let degree = 0;
// const wheel = document.getElementById("wheel");

// // Cargar los juegos restantes desde localStorage o usar todos si es la primera vez
// let remainingGames = JSON.parse(localStorage.getItem('juegosRestantes')) || ["Preguntas", "Ahorcado", "Unir", "Completar palabra"];

// // Si no quedan juegos, podés redirigir o mostrar mensaje
// if (remainingGames.length === 0) {
//     alert("¡Felicidades! Completaste todos los juegos.");
//     // Podés dejar al usuario ahí o mostrar un mensaje final
//     // localStorage.removeItem('juegosRestantes'); // Si querés resetear en otro momento
// }

// // Crear visualmente la ruleta duplicando los juegos
// function construirRuleta() {
//     wheel.innerHTML = ""; // limpiar ruleta
//     remainingGames.forEach(juego => {
//         for (let i = 0; i < 2; i++) { // duplicado visual
//             const segment = document.createElement("div");
//             segment.className = "segment";
//             const text = document.createElement("div");
//             text.className = "segment-text";
//             text.textContent = juego;
//             segment.appendChild(text);
//             wheel.appendChild(segment);
//         }
//     });

//     // Agregar botón
//     const btn = document.createElement("button");
//     btn.id = "spinButton";
//     btn.textContent = "▶️";
//     wheel.appendChild(btn);
//     btn.addEventListener("click", spinWheel);
// }

// function spinWheel() {
//     const segmentCount = remainingGames.length * 2;
//     const segmentSize = 360 / segmentCount;
//     let randomSpin = Math.floor(1000 + Math.random() * 3000);
//     degree += randomSpin;
//     wheel.style.transition = "transform 3s ease-out";
//     wheel.style.transform = `rotate(${degree}deg)`;

//     setTimeout(() => {
//         wheel.style.transition = "none";
//         let finalDegree = degree % 360;
//         let selectedIndex = Math.floor((360 - finalDegree + segmentSize / 2) % 360 / segmentSize);
//         let selectedGame = remainingGames[Math.floor(selectedIndex / 2)];

//         // Redirigir según juego
//         let url;
//         switch (selectedGame) {
//             case "Preguntas":
//                 url = "juegoQuiz.html";
//                 break;
//             case "Ahorcado":
//                 url = "juegoAhorcado.html";
//                 break;
//             case "Unir":
//                 url = "juegoEncontrar.html";
//                 break;
//             case "Completar palabra":
//                 url = "fill.html";
//                 break;
//             default:
//                 url = "juegoQuiz.html";
//         }

//         // Eliminar el juego de la lista
//         remainingGames = remainingGames.filter(juego => juego !== selectedGame);
//         localStorage.setItem('juegosRestantes', JSON.stringify(remainingGames));

//         setTimeout(() => {
//             window.location.href = url;
//         }, 1000);
//     }, 3000);
// }

// construirRuleta();

// OPCION 3
let degree = 0;
const wheel = document.getElementById("wheel");

// Lista de colores alternantes
const colors = ["red", "blue", "green", "yellow", "black", "blueviolet", "rosybrown", "tomato"];

let remainingGames = JSON.parse(localStorage.getItem('juegosRestantes')) || ["Preguntas", "Ahorcado", "Unir", "Completar palabra"];

if (remainingGames.length === 0) {
	alert("¡Felicidades! Completaste todos los juegos.");
}

function construirRuleta() {
    wheel.innerHTML = ""; 

    const totalSegments = remainingGames.length;
    if (totalSegments === 0) return;

    const angle = 360 / totalSegments;

    remainingGames.forEach((juego, index) => {
        const segment = document.createElement("div");
        segment.className = "segment";
        segment.style.transform = `rotate(${index * angle}deg)`;
        segment.style.backgroundColor = colors[index % colors.length];

        // Corrección del clip-path con valores dinámicos basados en los ángulos
        const x1 = 50 + 50 * Math.cos((index * angle - angle / 2) * (Math.PI / 180));
        const y1 = 50 + 50 * Math.sin((index * angle - angle / 2) * (Math.PI / 180));
        const x2 = 50 + 50 * Math.cos((index * angle + angle / 2) * (Math.PI / 180));
        const y2 = 50 + 50 * Math.sin((index * angle + angle / 2) * (Math.PI / 180));

        segment.style.clipPath = `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;

        const text = document.createElement("div");
        text.className = "segment-text";
        text.textContent = juego;
        text.style.transform = `rotate(${angle / 2}deg)`;

        segment.appendChild(text);
        wheel.appendChild(segment);
    });

    const btn = document.createElement("button");
    btn.id = "spinButton";
    btn.textContent = "Play";
    btn.addEventListener("click", spinWheel);
    wheel.appendChild(btn);
}

function spinWheel() {
	const duplicatedGames = remainingGames.flatMap(g => [g, g]);
	const segmentCount = duplicatedGames.length;
	const segmentSize = 360 / segmentCount;
	const randomSpin = Math.floor(1000 + Math.random() * 3000);
	degree += randomSpin;
	wheel.style.transition = "transform 3s ease-out";
	wheel.style.transform = `rotate(${degree}deg)`;

	setTimeout(() => {
		wheel.style.transition = "none";
		const finalDegree = degree % 360;
		const selectedIndex = Math.floor((360 - finalDegree + segmentSize / 2) % 360 / segmentSize);
		const selectedGame = duplicatedGames[selectedIndex];

		// Redirección
		let url;
		switch (selectedGame) {
			case "Preguntas":
				url = "juegoQuiz.html";
				break;
			case "Ahorcado":
				url = "juegoAhorcado.html";
				break;
			case "Unir":
				url = "juegoEncontrar.html";
				break;
			case "Completar palabra":
				url = "fill.html";
				break;
		}

		// Eliminar juego seleccionado y actualizar ruleta
		remainingGames = remainingGames.filter(j => j !== selectedGame);
		localStorage.setItem('juegosRestantes', JSON.stringify(remainingGames));
		construirRuleta(); // Se reconstruye la ruleta con los juegos restantes

		setTimeout(() => {
			window.location.href = url;
		}, 1000);
	}, 3000);
}

construirRuleta();