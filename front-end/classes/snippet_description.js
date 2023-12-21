export class snippet_description {
    constructor(snippet_full_desc) {
        this.snippet_full_desc = snippet_full_desc;
        this.longDescriptionParagraph = null;
    }
	//TODO Move to snippet.js
    async display(where) {
        if (where) {
            const full_desc_div = document.createElement("div");
            full_desc_div.className = "snippetDescription";
            where.appendChild(full_desc_div);

            const longDescriptionTitle = document.createElement("h3");
            longDescriptionTitle.className = "title";
            longDescriptionTitle.textContent = "Long Description";
            full_desc_div.appendChild(longDescriptionTitle);

            // Store a reference to longDescriptionParagraph in the class property
            this.longDescriptionParagraph = document.createElement("p");
            this.longDescriptionParagraph.className = "description";
            this.longDescriptionParagraph.textContent = this.snippet_full_desc;
            full_desc_div.appendChild(this.longDescriptionParagraph);
        } else {
            console.error(`Target div with id "${where}" not found.`);
        }
    }

    async update_desc(new_description) {
        this.snippet_full_desc = new_description;

        // Access longDescriptionParagraph using the class property
        if (this.longDescriptionParagraph) {
            this.longDescriptionParagraph.textContent = this.snippet_full_desc;
        } else {
            console.error("Long description paragraph not found.");
        }
    }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = snippet_description;
}
