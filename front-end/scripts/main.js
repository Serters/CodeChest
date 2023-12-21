import { draw_footer, draw_header } from "./codechest.js";
import { snippet } from "../../front-end/classes/snippet.js";
import { snippet_list } from "../../front-end/classes/snippet_list.js";
import { user } from "../../front-end/classes/user.js";

document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

function draw_main(where) {
	const m = document.createElement("main");
	where.appendChild(m);

	//#region - - - - - -  LEFT - - - - - -

	const left = document.createElement("div");
	left.className = "left";
	m.appendChild(left);

	const createSnippet = document.createElement("div");
	createSnippet.className = "create-snippet";
	left.appendChild(createSnippet);

	const createSnippetText = document.createElement("h3");
	createSnippetText.innerText = "Create new snippet";
	createSnippet.appendChild(createSnippetText);

	const current_user = new user(1, "Korisnik", "korisnik2023@codechest.com")

	const snippet_list_default = new snippet_list(1, current_user.user_id)
	snippet_list_default.display(left)

	//const snippet_list_searched = new snippet_list()
	//#endregion - - - - - LEFT - - - - -

	//#region - - - - - -  RIGHT - - - - - - 
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

	// buttons
	const actions_div = document.createElement("div");
	actions_div.className = "actions";
	right.appendChild(actions_div);
	
	const edit_button = document.createElement("button");
	edit_button.className = "edit";
	edit_button.innerText = "Edit"
	actions_div.appendChild(edit_button);

	const favourite_button = document.createElement("button");
	favourite_button.className = "favourite";
	favourite_button.innerText = "Favourite"
	actions_div.appendChild(favourite_button);

	//#endregion - - - - - RIGHT - - - - -  
}
