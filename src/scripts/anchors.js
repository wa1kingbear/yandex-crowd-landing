export const anchors = () => {
    const buttons = document.querySelectorAll(".anchor-button");

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const anchor = e.target.dataset.anchor;
            const targetElement = document.getElementById(anchor);

            if (targetElement) {
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - 50,
                    behavior: "smooth",
                });
            }
        });
    });
};
