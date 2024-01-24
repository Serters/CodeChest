from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_cors import CORS
from flask_session import Session
import time
import database_control.db_queries as dbq

app = Flask(__name__)
app.secret_key = "demo"
CORS(app)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def home():
    if not session.get("user"):
        return "cats"
    return render_template("base.html", page="main")


@app.route("/main", methods=["GET"])
def render_main():
    if not session.get("user"):
        return redirect(url_for("render_login"))
    return render_template("base.html", page="main")


@app.route("/snippet_editor", methods=["GET"])
def render_snippet_editor():
    return render_template("base.html", page="snippet_editor")


@app.route("/login", methods=["GET", "POST"])
def render_login():
    if request.method == "GET":
        if not session.get("user"):
            return render_template("base.html", page="login")
        return redirect(url_for("render_main"))

    email = request.form["email_input"]
    if dbq.login(email, request.form["password_input"]):
        session["user"] = email
        return redirect(url_for("render_authenticate"))

    return redirect(url_for("render_login"))


@app.route("/login/authenticate", methods=["GET"])
def render_authenticate():
    if not session.get("user"):
        return "forbidden"
    return render_template("authenticate.html")


@app.route("/register", methods=["GET"])
def render_register():
    if not session.get("user"):
        return render_template("base.html", page="register")
    return redirect(url_for("render_main"))


@app.route("/logout", methods=["GET"])
def render_logout():
    session["user"] = None
    return redirect(url_for("render_login"))


@app.route("/user", methods=["GET"])
def render_user():
    if not session.get("user"):
        return "forbidden"
    return dbq.get_user(session["user"])


@app.route("/snippets", methods=["GET"])
def snippets():
    if not session.get("user"):
        return "forbidden"
    return dbq.get_snippets(1)


@app.route("/snippet_list", methods=["GET"])
def snippet_list():
    if not session.get("user"):
        return "forbidden"
    return dbq.get_snippet_list(1)


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


@app.route("/account")
def render_account():
    if not session.get("user"):
        return "forbidden"
    return render_template("base.html", page="user_account")


@app.route("/premium")
def render_premium():
    if not session.get("user"):
        return "forbidden"
    return render_template("base.html", page="main")


if __name__ == "__main__":
    app.run(debug=True)
