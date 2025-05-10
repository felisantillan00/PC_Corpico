document.getElementById('continuarBtn').addEventListener('click', () => {
    const nickname = document.getElementById('nicknameInput').value.trim();

    if (nickname === "") {
        alert("Por favor, ingresá un nombre.");
        return;
    }

    localStorage.setItem('nombreJugador', nickname);
    localStorage.setItem('puntajeJugador', 0);
    window.location.href = './selectLevel.html';
});
