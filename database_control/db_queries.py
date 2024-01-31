from flask import jsonify, request
import database_control.db_access as dba
import database_control.db_secret as dbs

import time


def get_snippets(snippet_list_id):
    try:
        time.sleep(0.5)

        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT snippet_id, snippets.name, code, short_desc, full_desc, favourite, tags, snippets.snippet_list_id
            FROM snippets
            JOIN snippet_list ON snippets.snippet_list_id = snippet_list.snippet_list_id
            WHERE snippets.snippet_list_id = %s;
        """
        cursor.execute(query, (snippet_list_id,))
        rows = cursor.fetchall()

        # Get column names from cursor description
        columns = [desc[0] for desc in cursor.description]

        # Create a list of dictionaries
        snippet_list = [dict(zip(columns, row)) for row in rows]

        dba.close_connection(connection, cursor)

        return jsonify({"snippet": snippet_list})

    except Exception as err:
        print(f"Error: {err}")


def get_snippet_list(user_id):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT snippet_list.snippet_list_id, max_storage, user_id, COUNT(snippets.snippet_id)
            FROM snippet_list
            JOIN snippets ON snippets.snippet_list_id = snippet_list.snippet_list_id
            WHERE snippet_list.user_id = 1;
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        dba.close_connection(connection, cursor)
        return jsonify({"snippet_list": rows})
    except Exception as err:
        print(f"Error: {err}")


def get_snippet(user_id, snippet_id):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT snippet_id, name, code, short_desc, full_desc, favourite, tags, snippets.snippet_list_id
            FROM snippets
            NATURAL JOIN snippet_list
            WHERE user_id = %s AND snippet_id = %s;
        """
        cursor.execute(query, (user_id, snippet_id))
        rows = cursor.fetchall()

        columns = [desc[0] for desc in cursor.description]

        snippet = [dict(zip(columns, row)) for row in rows]
        dba.close_connection(connection, cursor)
        return jsonify({"snippet": snippet})

    except Exception as err:
        print(f"Error: {err}")


def insert_row():
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()
        # Get data from the request
        data = request.get_json()

        # Insert the new row into the table
        query = """
            INSERT INTO snippets
            (name, code, short_desc, full_desc, favourite, snippet_list_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (
            data.get("name"),
            data.get("code"),
            data.get("short_desc"),
            data.get("full_desc"),
            data.get("favourite", 0),  # Default to 0 if not provided
            data.get("snippet_list_id", 1),  # Default to 1 if not provided
        )
        cursor.execute(query, values)
        connection.commit()
        dba.close_connection(connection, cursor)
        return jsonify({"status": "success", "message": "Row inserted successfully"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


def update_row(snippet_id):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()
        data = request.get_json()

        query = """
            UPDATE snippets
            SET name = %s,
                code = %s,
                short_desc = %s,
                full_desc = %s,
                favourite = %s,
                tags = %s,
                snippet_list_id = %s
            WHERE snippet_id = %s
        """
        values = (
            data.get("name"),
            data.get("code"),
            data.get("short_desc"),
            data.get("full_desc"),
            data.get("favourite", 0),
            data.get("tags", ""),
            data.get("snippet_list_id", 1),
            snippet_id,
        )
        cursor.execute(query, values)
        connection.commit()
        dba.close_connection(connection, cursor)
        return jsonify(
            {
                "status": "success",
                "message": f"Row with snippet_id {snippet_id} updated successfully",
            }
        )

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


def login(email, password):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT *
            FROM users
            WHERE email = %s AND password = %s;
        """

        cursor.execute(query, (email, password))
        user = cursor.fetchone()
        connection.commit()
        dba.close_connection(connection, cursor)

        return user

    except Exception as err:
        print(f"Error: {err}")


def get_user(email):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT user_id, username, email, profile_picture
            FROM users
            WHERE email = %s;
        """

        cursor.execute(query, (email,))
        user = cursor.fetchone()
        connection.commit()
        dba.close_connection(connection, cursor)

        return {"user": user}

    except Exception as err:
        print(f"Error: {err}")


def delete_row(snippet_id):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            DELETE FROM snippets
            WHERE snippet_id = %s;
        """

        cursor.execute(query, (snippet_id,))
        connection.commit()
        dba.close_connection(connection, cursor)

        return jsonify(
            {
                "status": "success",
                "message": f"Row with snippet_id {snippet_id} deleted successfully",
            }
        )

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


def update_password(new_password, user_id):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            UPDATE users
            SET password = %s
            WHERE user_id = %s
        """
        values = (new_password, user_id)
        cursor.execute(query, values)
        connection.commit()
        dba.close_connection(connection, cursor)
        return jsonify(
            {
                "status": "success",
                "message": "Password updated successfully",
            }
        )

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


def get_user_password(email):
    try:
        connection = dba.connect_to_database(dbs.db_login)
        cursor = connection.cursor()

        query = """
            SELECT password
            FROM users
            WHERE email = %s;
        """

        cursor.execute(query, (email,))
        password = cursor.fetchone()
        connection.commit()
        dba.close_connection(connection, cursor)

        return {"password": password}

    except Exception as err:
        print(f"Error: {err}")
