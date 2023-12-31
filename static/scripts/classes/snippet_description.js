export class snippet_description {
    constructor(active_snippet_description) {
        this.paragraph = document.createElement("p");
        this.paragraph.textContent = active_snippet_description;
    }

    async display(where) {
        if (where) {
            const full_description_div = document.createElement("div");
            full_description_div.className = "full_description";
            where.appendChild(full_description_div);

            const title = document.createElement("h3");
            title.textContent = "Full description:";
            full_description_div.appendChild(title);

            full_description_div.appendChild(this.paragraph);
        } else {
            console.error(`Target div with id "${where}" not found.`);
        }
    }

    async update_desc(active_snippet_description) {
        this.paragraph.textContent = active_snippet_description;
    }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = snippet_description;
}
