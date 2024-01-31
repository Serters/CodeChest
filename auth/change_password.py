from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_cors import CORS
from flask_session import Session
import database_control.db_queries as dbq


@app.route("/account/change_password/<str:new_password>", methods=["PUT"])
def handle_password_change():
    try:
        if not session.get("user"):
            return "forbidden"
        result = dbq.update_password(new_password)
        return result
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})