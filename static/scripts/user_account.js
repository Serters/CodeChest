import { draw_footer, draw_header } from "./static.js";
import { user } from "./classes/user.js";
//TODO Cleanup
document.addEventListener("DOMContentLoaded", render);

function render() {
	draw_header(document.body);
	draw_main(document.body);
	draw_footer(document.body);
}

async function draw_main(where) {
	let user_data = JSON.parse(localStorage.getItem("user_info")).user;
	const new_user = new user(
		user_data[0],
		user_data[1],
		user_data[2],
		user_data[3]
	);

	const m = document.createElement("main");
	where.appendChild(m);

	//#region - - - - - -  LEFT - - - - - -
	const left = document.createElement("div");
	left.className = "left";
	m.appendChild(left);

	const my_account_div = document.createElement("div");
	my_account_div.className = "my_account";
	left.appendChild(my_account_div);

	const my_account_picture = document.createElement("img");
	my_account_picture.src = `./static/assets/${new_user.profile_picture}`;
	my_account_picture.alt = "Profile Picture";
	my_account_div.appendChild(my_account_picture);

	const my_account_username = document.createElement("h2");
	my_account_username.textContent = new_user.username;
	my_account_div.appendChild(my_account_username);

	const my_account_button = document.createElement("button");
	my_account_button.type = "button";
	my_account_button.className = "my_account_button";
	my_account_button.innerText = "My Account";
	my_account_button.addEventListener("click", my_acccount_tab);
	left.appendChild(my_account_button);

	const change_password_button = document.createElement("button");
	change_password_button.type = "button";
	change_password_button.className = "change_password_button";
	change_password_button.innerText = "Change Password";
	change_password_button.addEventListener("click", change_password_tab);
	left.appendChild(change_password_button);

	const buy_premium_button = document.createElement("button");
	buy_premium_button.type = "button";
	buy_premium_button.className = "buy_premium_button";
	buy_premium_button.innerText = "Buy Premium";

	buy_premium_button.addEventListener("click", () => {
		window.location.href = "premium";
	});
	left.appendChild(buy_premium_button);

	const logout_button = document.createElement("button");
	logout_button.type = "button";
	logout_button.className = "logout_button";
	logout_button.innerText = "Log out";
	logout_button.addEventListener("click", () => {
		window.location.href = "logout";
	});
	left.appendChild(logout_button);
	//#endregion

	//#region - - - - - -  RIGHT - - - - - -
	const right = document.createElement("div");
	right.className = "right";
	m.appendChild(right);

	my_acccount_tab();
	//#endregion

	function my_acccount_tab() {
		right.innerHTML = "";

		const my_account_form = document.createElement("form");
		my_account_form.name = "my_account_form";
		my_account_form.readOnly = true;
		right.appendChild(my_account_form);

		//#region username
		const username_label = document.createElement("label");
		username_label.textContent = "Username";
		username_label.htmlFor = "username";
		my_account_form.appendChild(username_label);

		const username_div = document.createElement("div");
		username_div.className = "container";
		my_account_form.appendChild(username_div);

		const username_input = document.createElement("input");
		username_input.type = "text";
		username_input.name = "username";
		username_input.value = new_user.username;
		username_input.placeholder = "username";
		username_input.readOnly = true;
		username_input.autocomplete = "email";
		username_div.appendChild(username_input);
		//#endregion

		//#region email
		const email_label = document.createElement("label");
		email_label.textContent = "email";
		email_label.htmlFor = "email";
		my_account_form.appendChild(email_label);

		const email_div = document.createElement("div");
		email_div.className = "container";
		my_account_form.appendChild(email_div);

		const email_input = document.createElement("input");
		email_input.type = "text";
		email_input.name = "email";
		email_input.value = new_user.email;
		email_input.placeholder = "email";
		email_input.readOnly = true;
		email_div.appendChild(email_input);
		//#endregion

		const update_account_info_div = document.createElement("div");
		update_account_info_div.className = "container";
		my_account_form.appendChild(update_account_info_div);

		const update_account_info_button = document.createElement("button");
		update_account_info_button.type = "submit";
		update_account_info_button.name = "update_account_info_button";
		update_account_info_button.textContent = "Update Account Info";
		update_account_info_button.disabled = true;
		update_account_info_div.appendChild(update_account_info_button);
	}

	function change_password_tab() {
		right.innerHTML = "";

		const change_password_form = document.createElement("form");
		change_password_form.name = "change_password_form";
		right.appendChild(change_password_form);

		//#region current password
		const current_password_label = document.createElement("label");
		current_password_label.textContent = "new password";
		current_password_label.htmlFor = "current_password";
		change_password_form.appendChild(current_password_label);

		const current_password_div = document.createElement("div");
		current_password_div.className = "container";
		change_password_form.appendChild(current_password_div);

		const current_password_input = document.createElement("input");
		current_password_input.type = "password";
		current_password_input.name = "current_password";
		current_password_input.placeholder = "password";
		current_password_input.required = true;
		current_password_input.autocomplete = "current-password";
		current_password_input.onkeyup = check_data_validation;
		current_password_div.appendChild(current_password_input);

		const current_password_toggle = document.createElement("button");
		current_password_toggle.className = "password_toggle";
		current_password_toggle.type = "button";
		current_password_toggle.textContent = "Show";
		current_password_toggle.tabIndex = -1;
		current_password_toggle.addEventListener(
			"click",
			toggle_password,
			false
		);
		current_password_div.appendChild(current_password_toggle);
		//#endregion

		//#region new password
		const new_password_label = document.createElement("label");
		new_password_label.textContent = "New password";
		new_password_label.htmlFor = "new_password";
		change_password_form.appendChild(new_password_label);

		const new_password_div = document.createElement("div");
		new_password_div.className = "container";
		change_password_form.appendChild(new_password_div);

		const new_password_input = document.createElement("input");
		new_password_input.type = "password";
		new_password_input.name = "new_password";
		new_password_input.placeholder = "password";
		new_password_input.required = true;
		new_password_input.autocomplete = "new-password";
		new_password_input.onkeyup = check_data_validation;
		new_password_div.appendChild(new_password_input);

		const new_password_toggle = document.createElement("button");
		new_password_toggle.className = "password_toggle";
		new_password_toggle.type = "button";
		new_password_toggle.textContent = "Show";
		new_password_toggle.tabIndex = -1;
		new_password_toggle.addEventListener("click", toggle_password, false);
		new_password_div.appendChild(new_password_toggle);
		//#endregion

		//#region confirm new password
		const confirm_new_password_label = document.createElement("label");
		confirm_new_password_label.textContent = "Confirm new password";
		confirm_new_password_label.htmlFor = "confirm_new_password";
		change_password_form.appendChild(confirm_new_password_label);

		const confirm_new_password_div = document.createElement("div");
		confirm_new_password_div.className = "container";
		change_password_form.appendChild(confirm_new_password_div);

		const confirm_new_password_input = document.createElement("input");
		confirm_new_password_input.type = "password";
		confirm_new_password_input.name = "confirm_new_password";
		confirm_new_password_input.placeholder = "password";
		confirm_new_password_input.required = true;
		confirm_new_password_input.autocomplete = "new-password";
		confirm_new_password_input.onkeyup = check_data_validation;
		confirm_new_password_div.appendChild(confirm_new_password_input);

		const confirm_new_password_toggle = document.createElement("button");
		confirm_new_password_toggle.className = "password_toggle";
		confirm_new_password_toggle.type = "button";
		confirm_new_password_toggle.textContent = "Show";
		confirm_new_password_toggle.tabIndex = -1;
		confirm_new_password_toggle.addEventListener(
			"click",
			toggle_password,
			false
		);
		confirm_new_password_div.appendChild(confirm_new_password_toggle);
		//#endregion

		const change_password_div = document.createElement("div");
		change_password_div.className = "container";
		change_password_form.appendChild(change_password_div);

		const change_password_button = document.createElement("button");
		change_password_button.type = "submit";
		change_password_button.name = "change_password_button";
		change_password_button.textContent = "Change Password";
		change_password_button.disabled = true;
		change_password_button.addEventListener(
			"click",
			change_password,
			false
		);
		change_password_div.appendChild(change_password_button);

		function change_password(event) {
			if (
				new_password_input.value === "" ||
				new_password_input.value.length < 8 ||
				new_password_input.value != confirm_new_password_input.value
			) {
				event.preventDefault();
			} else {
				console.log("good");
			}
		}

		function check_data_validation() {
			if (
				new_password_input.value.length < 8 ||
				new_password_input.value.length < 8 ||
				new_password_input.value != confirm_new_password_input.value
			) {
				change_password_button.disabled = true;
			} else {
				change_password_button.disabled = false;
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
}
