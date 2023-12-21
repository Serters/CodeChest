import { snippet } from "../front-end/classes/snippet.js";
import { snippet_list } from "../front-end/classes/snippet_list.js";
import { user } from "../front-end/classes/user.js";

const snippet_list_default = new snippet_list(1, 100, 1, []);

function fetchAndProcessSnippets() {
	// Make a GET request to the Flask serve

	fetch("http://127.0.0.1:5000/snippets")
		.then((response) => response.json())
		.then((data) => {
			// Process the data and create snippet objects
			const snippetsData = data.snippet;

			// Assuming you have a function to create a snippet object
			snippetsData.forEach((snippetData) => {
				const snippetObject = createSnippetObjectFromData(snippetData);
				snippet_list_default.append_snippet(snippetObject);
			});
			snippet_list_default.display(document.body);
		})
		.catch((error) => console.error("Error fetching snippets:", error));
}
function createSnippetObjectFromData(data) {
	return new snippet(
		data[0],
		data[1],
		data[2],
		data[3],
		data[4],
		data[5],
		data[6]
	);
}

fetchAndProcessSnippets();
