const snippet = require('../front-end/classes/myClass');
const snippet_list = require('../front-end/classes/snippet_list');
const user = require('../front-end/classes/user');

// Example usage of MyClass
const myObject = new snippet(1, 'Sample Snippet', 'console.log("Hello, World!");', 'Prints a greeting', 'This snippet prints a simple greeting to the console.', true, 123);
myObject.display('output');

// Example usage of SnippetList
const snippet_list = new SnippetList(123, 100, 'user123', 5, [
  new snippet(1, 'Snippet 1', 'code 1', 'desc 1', 'full desc 1', false, 123),
  new snippet(2, 'Snippet 2', 'code 2', 'desc 2', 'full desc 2', true, 123),
  // Add more snippets as needed
]);
snippet_list.display('output_snippet_list');

// Example usage of User
const user = new User(456, 'john_doe', 'john@example.com', 'path/to/profile_picture.jpg');
user.display('output_user');
