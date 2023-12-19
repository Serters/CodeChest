export class snippet {
    constructor(snippet_id, name, code, short_desc, full_desc, favourite, snippet_list_id) {
      this.snippet_id = snippet_id;
      this.name = name;
      this.code = code;
      this.short_desc = short_desc;
      this.full_desc = full_desc;
      this.favourite = favourite;
      this.snippet_list_id = snippet_list_id;
    }
  
    display(targetDivId) {
      const outputDiv = document.getElementById(targetDivId);
      if (outputDiv) {
        outputDiv.innerHTML = `
          <p>Snippet Information:</p>
          <ul>
            <li>Snippet ID: ${this.snippet_id}</li>
            <li>Name: ${this.name}</li>
            <li>Code: ${this.code}</li>
            <li>Short Description: ${this.short_desc}</li>
            <li>Full Description: ${this.full_desc}</li>
            <li>Favourite: ${this.favourite ? 'Yes' : 'No'}</li>
            <li>Snippet List ID: ${this.snippet_list_id}</li>
          </ul>
        `;
      } else {
        console.error(`Target div with id "${targetDivId}" not found.`);
      }
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = snippet;
  }
  