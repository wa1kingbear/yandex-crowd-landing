const initAnimation = (item) => {
    const clone = item.innerHTML;
    item.innerHTML += clone;

    let offset = 0;

    function animate() {
        offset -= 1;
        if (Math.abs(offset) >= item.offsetWidth / 2) {
            offset = 0;
        }
        item.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(animate);
    }

    animate();
};
export const runningLine = () => {
    const runningLine = document.querySelectorAll(".running-line__text");

    runningLine.forEach((item) => {
        initAnimation(item);
    });
};
