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

	// - - - - - - - - - - - - LEFT - - - - - - - - - - - -
	const left = document.createElement("div");
	left.className = "left";
	m.appendChild(left);

	const createSnippet = document.createElement("div");
	createSnippet.className = "create-snippet";
	left.appendChild(createSnippet);

	const createSnippetText = document.createElement("h3");
	createSnippetText.innerText = "Create new snippet";
	createSnippet.appendChild(createSnippetText);

	// - - - - - - - - - - - - RIGHT - - - - - - - - - - - -
	const right = document.createElement("div");
	right.className = "right";
	m.appendChild(right);
}
