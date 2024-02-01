import { draw_footer, draw_header } from "./static.js";
import { snippet } from "./classes/snippet.js";
import { snippet_list } from "./classes/snippet_list.js";
import { snippet_description } from "./classes/snippet_description.js";
import { user } from "./classes/user.js";
document.addEventListener("DOMContentLoaded", render);

async function render() {
    draw_header(document.body);
    await draw_main(document.body);
    draw_footer(document.body);
}

async function draw_main(where) {
    let active_snippet = 0;
    let user_data = JSON.parse(localStorage.getItem("user_info")).user;
    const current_user = new user(
		user_data[0],
		user_data[1],
		user_data[2],
		user_data[3],
		user_data[4]
	);
    let snippet_list_default = new snippet_list(
        1,
        100,
        1,
        await fetch_snippets()
    );

    const m = document.createElement("main");
    where.appendChild(m);

    //#region - - - - - -  LEFT - - - - - -
    const left = document.createElement("div");
    left.className = "left";
    m.appendChild(left);

    const create_snippet_div = document.createElement("div");
    create_snippet_div.className = "create_snippet";
    left.appendChild(create_snippet_div);
    create_snippet_div.addEventListener("click", create_snippet);

    const create_snippet_div_text = document.createElement("h3");
    create_snippet_div_text.innerText = "Create new snippet";
    create_snippet_div.appendChild(create_snippet_div_text);

    snippet_list_default.display(left, update_active_snippet);
    active_snippet = snippet_list_default.snippets.at(-1).snippet_id;
    const full_snippet_list = snippet_list.from(snippet_list_default);
    //#endregion - - - - - LEFT - - - - -

    //#region - - - - - -  RIGHT - - - - - -
    const right = document.createElement("div");
    right.className = "right";
    m.appendChild(right);
    //Search
    const search_div = document.createElement("div");
    search_div.className = "search";
    right.appendChild(search_div);

    const search_input = document.createElement("input");
    search_input.type = "text";
    search_input.name = "search";
    search_input.placeholder = "Search:";
    search_input.addEventListener("keyup", search);
    search_div.appendChild(search_input);

    const search_button = document.createElement("button");
    search_button.type = "button";
    search_button.className = "search_button";
    search_button.innerText = "Clear";
    search_button.addEventListener("click", () => {
        search_input.value = "";
        search();
    });
    search_div.appendChild(search_button);
    // Long Description
    let full_description = new snippet_description(
        snippet_list_default.get_snippet_by_id(active_snippet).full_desc
    );
    full_description.display(right);
    // Edit & Delete
    const actions_div = document.createElement("div");
    actions_div.className = "actions";
    right.appendChild(actions_div);

    const edit_button = document.createElement("button");
    edit_button.className = "edit";
    edit_button.innerText = "Edit";
    edit_button.onclick = function () {
        window.location.href = `snippet_editor?active_snippet=${active_snippet}`;
    };
    actions_div.appendChild(edit_button);

    const delete_button = document.createElement("button");
    delete_button.className = "delete";
    delete_button.innerText = "Delete";
    actions_div.appendChild(delete_button);
    delete_button.addEventListener("click", delete_snippet);
    //#endregion - - - - - RIGHT - - - - -

    //#region - - - - - Functions - - - - -
    async function post_snippet(data) {
        fetch(`${window.app_url}/insert_row`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    async function fetch_snippets() {
        try {
            let fetched_snippets = [];
            const response = await fetch(`${window.app_url}/snippets`);
            const data = await response.json();
            const snippets_data = data.snippet;

            snippets_data.forEach((snippet_data) => {
                const fetched_snippet = new snippet(
                    snippet_data.snippet_id,
                    snippet_data.name,
                    snippet_data.code,
                    snippet_data.short_desc,
                    snippet_data.full_desc,
                    snippet_data.favourite,
                    snippet_data.tags,
                    snippet_data.snippet_list_id
                );
                fetched_snippets.push(fetched_snippet);
            });
            return fetched_snippets;
        } catch (error) {
            console.error("Error fetching snippets:", error);
        }
    }

    async function create_snippet() {
        const data = {
            name: "Snippet Name",
            code: "Snippet Code",
            short_desc: "Snippet Short Description",
            full_desc: "Snippet Full Description",
            favourite: 0,
            snippet_list_id: 1,
        };
        await post_snippet(data);
        const updated_snippet_list = await fetch_snippets();
        await snippet_list_default.update_snippets(
            left,
            updated_snippet_list,
            update_active_snippet
        );
        const new_snippet_id = snippet_list_default.snippets.at(-1).snippet_id;
        window.location.href = `snippet_editor?active_snippet=${new_snippet_id}`;
    }

    async function delete_snippet() {
        try {
            const response = await fetch(
                `${window.app_url}/delete_snippet/${active_snippet}`
            );
            const data = await response.json();
            const updated_snippet_list = await fetch_snippets();
            snippet_list_default.update_snippets(
                left,
                updated_snippet_list,
                update_active_snippet
            );
			let newest_snippet = snippet_list_default.snippets.at(-1);
			update_active_snippet(newest_snippet.full_desc, newest_snippet.snippet_id);
        } catch (error) {
            console.error("Error fetching:", error);
        }
    }

    function search() {
        const query = search_input.value;
        const result = full_snippet_list.search(query);

        if (query != "") {
            snippet_list_default.update_snippets(
                left,
                result,
                update_active_snippet
            );
            console.log(snippet_list_default, "if");
        } else {
            snippet_list_default.update_snippets(
                left,
                full_snippet_list.snippets,
                update_active_snippet
            );
        }
    }

    function update_active_snippet(active_full_desc, active_snippet_id) {
        active_snippet = active_snippet_id;
        full_description.update_desc(active_full_desc);
    }
    //#endregion
}
