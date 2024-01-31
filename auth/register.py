from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_session import Session
import database_control.db_queries as dbq
import bcrypt

import database_control.db_access as dba
import database_control.db_secret as dbs


def is_registered(email):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT COUNT(*) 
            FROM users
            WHERE email = %s;
        """

        cursor.execute(query, (email,))
        count = cursor.fetchone()[0]
        connection.commit()
        dba.close_connection(connection, cursor)
        return count > 0

    except Exception as e:
        print(f"Error in is_registered: {e}")


def insert_user(email, username, password):
    connection = dba.connect_to_database(dbs.db_login)
    cursor = connection.cursor()

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    )

    query = "INSERT INTO users (email, username, password) VALUES (%s, %s, %s)"
    values = (email, username, hashed_password)

    try:
        cursor.execute(query, values)
        connection.commit()
        return True
    except Exception as e:
        print(f"Error inserting user: {e}")
        connection.rollback()
        return False
    finally:
        cursor.close()
        connection.close()


def register_post():
    print("cat")
    email = request.form["email_input"]
    username = request.form["username_input"]
    password = request.form["password_input"]
    confirm_password = request.form["confirm_password_input"]
    if is_registered(email):
        log_message = "Email already exists"
    elif len(password) < 8:
        log_message = "Password must be at least 8 characters long"
    elif password != confirm_password:
        log_message = "Confirmed password doesn't match the original password"
    else:
        if insert_user(email, username, password):
            return redirect(url_for("render_login"))

    return render_template("base.html", page="register", log_message=log_message)
