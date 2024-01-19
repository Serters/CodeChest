import { draw_footer, draw_header } from "./static.js";
import { snippet } from "./classes/snippet.js";
import { snippet_list } from "./classes/snippet_list.js";
import { snippet_description } from "./classes/snippet_description.js";
import { user } from "./classes/user.js";
document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

async function draw_main(where) {
	let active_snippet = 0;
	let data = JSON.parse(localStorage.getItem("user_info")).user;
	const current_user = new user(data[0], data[1], data[2], data[3]);

	const m = document.createElement("main");
	where.appendChild(m);

	//#region - - - - - -  LEFT - - - - - -
	const left = document.createElement("div");
	left.className = "left";
	m.appendChild(left);

	const create_snippet_div = document.createElement("div");
	create_snippet_div.className = "create_snippet";
	left.appendChild(create_snippet_div);

	const create_snippet_div_text = document.createElement("h3");
	create_snippet_div_text.innerText = "Create new snippet";
	create_snippet_div.appendChild(create_snippet_div_text);

	let snippet_list_default = await render_snippet_list(left);
	snippet_list_default.display(left, click_callback);
	active_snippet = snippet_list_default.snippets.at(-1).snippet_id;
	//#endregion - - - - - LEFT - - - - -

	//#region - - - - - -  RIGHT - - - - - -
	const right = document.createElement("div");
	right.className = "right";
	m.appendChild(right);

	const search_div = document.createElement("div");
	search_div.className = "search";
	right.appendChild(search_div);

	const search_input = document.createElement("input");
	search_input.type = "text";
	search_input.name = "search";
	search_input.placeholder = "Search:";
	search_div.appendChild(search_input);

	const search_button = document.createElement("button");
	search_button.type = "button";
	search_button.className = "search_button";
	search_button.innerText = "GO";
	search_div.appendChild(search_button);

	// long desc

	let full_description = new snippet_description(
		snippet_list_default.get_snippet_by_id(active_snippet).full_desc
	);
	// snippet_list_default.at(active_snippet).full_desc
	full_description.display(right);

	// buttons
	const actions_div = document.createElement("div");
	actions_div.className = "actions";
	right.appendChild(actions_div);

	const edit_button = document.createElement("button");
	edit_button.className = "edit";
	edit_button.innerText = "Edit";
	edit_button.onclick = function () {
		window.location.href = `snippet_editor?active_snippet=${active_snippet}`;
	};
	actions_div.appendChild(edit_button);

	const delete_button = document.createElement("button");
	delete_button.className = "delete";
	delete_button.innerText = "Delete";
	actions_div.appendChild(delete_button);
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
			data.tags,
			data.snippet_list_id
		);
	}

	async function render_snippet_list(where) {
		const snippet_list_data = await fetch_snippets();
		return new snippet_list(1, 100, 1, snippet_list_data);
	}

	function click_callback(active_full_desc, active_snippet_id) {
		active_snippet = active_snippet_id;
		full_description.update_desc(active_full_desc);
	}

	async function insert_row_into_table(data) {
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

	create_snippet_div.addEventListener("click", async function () {
		const data = {
			name: "Snippet Name",
			code: "Snippet Code",
			short_desc: "Snippet Short Description",
			full_desc: "Snippet Full Description",
			favourite: 0,
			snippet_list_id: 1,
		};
		await insert_row_into_table(data);
		const updated_snippet_list = await fetch_snippets();
		await snippet_list_default.update_snippets(
			left,
			updated_snippet_list,
			click_callback
		);
		window.location.href = `snippet_editor?active_snippet=${active_snippet}`;
	});

	delete_button.addEventListener("click", async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/delete_snippet/${active_snippet}`
			);
			const data = await response.json();
			const updated_snippet_list = await fetch_snippets();
			snippet_list_default.update_snippets(
				left,
				updated_snippet_list,
				click_callback
			);
		} catch (error) {
			console.error("Error fetching snippets:", error);
		}
	});
}
