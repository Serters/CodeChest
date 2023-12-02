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

	const searchDiv = document.createElement("div");
	searchDiv.className = "search";
	right.appendChild(searchDiv);

	const searchInput = document.createElement("input");
	searchInput.type = "text";
	searchInput.name = "search";
	searchInput.placeholder = "Search:";
	searchDiv.appendChild(searchInput);

	const snippetDescriptionDiv = document.createElement("div");
	snippetDescriptionDiv.className = "snippetDescription";
	right.appendChild(snippetDescriptionDiv);

	const snippetDescriptionTitle = document.createElement("h3");
	snippetDescriptionTitle.innerText = "Long Description";
	snippetDescriptionTitle.className = "title";
	snippetDescriptionDiv.appendChild(snippetDescriptionTitle);

	const snippetDescription = document.createElement("p");
	snippetDescription.className = "description";
	snippetDescription.innerText =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. \
	Magnam, ipsum et cumque hic eveniet quasi, nesciunt \
	fugiat laudantium neque quibusdam excepturi ipsa quam, \
	dolorem eaque unde? Accusamus, aliquid ex. Magni!";
	snippetDescriptionDiv.appendChild(snippetDescription);

	const parrotDiv = document.createElement("div");
	parrotDiv.className = "parrot";
	right.appendChild(parrotDiv);

	var titleElement = document.createElement("h3");
	titleElement.className = "title";
	titleElement.textContent = "Your pet parrot";
	parrotDiv.appendChild(titleElement);
}
