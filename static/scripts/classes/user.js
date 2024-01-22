export class user {
	constructor(user_id, username, email, profile_picture = null) {
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.profile_picture = profile_picture;
	}

	display(where) {
		const user_div = document.createElement("div");
		user_div.className = "user";
		where.appendChild(user_div);

		const username_div = document.createElement("div");
		username_div.className = "username";
		username_div.innerText = this.username;
		user_div.appendChild(username_div);

		if (this.profile_picture) {
			const profile_picture = document.createElement("img");
			profile_picture.className = "profile_picture";
			profile_picture.src = `./static/assets/${this.profile_picture}`;
			user_div.appendChild(profile_picture);
		}

		const user_options = document.createElement("div");
		user_options.className = "user_options";
		user_div.addEventListener("click", () => {
			user_options.classList.toggle("visible");
		});
		where.appendChild(user_options);

		const edit_account_button = document.createElement("button");
		edit_account_button.type = "button";
		edit_account_button.className = "edit_account";
		edit_account_button.innerText = "Edit Account";
		edit_account_button.addEventListener("click", () => {
			window.location.href = "account";
		});
		user_options.appendChild(edit_account_button);

		const buy_premium_button = document.createElement("button");
		buy_premium_button.type = "button";
		buy_premium_button.className = "buy_premium";
		buy_premium_button.innerText = "Buy Premium";
		buy_premium_button.addEventListener("click", () => {
			window.location.href = "premium";
		});
		user_options.appendChild(buy_premium_button);

		const logout_button = document.createElement("button");
		logout_button.type = "button";
		logout_button.className = "logout";
		logout_button.innerText = "Log out";
		logout_button.addEventListener("click", () => {
			window.location.href = "logout";
		});
		user_options.appendChild(logout_button);
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = User;
}
