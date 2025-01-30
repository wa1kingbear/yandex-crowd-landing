import { runningLine } from "./running-line";
import { stages } from "./stages";
import { participants } from "./participants";
import { about } from "./about";
import { anchors } from "./anchors";
// import { Carousel } from "./carousel";

document.addEventListener("DOMContentLoaded", () => {
    // Carousel;
    runningLine();
    stages();
    participants();
    about();
    anchors();
});
