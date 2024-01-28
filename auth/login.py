from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_cors import CORS
from flask_session import Session
import database_control.db_queries as dbq

def handle_login():
    if request.method == "GET":
        if not session.get("user"):
            return render_template("base.html", page="login")
        return redirect(url_for("render_main"))

    email = request.form["email_input"]
    if dbq.login(email, request.form["password_input"]):
        session["user"] = email
        return redirect(url_for("render_authenticate"))

    return redirect(url_for("render_login"))