export const runningLine = () => {
    const runningLine = document.querySelector(".running-line__text");
    const lineContainer = document.querySelector(".running-line");

    // Дублируем текст для бесшовности
    const clone = runningLine.innerHTML;
    runningLine.innerHTML += clone;

    let speed = 50; // Скорость движения (меньше значение — быстрее)
    let offset = 0;

    function animate() {
        offset -= 1; // Сдвиг влево
        if (Math.abs(offset) >= runningLine.offsetWidth / 2) {
            offset = 0; // Сбрасываем, чтобы текст был бесшовным
        }
        runningLine.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(animate); // Плавная анимация
    }

    animate();
};
