import { user } from "./classes/user.js";

export async function draw_header(where) {
	const h = document.createElement("header");
	where.appendChild(h);

	const left = document.createElement("div");
	left.className = "left";
	h.appendChild(left);

	const logo_div = document.createElement("div");
	logo_div.className = "logo";
	logo_div.addEventListener("click", () => {
		window.location.href = "main";
	});
	left.appendChild(logo_div);

	const logo = document.createElement("img");
	logo.src = "../static/assets/logo.png";
	logo.alt = "logo";
	logo_div.appendChild(logo);

	const title = document.createElement("h1");
	title.innerText = "CodeChest";
	logo_div.appendChild(title);

	if (
		window.location.href.includes("main") ||
		window.location.href.includes("snippet_edito")
	) {
		const user_data = await get_user();

		const right = document.createElement("div");
		right.className = "right";
		h.appendChild(right);

		const current_user = new user(
			user_data[0],
			user_data[1],
			user_data[2],
			"profile_picture.png"
		);
		current_user.display(right);
	}
}

export function draw_footer(where) {
	const f = document.createElement("footer");
	where.appendChild(f);

	const copy = document.createElement("span");
	copy.innerHTML = "&copy; CodeChest 2023.";
	f.appendChild(copy);
}

async function get_user() {
	try {
		const response = await fetch("http://127.0.0.1:5000/user");
		const data = await response.json();
		const user_data = data.user;
		return user_data;
	} catch (error) {
		console.error("Error fetching snippets:", error);
	}
}
