from flask import Flask, jsonify, request
from flask_cors import CORS
import back_end.database_control.db_access as dba
import back_end.database_control.db_queries as dbq
import back_end.database_control.db_secret as dbs

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})
# ORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app, origins="http://127.0.0.1:3000", resources={r"/snippets/*": {"origins": "*"}})

connection = dba.connect_to_database(dbs.db_login)
cursor = connection.cursor()


@app.route("/")
def home():
    return "cats"


@app.route("/snippets", methods=["GET"])
def snippets():
    return dbq.get_snippets(cursor, 1)


@app.route("/snippet_list", methods=["GET"])
def snippet_list():
    return dbq.get_snippet_list(cursor, 1)


@app.route("/insert_row", methods=["POST", "GET"])
def create_new_snippet():
    return dbq.insert_row(connection, cursor)


@app.route("/snippets/<int:user_id>/<int:snippet_id>", methods=["GET"])
def get_snippet_route(user_id, snippet_id):
    try:
        result = dbq.get_snippet(cursor, user_id, snippet_id)
        return result
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
    dba.close_connection(connection, cursor)
