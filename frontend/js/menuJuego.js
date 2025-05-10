function revelarCarta(carta, url, texto) {
    if (carta.classList.contains('volteada')) return;

    carta.classList.add('volteada');
    carta.querySelector('.dorso').textContent = texto;

    setTimeout(() => {
        window.location.href = url;
    }, 3000); // 3 segundos
}
