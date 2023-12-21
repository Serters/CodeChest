export function draw_static(where) {
	draw_header(where);
}

export function draw_header(where) {
	const h = document.createElement("header");
	where.appendChild(h);

	const left = document.createElement("div");
	left.className = "header-left";
	h.appendChild(left);

	const logo = document.createElement("img");
	logo.src = "../../assets/images/logo.png";
	logo.className = "logo";
	left.appendChild(logo);

	const title = document.createElement("h1");
	title.innerText = "CodeChest";
	left.appendChild(title);
}

export function draw_footer(where) {
	const f = document.createElement("footer");
	where.appendChild(f);

	const copy = document.createElement("span");
	copy.innerHTML = "&copy; CodeChest 2023.";
	f.appendChild(copy);
}
