import { draw_footer, draw_header } from "./static.js";
//TODO Cleanup
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
	login_form.name = "login-form";
	m.appendChild(login_form);

	const email_div = document.createElement("div");
	email_div.className = "container";
	login_form.appendChild(email_div);

	const email_lbl = document.createElement("label");
	email_lbl.innerText = "E-mail";
	email_div.appendChild(email_lbl);

	const email_input = document.createElement("input");
	email_input.type = "email";
	email_input.name = "email-input";
	email_input.placeholder = "user@codechest.com";
	email_lbl.htmlFor = "email-input";
	email_div.appendChild(email_input);

	const username_div = document.createElement("div");
	username_div.className = "container";
	login_form.appendChild(username_div);

	const username_lbl = document.createElement("label");
	username_lbl.innerText = "Username";
	username_div.appendChild(username_lbl);

	const username_input = document.createElement("input");
	username_input.type = "text";
	username_input.name = "username-input";
	username_input.placeholder = "username";
	username_lbl.htmlFor = "username-input";
	username_div.appendChild(username_input);

	const password_div = document.createElement("div");
	password_div.className = "container";
	login_form.appendChild(password_div);

	const password_lbl = document.createElement("label");
	password_lbl.innerText = "Password";
	password_div.appendChild(password_lbl);

	const password_input = document.createElement("input");
	password_input.type = "password";
	password_input.name = "password-input";
	password_input.placeholder = "password";
	password_lbl.htmlFor = "password-input";
	password_div.appendChild(password_input);

	const password_toggle = document.createElement("i");
	password_toggle.className = "password-toggle";
	password_toggle.textContent = "Show";
	password_div.appendChild(password_toggle);
	password_toggle.addEventListener("click", (e) =>
		toggle_password(e.currentTarget)
	);

	const confirm_password_div = document.createElement("div");
	confirm_password_div.className = "container";
	login_form.appendChild(confirm_password_div);

	const confirm_password_lbl = document.createElement("label");
	confirm_password_lbl.innerText = "Confirm password";
	confirm_password_div.appendChild(confirm_password_lbl);

	const confirm_password_input = document.createElement("input");
	confirm_password_input.type = "password";
	confirm_password_input.name = "confirm-password-input";
	confirm_password_input.placeholder = "password";
	confirm_password_lbl.htmlFor = "confirm-password-input";
	confirm_password_div.appendChild(confirm_password_input);

	const confirm_password_toggle = document.createElement("i");
	confirm_password_toggle.className = "confirm-password-toggle";
	confirm_password_toggle.textContent = "Show";
	confirm_password_div.appendChild(confirm_password_toggle);
	confirm_password_toggle.addEventListener("click", (e) =>
		toggle_password(e.currentTarget)
	);

	const login_btn = document.createElement("button");
	login_btn.name = "login-btn";
	login_btn.innerText = "Log in";
	login_form.appendChild(login_btn);
}

function toggle_password(e) {
	const password_input = e.previousSibling;
	const password_toggle = e;

	if (password_input.type === "password") {
		password_input.type = "text";
		password_toggle.textContent = "Hide";
	} else {
		password_input.type = "password";
		password_toggle.textContent = "Show";
	}
}
