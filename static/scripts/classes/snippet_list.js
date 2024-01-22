export class snippet_list {
	constructor(snippet_list_id, max_storage, user_id, snippets) {
		this.snippet_list_id = snippet_list_id;
		this.user_id = user_id;
		this.max_storage = max_storage || 100;
		this.snippets = snippets || [];
	}

	static from(input_snippet_list) {
		return new snippet_list(
			input_snippet_list.snippet_list_id,
			input_snippet_list.user_id,
			input_snippet_list.max_storage,
			input_snippet_list.snippets
		);
	}

	append_snippet(snippet) {
		this.snippets.push(snippet);
	}

	display(where, callback) {
		const snippet_list_div = document.createElement("div");
		snippet_list_div.className = "snippet_list";
		where.appendChild(snippet_list_div);

		this.snippets.forEach((s) => {
			s.display(snippet_list_div, callback);
		});
	}

	async update_snippets(where, new_snippets, callback) {
		this.snippets = [...new_snippets];

		const snippet_list_div = where.querySelector(".snippet_list");
		if (snippet_list_div) {
			snippet_list_div.innerHTML = "";
			new_snippets.forEach((s) => {
				s.display(snippet_list_div, callback);
			});
		}
	}

	get_snippet_by_id(id) {
		let i = 0;
		while (this.snippets[i++].snippet_id != id);
		return this.snippets[i - 1];
	}

	search(string) {
		let results = [];
		this.snippets.forEach((el) => {
			if (el.search(string)) {
				results.push(el);
			}
		});
		return results;
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = snippet_list;
}
