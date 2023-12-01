import { CodeChest } from "./codechest.js";

// document.addEventListener("DOMContentLoaded", init);

// function init() {
// 	// CodeChest.draw_static(document.body);
// 	displayDiv();
// }

// function displayDiv() {
// 	// Create a new div element
// 	var newDiv = document.createElement("div");

// 	// Set some content for the div (you can customize this part)
// 	newDiv.innerHTML = "This is a dynamically created div!";

// 	// Set some styles for the div (you can customize this part)
// 	newDiv.style.border = "1px solid black";
// 	newDiv.style.padding = "10px";
// 	newDiv.style.margin = "10px";

// 	// Append the new div to the body of the document
// 	document.body.appendChild(newDiv);
// }

// function init() {}

let cc = new CodeChest("CodeChest");

cc.draw_static(document.body);
