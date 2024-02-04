from flask import render_template, request, url_for, redirect, session, flash
from flask_cors import CORS
from flask_session import Session
import database_control.db_queries as dbq
import bcrypt


def handle_login():
    if request.method == "GET":
        if not session.get("user"):
            return render_template("base.html", page="login")
        return redirect(url_for("render_main"))

    email = request.form["email_input"]
    password = request.form["password_input"]
    current_password = dbq.get_user_password(email)["password"]

    if current_password is None:
        flash(f"No user was found with '{email}' e-mail!")
        return redirect(url_for("render_login"))

    if bcrypt.checkpw(password.encode("utf-8"), current_password[0].encode("utf-8")):
        session["user"] = email
        session["user_id"] = dbq.get_user(email)["user"][0]
        session["premium"] = dbq.get_premium(session["user_id"])
        session["snippet_list"] = dbq.get_sl_id(session["user_id"])
        print(session["snippet_list"])
        return redirect(url_for("render_authenticate"))
    else:
        flash("Wrong password!")
        return redirect(url_for("render_login"))
