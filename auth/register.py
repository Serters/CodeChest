from flask import Flask, jsonify, render_template, request, url_for, redirect, session
from flask_cors import CORS
from flask_session import Session
import database_control.db_queries as dbq

def is_registered(email):
    return False

def insert_user(email, username, password):
    pass

def already_registered():
    pass

def check_password():
    pass

def register_post():
    if request.method == 'POST':
        email = request.form['email_input']
        username = request.form['username_input']
        password = request.form['password_input']
        confirm_password = request.form['confirm_password_input']
        if(is_registered(email)):
            already_registered()
        else:
            if(check_password(password, confirm_password)):
                return insert_user(email, username, password)
    
                
        


