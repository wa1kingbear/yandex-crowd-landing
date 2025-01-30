export const about = () => {
    const titlePart = document.querySelector(".about__heading__title__dynamic");
    const titleMobile = document.querySelector(
        ".about__heading__title.mobile p"
    );

    const resize = () => {
        const width = window.innerWidth;

        if (width <= 1023) {
            titleMobile.innerHTML = titlePart.innerHTML;
        } else {
            titleMobile.textContent = "";
        }
    };
    window.addEventListener("resize", () => resize());
    resize();
};
