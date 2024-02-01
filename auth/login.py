from flask import Flask, jsonify, render_template, request, url_for, redirect, session
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
    current_password = dbq.get_user_password(email)["password"][0]
    print(current_password)

    if bcrypt.checkpw(password.encode("utf-8"), current_password.encode("utf-8")):
        session["user"] = email
        session["user_id"] = dbq.get_user(email)["user"][0]
        session["user_id"] = 0
        return redirect(url_for("render_authenticate"))

    return redirect(url_for("render_login"))
