export class CodeChest {
	constructor(name) {
		this.name = name;
	}

	draw_static(w) {
		const h = document.createElement("div");
		h.innerText = "test";
		w.appendChild(h);
		return 1;
	}
}
