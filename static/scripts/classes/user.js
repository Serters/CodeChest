export class user {
	constructor(user_id, username, email, profile_picture = null) {
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.profile_picture = profile_picture;
	}

	display(targetDivId) {
		const outputDiv = document.getElementById(targetDivId);
		if (outputDiv) {
			outputDiv.innerHTML += `
          <p>User Information:</p>
          <ul>
            <li>User ID: ${this.user_id}</li>
            <li>Username: ${this.username}</li>
            <li>Email: ${this.email}</li>
            <li>Profile Picture: ${this.profile_picture || "Default"}</li>
          </ul>
        `;
		} else {
			console.error(`Target div with id "${targetDivId}" not found.`);
		}
	}
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
	module.exports = User;
}
