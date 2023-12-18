// Assume you have an HTML element with the id 'snippetsContainer' to append snippets to
var snippetsContainer = document.getElementById('snippetsContainer');

// Fetch data from the server
fetch('http://127.0.0.1:5000/temp')
    .then(response => response.json())
    .then(data => {
        // Access the snippets array from the JSON response
        var snippets = data.snippet;

        // Iterate through each snippet and create HTML elements
        snippets.forEach(snippet => {
            // Create a <div> for each snippet
            var snippetDiv = document.createElement('div');

            // Iterate through each parameter and create a <p> for it
            snippet.forEach(parameter => {
                var pElement = document.createElement('p');
                pElement.textContent = parameter;
                snippetDiv.appendChild(pElement);
            });

            // Append the snippetDiv to the main container
            snippetsContainer.appendChild(snippetDiv);

            // Display the name of the first snippet
            if (snippet[0] === 1) {
                var nameParagraph = document.createElement('p');
                nameParagraph.textContent = 'Name of the first snippet: ' + snippet[1];
                snippetsContainer.appendChild(nameParagraph);
            }

            // Display the snippet_id of the second snippet
            if (snippet[0] === 2) {
                var snippetIdParagraph = document.createElement('p');
                snippetIdParagraph.textContent = 'Snippet ID of the second snippet: ' + snippet[0];
                snippetsContainer.appendChild(snippetIdParagraph);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
