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
    m.style.backgroundImage = 'url("static/assets/img.png")';
    m.style.backgroundSize = "cover";
    where.appendChild(m);
}
