import { snippet } from "../front-end/classes/snippet.js";
import { snippet_list } from "../front-end/classes/snippet_list.js";
import { user } from "../front-end/classes/user.js";

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

async function render_snippet_list() {
    const snippet_list_data = await fetch_snippets();
    const snippet_list_default = new snippet_list(1, 100, 1, snippet_list_data);
    snippet_list_default.display(document.body);
}


render_snippet_list();