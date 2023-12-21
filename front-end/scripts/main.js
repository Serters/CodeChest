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

	render_snippet_list(left);

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

	//LONG DESCRIPTION #TODO
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

	//#region other
	async function fetch_snippets() {
		try {
			let fetched_snippets = [];
			const response = await fetch("http://127.0.0.1:5000/snippets");
			const data = await response.json();
			const snippets_data = data.snippet;
	
			snippets_data.forEach((snippet_data) => {
				const snippet = create_fetched_snippet(snippet_data);
				fetched_snippets.push(snippet);
			});
			return fetched_snippets;
	
		} catch (error) {
			console.error("Error fetching snippets:", error);
		}
	}
	
	function create_fetched_snippet(data) {
		return new snippet(
			data.snippet_id,
			data.name,
			data.code,
			data.short_desc,
			data.full_desc,
			data.favourite,
			data.snippet_list_id
		);
	}
	
	async function render_snippet_list(where) {
		const snippet_list_data = await fetch_snippets();
		const snippet_list_default = new snippet_list(1, 100, 1, snippet_list_data);
		snippet_list_default.display(where);
	}	
}
