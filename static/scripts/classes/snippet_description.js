export class snippet_description {
    constructor(snippet_full_desc) {
        this.snippet_full_desc = snippet_full_desc;
        this.paragraph = null;
    }
    async display(where) {
        if (where) {
            const full_desc_div = document.createElement("div");
            full_desc_div.className = "snippet_description";
            where.appendChild(full_desc_div);

            const title = document.createElement("h3");
            title.className = "title";
            title.textContent = "Full description:";
            full_desc_div.appendChild(title);

            this.paragraph = document.createElement("p");
            this.paragraph.className = "description";
            this.paragraph.textContent = this.snippet_full_desc;
            full_desc_div.appendChild(this.paragraph);
        } else {
            console.error(`Target div with id "${where}" not found.`);
        }
    }

    async update_desc(new_description) {
        this.snippet_full_desc = new_description;

        if (this.paragraph) {
            this.paragraph.textContent = this.snippet_full_desc;
        } else {
            console.error("Long description paragraph not found.");
        }
    }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = snippet_description;
}
