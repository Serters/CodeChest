from flask import Flask
from flask_cors import CORS
import back_end.database_control.db_access as dba
import back_end.database_control.db_queries as dbq
import back_end.database_control.db_secret as dbs

app = Flask(__name__)
CORS(app)

connection = dba.connect_to_database(dbs.db_login)
cursor = connection.cursor()

@app.route('/snippets')
def snippets():
    return dbq.get_snippets(cursor, 1)

@app.route('/snippet_list')
def snippet_list():
    return dbq.get_snippet_list(cursor, 1)

if __name__ == '__main__':
    app.run(debug=True)
