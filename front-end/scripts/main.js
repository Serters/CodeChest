import { draw_footer, draw_header } from "./codechest.js";
import { snippet } from "../../front-end/classes/snippet.js";
import { snippet_list } from "../../front-end/classes/snippet_list.js";
import { snippet_description } from "../../front-end/classes/snippet_description.js";
import { user } from "../../front-end/classes/user.js";
document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

async function draw_main(where) {
	const m = document.createElement("main");
	where.appendChild(m);

	let active_snippet = 0;

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

	let snippet_list_default = await render_snippet_list(left);
	snippet_list_default.display(left, click_callback);

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

	// long desc

	let full_description = new snippet_description(
		snippet_list_default.snippets[active_snippet].full_desc
	);
	full_description.display(right);

	// buttons
	const actions_div = document.createElement("div");
	actions_div.className = "actions";
	right.appendChild(actions_div);

	const edit_button = document.createElement("button");
	edit_button.className = "edit";
	edit_button.innerText = "Edit";
	edit_button.onclick = function () {
		//window.location.assign("snippet-editor.html");
		window.location.href = `snippet-editor.html?active_snippet=${active_snippet}`;
	};
	actions_div.appendChild(edit_button);

	const favourite_button = document.createElement("button");
	favourite_button.className = "favourite";
	favourite_button.innerText = "Favourite";
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
		return new snippet_list(1, 100, 1, snippet_list_data);
	}

	function click_callback(active_snippet_id) {
		console.log("Snippet clicked! Index:", active_snippet_id);
		active_snippet = active_snippet_id - 1;

		full_description.update_desc(
			snippet_list_default.snippets[active_snippet].full_desc
		);
		console.log(active_snippet);
	}

	// Adding click event listener
	// createSnippet.addEventListener("click", async function () {
	// 	insertRowIntoTable(data);
	// });

	async function insertRowIntoTable(data) {
		fetch("http://127.0.0.1:5000/insert_row", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	function delayedFunction() {
		console.log("Delay complete!");
	}

	createSnippet.addEventListener("click", async function () {
		const data = {
			name: "Snippet Name",
			code: "Snippet Code",
			short_desc: "Snippet Short Description",
			full_desc: "Snippet Full Description",
			favourite: 0,
			snippet_list_id: 1,
		};
		await insertRowIntoTable(data);
		setTimeout(delayedFunction, 500);
		const updatedSnippetList = await fetch_snippets();
		setTimeout(delayedFunction, 500);
		snippet_list_default.update_snippets(updatedSnippetList, left, click_callback);
		console.log("END");
	});

}
