from flask import jsonify

def get_snippets(cursor, snippet_list_id):
    try:
        query = """
            SELECT snippet_id, snippets.name, code, short_desc, full_desc, favourite, snippets.snippet_list_id
            FROM snippets
            JOIN snippet_list ON snippets.snippet_list_id = snippet_list.snippet_list_id
            WHERE snippets.snippet_list_id = 1;
        """ 
        cursor.execute(query)
        rows = cursor.fetchall()

        return jsonify({'snippet': rows}) 
    
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

        return jsonify({'snippet_list': rows}) 
    except Exception as err:
        print(f"Error: {err}")
