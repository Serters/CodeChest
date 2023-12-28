export class snippet_list {
	constructor(
		snippet_list_id,
		max_storage,
		user_id,
		snippets,
	) {
		this.snippet_list_id = snippet_list_id;
		this.user_id = user_id;
		this.max_storage = max_storage || 100;
			this.snippets = snippets || [];
	}

	display(where, callback) {
		const snippet_list_div = document.createElement("div");
		snippet_list_div.className = "snippetList";
		where.appendChild(snippet_list_div);

		this.snippets.forEach(s => {
			s.display(snippet_list_div, callback)
		});
	}

	delete_displayed_list(where) {
		const snippetListDiv = where.querySelector(".snippetList");
	
		if (snippetListDiv) {
			// while (snippetListDiv.firstChild) {
			// 	snippetListDiv.removeChild(snippetListDiv.firstChild);
			// }
			snippetListDiv.innerHTML = "";
			this.snippets.forEach(s => {
				s.display(snippet_list_div, callback)
			});
		}
	}

	async update_snippets(new_snippets, where, callback) {
		console.log(new_snippets);
		this.snippets = [...new_snippets];

		const snippet_list_div = where.querySelector(".snippetList");
		if (snippet_list_div) {
			snippet_list_div.innerHTML = "";
			new_snippets.forEach(s => {
				s.display(snippet_list_div, callback)
			});
		}
	}
	
	append_snippet(snippet) {
		this.snippets.push(snippet);
	}
}


// Export the SnippetList class for use in other files (optional)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = snippet_list;
}
