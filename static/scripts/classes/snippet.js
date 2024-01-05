export class snippet {
	constructor(
		snippet_id,
		name,
		code,
		short_desc,
		full_desc,
		favourite,
		tags,
		snippet_list_id
	) {
		this.snippet_id = snippet_id;
		this.name = name;
		this.code = code;
		this.short_desc = short_desc;
		this.full_desc = full_desc;
		this.favourite = favourite;
		this.tags = string_to_array(tags);
		this.snippet_list_id = snippet_list_id;
	}

	display(where, callback) {
		if (where) {
			const snippet_div = document.createElement("div");
			snippet_div.className = "snippet";
			if (this.favourite) {
				snippet_div.classList.add("favourite");
			}
			where.prepend(snippet_div);

			const name_div = document.createElement("h3");
			name_div.innerText = this.name;
			snippet_div.appendChild(name_div);

			const short_desc_div = document.createElement("div");
			short_desc_div.className = "short_description";
			short_desc_div.innerText = this.short_desc;
			snippet_div.appendChild(short_desc_div);

			const tags_div = document.createElement("div");
			tags_div.className = "tags";
			snippet_div.appendChild(tags_div);

			if (this.tags) {
				this.tags.forEach((tag) => {
					const tag_span = document.createElement("span");
					tag_span.textContent = tag;
					tag_span.className = "tag";
					tags_div.appendChild(tag_span);
				});
			}

			snippet_div.addEventListener("click", () => {
				callback(this.full_desc, this.snippet_id);
			});
		} else {
			console.error("Error: 'where' is not defined");
		}
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = snippet;
}

function string_to_array(tags) {
	if (tags === "") return [];
	else return Array.from(tags.split(" "));
}
