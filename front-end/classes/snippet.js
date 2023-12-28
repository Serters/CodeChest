export class snippet {
	constructor(
		snippet_id,
		name,
		code,
		short_desc,
		full_desc,
		favourite,
		snippet_list_id
	) {
		this.snippet_id = snippet_id;
		this.name = name;
		this.code = code;
		this.short_desc = short_desc;
		this.full_desc = full_desc;
		this.favourite = favourite;
		this.snippet_list_id = snippet_list_id;
	}

	display(where, callback) {
		if (where) {
			const snippet_div = document.createElement("div");
			snippet_div.className = "snippet";
			where.prepend(snippet_div);

			const snippet_name = document.createElement("h3");
			snippet_name.className = "snippetTitle";
			snippet_name.innerText = this.name;
			snippet_div.appendChild(snippet_name);

			const snippet_short_desc = document.createElement("div");
			snippet_short_desc.className = "shortDescription";
			snippet_short_desc.innerText = this.short_desc;
			snippet_div.appendChild(snippet_short_desc);

			const snippet_tags = document.createElement("div");
			snippet_tags.className = "tags";
			snippet_short_desc.innerText = this.short_desc;
			snippet_div.appendChild(snippet_tags);

			snippet_div.addEventListener("click", () => {
				callback(this.snippet_id);
			});
		} else {
			console.error("Error: 'where' is not defined");
		}
	}
}
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = snippet;
}
