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
	const current_user = new user(
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
	my_account_picture.src = `./static/assets/${current_user.profile_picture}`;
	my_account_picture.alt = "Profile Picture";
	my_account_div.appendChild(my_account_picture);

	const my_account_username = document.createElement("h2");
	my_account_username.textContent = current_user.username;
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
	//#endregion

	function my_acccount_tab() {
		right.innerHTML = "";

		const username_label = document.createElement("label");
		username_label.textContent = "Username";
		username_label.htmlFor = "username";
		right.appendChild(username_label);

		const username_input = document.createElement("input");
		username_input.type = "text";
		username_input.name = "username";
		username_input.value = current_user.username;
		username_input.placeholder = "username";
		right.appendChild(username_input);

		const email_label = document.createElement("label");
		email_label.textContent = "email";
		email_label.htmlFor = "email";
		right.appendChild(email_label);

		const email_input = document.createElement("input");
		email_input.type = "text";
		email_input.name = "email";
		email_input.value = current_user.email;
		email_input.placeholder = "email";
		right.appendChild(email_input);
	}

	function change_password_tab() {
		right.innerHTML = "";

		const current_password_label = document.createElement("label");
		current_password_label.textContent = "Current password";
		current_password_label.htmlFor = "current_password";
		right.appendChild(current_password_label);

		const current_password_input = document.createElement("input");
		current_password_input.type = "password";
		current_password_input.name = "current_password";
		current_password_input.placeholder = "password";
		right.appendChild(current_password_input);

		const new_password_label = document.createElement("label");
		new_password_label.textContent = "New password";
		new_password_label.htmlFor = "new_password";
		right.appendChild(new_password_label);

		const new_password_input = document.createElement("input");
		new_password_input.type = "password";
		new_password_input.name = "new_password";
		new_password_input.placeholder = "password";
		right.appendChild(new_password_input);

		const confirm_new_password_label = document.createElement("label");
		confirm_new_password_label.textContent = "Confirm new password";
		confirm_new_password_label.htmlFor = "confirm_new_password";
		right.appendChild(confirm_new_password_label);

		const confirm_new_password_input = document.createElement("input");
		confirm_new_password_input.type = "password";
		confirm_new_password_input.name = "confirm_new_password";
		confirm_new_password_input.placeholder = "password";
		right.appendChild(confirm_new_password_input);
	}
}
