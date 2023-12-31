export class user {
	constructor(user_id, username, email, profile_picture = null) {
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.profile_picture = profile_picture;
	}

	display() {
		
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = User;
}
