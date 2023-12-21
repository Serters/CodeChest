from flask import Flask, jsonify
from flask_cors import CORS
import back_end.database_control.db_access as dba
import back_end.database_control.db_queries as dbq
import back_end.database_control.db_secret as dbs

app = Flask(__name__)
CORS(app)

connection = dba.connect_to_database(dbs.db_login)
cursor = connection.cursor()


@app.route("/")
def home():
    return "cats"


@app.route("/snippets")
def snippets():
    return dbq.get_snippets(cursor, 1)


@app.route("/snippet_list")
def snippet_list():
    return dbq.get_snippet_list(cursor, 1)


@app.route("/snippets/<int:user_id>/<int:snippet_id>")
def get_snippet_route(user_id, snippet_id):
    try:
        result = dbq.get_snippet(cursor, user_id, snippet_id)
        return result
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
