import { draw_footer, draw_header } from "./static.js";
import { snippet } from "./classes/snippet.js";

document.addEventListener("DOMContentLoaded", render);

const url_parameters = new URLSearchParams(window.location.search);
const active_snippet_id = parseInt(url_parameters.get("active_snippet"), 10);

async function fetch_snippet(user_id, snippet_id) {
	try {
		const response = await fetch(
			`http://127.0.0.1:5000/snippets/${user_id}/${snippet_id}`
		);
		const snippet_data = await response.json();
		const snippet = create_fetched_snippet(snippet_data.snippet[0]);
		return snippet;
	} catch (error) {
		console.error("Error:", error);
	}
}

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
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

async function draw_main(where) {
	const user_id = 1;
	const snippet_id = active_snippet_id;
	const current_snippet = await fetch_snippet(user_id, snippet_id);

	const m = document.createElement("main");
	where.appendChild(m);

	// FORM
	const form = document.createElement("form");
	form.onsubmit = function (event) {
		event.preventDefault();
		save_snippet();
	};
	// form.className = "main";
	m.appendChild(form);

	//#region - - - - - -  LEFT - - - - - -
	const left = document.createElement("div");
	left.className = "left";
	form.appendChild(left);

	const code_editor = document.createElement("div");
	code_editor.className = "code-editor";
	left.appendChild(code_editor);

	const code_editor_title = document.createElement("h2");
	code_editor_title.className = "title";
	code_editor_title.innerText = "Code Editor";
	code_editor.appendChild(code_editor_title);

	const code_editor_textarea = document.createElement("textarea");
	code_editor_textarea.className = "code-editor";
	code_editor_textarea.placeholder = "Your code goes here.";
	code_editor_textarea.value = current_snippet.code;
	code_editor.appendChild(code_editor_textarea);
	
	//#endregion - - - - - LEFT - - - - -

	//#region - - - - - -  RIGHT - - - - - -
	const right = document.createElement("div");
	right.className = "right";
	form.appendChild(right);

	const snippet_name = document.createElement("div");
	snippet_name.className = "snippet-name";
	right.appendChild(snippet_name);

	const snippet_name_input = document.createElement("input");
	snippet_name_input.name = "snippet-name";
	snippet_name_input.type = "text";
	snippet_name_input.placeholder = "Snippet name:";
	snippet_name_input.value = current_snippet.name;
	snippet_name.appendChild(snippet_name_input);

	const full_description = document.createElement("div");
	full_description.className = "full-description";
	right.appendChild(full_description);

	const full_description_title = document.createElement("h3");
	full_description_title.innerText = "Full description";
	full_description.appendChild(full_description_title);

	const full_description_textarea = document.createElement("textarea");
	full_description_textarea.name = "full-description";
	full_description_textarea.placeholder = "Full description:";
	full_description_textarea.value = current_snippet.full_desc;
	full_description.appendChild(full_description_textarea);

	const short_description = document.createElement("div");
	short_description.className = "short-description";
	right.appendChild(short_description);

	const short_description_title = document.createElement("h3");
	short_description_title.innerText = "Short description";
	short_description.appendChild(short_description_title);

	const short_description_textarea = document.createElement("textarea");
	short_description_textarea.name = "short-description";
	short_description_textarea.placeholder = "Short description:";
	short_description_textarea.value = current_snippet.short_desc;
	short_description.appendChild(short_description_textarea);

	const tags_div = document.createElement("div");
	tags_div.className = "tags";
	right.appendChild(tags_div);

	const tags_div_title = document.createElement("h3");
	tags_div_title.innerText = "Tags:";
	tags_div.appendChild(tags_div_title);

	const tags_div_textarea = document.createElement("input");
	tags_div_textarea.name = "tags";
	tags_div_textarea.placeholder = "Add a tag:";
	tags_div.appendChild(tags_div_textarea);

	const actions_div = document.createElement("div");
	actions_div.className = "actions";
	right.appendChild(actions_div);

	const save_button = document.createElement("button");
	save_button.className = "save";
	save_button.innerText = "Save";
	save_button.type = "submit";
	actions_div.appendChild(save_button);

	const favourite_button = document.createElement("button");
	favourite_button.className = "favourite";
	if (current_snippet.favourite) {
		favourite_button.classList.add("favorited");
	}
	favourite_button.innerText = "Favourite";
	favourite_button.type = "button";
	favourite_button.addEventListener("click", () => {
		console.log("FAV");
	});
	actions_div.appendChild(favourite_button);
	//#endregion - - - - - RIGHT - - - - -

	function save_snippet() {
		const snippet_name_value = snippet_name_input.value;
		const code_value = code_editor_textarea.value;
		const short_desc_value = short_description_textarea.value;
		const full_desc_value = full_description_textarea.value;

		const data = {
			name: snippet_name_value,
			code: code_value,
			short_desc: short_desc_value,
			full_desc: full_desc_value,
			favourite: 0,
			snippet_list_id: 1,
		};

		fetch(`http://127.0.0.1:5000/snippets/${user_id}/${snippet_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				// Handle the result as needed
			})
			.catch((error) => console.error("Error:", error));
	}
}
