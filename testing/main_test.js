import { snippet } from "../front-end/classes/snippet.js";
import { snippet_list } from "../front-end/classes/snippet_list.js";
import { user } from "../front-end/classes/user.js";

const snippet_list_default = new snippet_list(1, 100, 1, []);

async function fetchAndProcessSnippets() {
    let sl = [];

    try {
        const response = await fetch("http://127.0.0.1:5000/snippets");
        const data = await response.json();

        const snippetsData = data.snippet;

        snippetsData.forEach((snippetData) => {
            const snippet = createSnippetObjectFromData(snippetData);
            sl.push(snippet);
        });

        snippet_list_default.snippets = sl;
        // snippet_list_default.display(document.body);

        console.log(sl);
        
    } catch (error) {
        console.error("Error fetching snippets:", error);
    }

    return sl;
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

// Use an async function to wait for the fetch operation to complete
async function initializeSnippetList() {
    const snippetListData = await fetchAndProcessSnippets();
    const snippet_list_new = new snippet_list(1, 100, 1, snippetListData);
    snippet_list_new.display(document.body);
}

// Call the async function to initialize and display the snippet list
initializeSnippetList();