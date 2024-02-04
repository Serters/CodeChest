import { draw_footer, draw_header } from "./static.js";
document.addEventListener("DOMContentLoaded", render);

async function render() {
	draw_header(document.body);
	await draw_main(document.body);
	draw_footer(document.body);
}

async function draw_main(where) {
	const m = document.createElement("main");
	where.appendChild(m);

	const constainer_div = document.querySelector(".jumbotron");
	m.appendChild(constainer_div);
}
