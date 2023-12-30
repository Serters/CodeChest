from flask import Flask, jsonify
from flask_cors import CORS
import database_control.db_queries as dbq


app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)


@app.route("/")
def home():
    return "cats"


@app.route("/snippets", methods=["GET"])
def snippets():
    return dbq.get_snippets(1)


@app.route("/snippet_list", methods=["GET"])
def snippet_list():
    return dbq.get_snippet_list( 1)


@app.route("/insert_row", methods=["POST"])
def create_new_snippet():
    return dbq.insert_row()


@app.route("/snippets/<int:user_id>/<int:snippet_id>", methods=["GET"])
def get_snippet_route(user_id, snippet_id):
    try:
        result = dbq.get_snippet(user_id, snippet_id)
        return result
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route("/snippets/<int:user_id>/<int:snippet_id>", methods=["PUT"])
def update_snippet_route(user_id, snippet_id):
    try:
        result = dbq.update_row(snippet_id)
        return result
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
