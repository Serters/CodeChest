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

	const register_form = document.createElement("form");
	register_form.name = "register_form";
	register_form.method = "POST";
	register_form.addEventListener("keyup", check_data_validation);
	m.appendChild(register_form);

	const email_div = document.createElement("div");
	email_div.className = "container";
	register_form.appendChild(email_div);

	const email_lbl = document.createElement("label");
	email_lbl.innerText = "E_mail";
	email_lbl.htmlFor = "email_input";
	email_div.appendChild(email_lbl);

	const email_input = document.createElement("input");
	email_input.type = "email";
	email_input.name = "email_input";
	email_input.placeholder = "user@codechest.com";
	email_input.autocomplete = "email";
	email_div.appendChild(email_input);

	const username_div = document.createElement("div");
	username_div.className = "container";
	register_form.appendChild(username_div);

	const username_lbl = document.createElement("label");
	username_lbl.innerText = "Username";
	username_lbl.htmlFor = "username_input";
	username_div.appendChild(username_lbl);

	const username_input = document.createElement("input");
	username_input.type = "text";
	username_input.name = "username_input";
	username_input.placeholder = "username";
	username_input.autocomplete = "username";
	username_div.appendChild(username_input);

	const password_div = document.createElement("div");
	password_div.className = "container";
	register_form.appendChild(password_div);

	const password_lbl = document.createElement("label");
	password_lbl.innerText = "Password";
	password_lbl.htmlFor = "password_input";
	password_div.appendChild(password_lbl);

	const password_input = document.createElement("input");
	password_input.type = "password";
	password_input.name = "password_input";
	password_input.placeholder = "password";
	password_input.autocomplete = "new-password";
	password_div.appendChild(password_input);

	const password_toggle = document.createElement("button");
	password_toggle.className = "password_toggle";
	password_toggle.textContent = "Show";
	password_toggle.type = "button";
	password_toggle.tabIndex = -1;
	password_div.appendChild(password_toggle);
	password_toggle.addEventListener("click", toggle_password, false);

	const confirm_password_div = document.createElement("div");
	confirm_password_div.className = "container";
	register_form.appendChild(confirm_password_div);

	const confirm_password_lbl = document.createElement("label");
	confirm_password_lbl.innerText = "Confirm password";
	confirm_password_lbl.htmlFor = "confirm_password_input";
	confirm_password_div.appendChild(confirm_password_lbl);

	const confirm_password_input = document.createElement("input");
	confirm_password_input.type = "password";
	confirm_password_input.name = "confirm_password_input";
	confirm_password_input.placeholder = "password";
	confirm_password_input.autocomplete = "new-password";
	confirm_password_div.appendChild(confirm_password_input);

	const confirm_password_toggle = document.createElement("button");
	confirm_password_toggle.className = "password_toggle";
	confirm_password_toggle.textContent = "Show";
	confirm_password_toggle.type = "button";
	confirm_password_toggle.tabIndex = -1;
	confirm_password_div.appendChild(confirm_password_toggle);
	confirm_password_toggle.addEventListener("click", toggle_password, false);

	const register_button = document.createElement("button");
	register_button.name = "register_button";
	register_button.innerText = "Register";
	register_button.disabled = true;
	register_form.appendChild(register_button);

	function check_data_validation() {
		if (
			email_input.value == "" ||
			username_input.value == "" ||
			password_input.value.length < 8 ||
			confirm_password_input.value.length < 8 ||
			password_input.value != confirm_password_input.value
		) {
			register_button.disabled = true;
		} else {
			register_button.disabled = false;
		}
	}
}

function toggle_password(event) {
	const button = event.target;
	const input = event.target.previousSibling;
	if (input.type === "password") {
		button.textContent = "Hide";
		input.type = "text";
	} else {
		button.textContent = "Show";
		input.type = "password";
	}
}
