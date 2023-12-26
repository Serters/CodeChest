from flask import Flask, jsonify, request


def get_snippets(cursor, snippet_list_id):
    try:
        query = """
            SELECT snippet_id, snippets.name, code, short_desc, full_desc, favourite, snippets.snippet_list_id
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

        return jsonify({"snippet": snippet_list})

    except Exception as err:
        print(f"Error: {err}")


def get_snippet_list(cursor, user_id):
    try:
        query = """
            SELECT snippet_list.snippet_list_id, max_storage, user_id, COUNT(snippets.snippet_id)
            FROM snippet_list
            JOIN snippets ON snippets.snippet_list_id = snippet_list.snippet_list_id
            WHERE snippet_list.user_id = 1;
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        return jsonify({"snippet_list": rows})
    except Exception as err:
        print(f"Error: {err}")


def get_snippet(cursor, user_id, snippet_id):
    try:
        query = """
            SELECT snippet_id, name, code, short_desc, full_desc, favourite, snippets.snippet_list_id
            FROM snippets
            NATURAL JOIN snippet_list
            WHERE user_id = %s AND snippet_id = %s;
        """
        cursor.execute(query, (user_id, snippet_id))
        rows = cursor.fetchall()

        columns = [desc[0] for desc in cursor.description]

        snippet = [dict(zip(columns, row)) for row in rows]

        return jsonify({"snippet": snippet})

    except Exception as err:
        print(f"Error: {err}")

def insert_row(connection, cursor):
    try:
        # Get data from the request
        data = request.get_json()
        
        # Insert the new row into the table
        query = '''
            INSERT INTO snippets
            (name, code, short_desc, full_desc, favourite, snippet_list_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        '''
        values = (
            data.get('name'),
            data.get('code'),
            data.get('short_desc'),
            data.get('full_desc'),
            data.get('favourite', 0),  # Default to 0 if not provided
            data.get('snippet_list_id', 1),  # Default to 1 if not provided
        )
        cursor.execute(query, values)
        connection.commit()

        return jsonify({'status': 'success', 'message': 'Row inserted successfully'})

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
