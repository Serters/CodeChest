export class snippet_list {
    constructor(snippet_list_id, max_storage, user_id, snippet_count, snippets) {
      this.snippet_list_id = snippet_list_id;
      this.max_storage = max_storage;
      this.user_id = user_id;
      this.snippet_count = snippet_count;
      this.snippets = snippets || [];
    }
  
    display(targetDivId) {
      const outputDiv = document.getElementById(targetDivId);
      if (outputDiv) {
        outputDiv.innerHTML = `
          <p>Snippet List Information:</p>
          <ul>
            <li>Snippet List ID: ${this.snippet_list_id}</li>
            <li>Max Storage: ${this.max_storage}</li>
            <li>User ID: ${this.user_id}</li>
            <li>Snippet Count: ${this.snippet_count}</li>
            <li>Snippets:</li>
            <ul>
              ${this.snippets.map(snippet => `<li>${snippet.name}</li>`).join('')}
            </ul>
          </ul>
        `;
      } else {
        console.error(`Target div with id "${targetDivId}" not found.`);
      }
    }
  }
  
  // Export the SnippetList class for use in other files (optional)
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = snippet_list;
  }
  