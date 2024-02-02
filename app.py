from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_cors import CORS
from flask_session import Session
import os
import bcrypt
import database_control.db_queries as dbq
import auth.login as al
import auth.register as ar
import stripe

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = 86400
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = "auth/flask_session"
Session(app)

public_key = "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"


# region Payment
@app.route("/premium")
def render_premium():
    if not session.get("user"):
        return "forbidden"
    return render_template(
        "premium.html", public_key=public_key, premium=session["premium"]
    )


@app.route("/payment", methods=["POST"])
def payment():

    customer = stripe.Customer.create(
        email=request.form["stripeEmail"], source=request.form["stripeToken"]
    )

    charge = stripe.Charge.create(
        customer=customer.id, amount=999, currency="usd", description="Premium"  # $9.99
    )

    dbq.update_premium(session["user_id"])

    return redirect(url_for("render_account"))


# endregion


# region Pages
@app.route("/")
def home():
    return render_template("base.html", page="home")


@app.route("/main", methods=["GET"])
def render_main():
    if not session.get("user"):
        return redirect(url_for("render_login"))
    return render_template("base.html", page="main")


@app.route("/snippet_editor", methods=["GET"])
def render_snippet_editor():
    if not session.get("user"):
        return redirect(url_for("render_login"))
    return render_template("base.html", page="snippet_editor")


@app.route("/account", methods=["GET", "POST"])
def render_account():
    if not session.get("user"):
        return "forbidden"

    if request.method == "GET":
        return render_template("base.html", page="user_account")

    if request.form.get("username"):
        try:
            new_username = request.form["username"]
            dbq.update_username(session["user_id"], new_username)
            return redirect(url_for("render_logout"))

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)})

    else:
        try:
            current_password = dbq.get_user_password(session["user"])["password"][0]
            current_password_input = request.form["current_password"]

            if bcrypt.checkpw(
                current_password_input.encode("utf-8"), current_password.encode("utf-8")
            ):
                new_password = bcrypt.hashpw(
                    request.form["confirm_new_password"].encode("utf-8"),
                    bcrypt.gensalt(),
                )
                result = dbq.update_password(new_password, session["user_id"])
                return redirect(url_for("render_logout"))
            else:
                return render_template("base.html", page="user_account")

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)})


# endregion Pages


# region Auth
@app.route("/login", methods=["GET", "POST"])
def render_login():
    return al.handle_login()


@app.route("/login/authenticate", methods=["GET"])
def render_authenticate():
    if not session.get("user"):
        return "forbidden"
    return render_template("authenticate.html")


@app.route("/logout", methods=["GET"])
def render_logout():
    session["user"] = None
    session["user_id"] = None
    return redirect(url_for("render_login"))


@app.route("/register", methods=["GET", "POST"])
def render_register():
    if not session.get("user"):
        if request.method == "GET":
            return render_template("base.html", page="register")
        if request.method == "POST":
            return ar.register_post()
    return redirect(url_for("render_main"))


# endregion Auth


# region Database
@app.route("/user", methods=["GET"])
def render_user():
    if not session.get("user"):
        return "forbidden"
    return dbq.get_user(session["user"])


@app.route("/snippets", methods=["GET"])
def snippets():
    if not session.get("user"):
        return "forbidden"
    x = dbq.get_sl_id(session["user_id"])
    return dbq.get_snippets(x)


@app.route("/snippet_list", methods=["GET"])
def snippet_list():
    if not session.get("user"):
        return "forbidden"
    return dbq.get_snippet_list(session["user_id"])


@app.route("/insert_row", methods=["POST"])
def create_new_snippet():
    if not session.get("user"):
        return "forbidden"
    return dbq.insert_row()


@app.route("/delete_snippet/<int:snippet_id>", methods=["GET"])
def delete_snippet(snippet_id):
    if not session.get("user"):
        return "forbidden"
    return dbq.delete_row(snippet_id)


@app.route("/snippets/<int:user_id>/<int:snippet_id>", methods=["GET"])
def get_snippet_route(user_id, snippet_id):
    try:
        if not session.get("user"):
            return "forbidden"
        result = dbq.get_snippet(user_id, snippet_id)
        return result
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/snippets/<int:user_id>/<int:snippet_id>", methods=["PUT"])
def update_snippet_route(user_id, snippet_id):
    try:
        if not session.get("user"):
            return "forbidden"
        result = dbq.update_row(snippet_id)
        return result
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


# endregion Database

if __name__ == "__main__":
    app.run(debug=True)
