import { draw_footer, draw_header } from "./codechest.js";

document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

function draw_main(where) {
	const m = document.createElement("main");
	where.appendChild(m);

	const left = document.createElement("div");
	left.className = "left";
	m.appendChild(left);

	const right = document.createElement("div");
	right.className = "right";
	m.appendChild(right);
}
