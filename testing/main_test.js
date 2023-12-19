import { snippet } from "../front-end/classes/snippet.js";
import { snippet_list } from "../front-end/classes/snippet_list.js";
import { user } from "../front-end/classes/user.js";

// Example usage of MyClass
const snippet_1 = new snippet(
	1,
	"Sample Snippet",
	'console.log("Hello, World!");',
	"Prints a greeting",
	"This snippet prints a simple greeting to the console.",
	true,
	123
);
snippet_1.display('myDiv');

// Example usage of SnippetList
const snippet_list_1 = new snippet_list(123, 100, "user123", 5, [
	new snippet(1, "Snippet 1", "code 1", "desc 1", "full desc 1", false, 123),
	new snippet(2, "Snippet 2", "code 2", "desc 2", "full desc 2", true, 123),
	// Add more snippets as needed
]);
snippet_list_1.display('myDiv');

// Example usage of User
const user_1 = new user(
	456,
	"john_doe",
	"john@example.com",
	"path/to/profile_picture.jpg"
);
user_1.display('myDiv');