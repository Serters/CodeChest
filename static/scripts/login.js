import { user } from "./classes/user.js";
import { draw_footer, draw_header } from "./static.js";

document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

function draw_main(where) {
	const m = document.createElement("main");
	where.appendChild(m);

	const login_form = document.createElement("form");
	login_form.action = "login";
	login_form.method = "POST";
	login_form.name = "login_form";
	m.appendChild(login_form);

	const email_div = document.createElement("div");
	email_div.className = "container";
	login_form.appendChild(email_div);

	const email_lbl = document.createElement("label");
	email_lbl.innerText = "E-mail / Username";
	email_div.appendChild(email_lbl);

	const email_input = document.createElement("input");
	email_input.type = "text";
	email_input.name = "email_input";
	email_input.placeholder = "user@codechest.com";
	email_input.value = "demo@codechest.com";
	email_div.appendChild(email_input);

	const password_div = document.createElement("div");
	password_div.className = "container";
	login_form.appendChild(password_div);

	const password_lbl = document.createElement("label");
	password_lbl.innerText = "Password";
	password_div.appendChild(password_lbl);

	const password_input = document.createElement("input");
	password_input.type = "password";
	password_input.name = "password_input";
	password_input.placeholder = "password";
	password_input.value = "demo";
	password_div.appendChild(password_input);

	const password_toggle = document.createElement("button");
	password_toggle.className = "password_toggle";
	password_toggle.type = "button";
	password_toggle.addEventListener("click", toggle_password);
	password_toggle.textContent = "Show";
	password_div.appendChild(password_toggle);

	const login_button = document.createElement("button");
	login_button.name = "login_button";
	login_button.innerText = "Log in";
	login_button.type = "submit";
	login_form.appendChild(login_button);
}

function toggle_password() {
	const password_input = document.querySelector("[name=password_input]");
	const password_toggle = document.querySelector(".password_toggle");

	if (password_input.type === "password") {
		password_input.type = "text";
		password_toggle.textContent = "Hide";
	} else {
		password_input.type = "password";
		password_toggle.textContent = "Show";
	}
}
