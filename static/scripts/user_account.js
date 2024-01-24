import { draw_footer, draw_header } from "./static.js";
//TODO Cleanup
document.addEventListener("DOMContentLoaded", render);

function render() {
    draw_header(document.body);
    draw_main(document.body);
    draw_footer(document.body);
}

async function draw_main(where) {
    const m = document.createElement("main");
    where.appendChild(m);

    //#region - - - - - -  LEFT - - - - - -
    const left = document.createElement("div");
    left.className = "left";
    m.appendChild(left);

    const my_account_button = document.createElement("button");
    my_account_button.type = "button";
    my_account_button.className = "my_account_button";
	my_account_button.innerText = "My Account";
    my_account_button.addEventListener("click", () => {
    });
    left.appendChild(my_account_button);

    const change_password_button = document.createElement("button");
    change_password_button.type = "button";
    change_password_button.className = "change_password_button";
	change_password_button.innerText = "Change Password";
    change_password_button.addEventListener("click", () => {
    });
    left.appendChild(change_password_button);

    const buy_premium_button = document.createElement("button");
    buy_premium_button.type = "button";
    buy_premium_button.className = "buy_premium_button";
	buy_premium_button.innerText = "Buy Premium";

	buy_premium_button.style.backgroundImage = 'url("static/scripts/cats.png")';
	buy_premium_button.style.backgroundSize = 'cover'; // You can adjust this property based on your needs

    buy_premium_button.addEventListener("click", () => {
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
}
