import { draw_footer, draw_header } from "./codechest.js";
import { snippet } from "../../front-end/classes/snippet.js";

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
	code_editor.appendChild(code_editor_textarea);

	//#endregion - - - - - LEFT - - - - -

	//#region - - - - - -  RIGHT - - - - - -

	const right = document.createElement("div");
	right.className = "right";
	m.appendChild(right);

	const snippet_name = document.createElement("div");
	snippet_name.className = "snippet-name";
	right.appendChild(snippet_name);

	const snippet_name_input = document.createElement("input");
	snippet_name_input.name = "snippet-name";
	snippet_name_input.type = "text";
	snippet_name_input.placeholder = "Snippet name:";
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
	full_description.appendChild(full_description_textarea);

	const short_description = document.createElement("div");
	short_description.className = "short-description";
	right.appendChild(short_description);

	const short_description_title = document.createElement("h3");
	short_description_title.innerText = "short description";
	short_description.appendChild(short_description_title);

	const short_description_textarea = document.createElement("textarea");
	short_description_textarea.name = "short-description";
	short_description_textarea.placeholder = "short description:";
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
	actions_div.appendChild(save_button);

	const delete_button = document.createElement("button");
	delete_button.className = "delete";
	delete_button.innerText = "Delete";
	actions_div.appendChild(delete_button);

	//#endregion - - - - - RIGHT - - - - -
}
