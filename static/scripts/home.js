import { draw_footer, draw_header } from "./static.js";
document.addEventListener("DOMContentLoaded", render);

async function render() {
    draw_header(document.body);
    await draw_main(document.body);
    draw_footer(document.body);
}

async function draw_main(where) {
    const m = document.createElement("main");
    m.classList.add("main-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.classList.add("main-image");
    img.src = 'static/assets/Untitled.png';
    imageContainer.appendChild(img);

    m.appendChild(imageContainer);
    where.appendChild(m);
}
