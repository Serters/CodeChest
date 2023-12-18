import db_access as dba
import db_queries as db
# Example usage
connection = dba.connect_to_database()
cursor = connection.cursor()

if connection:
    try:
        # get_items_count(connection, "snippets", cursor)
        # Call other queries as needed
        # get_other_query(connection, "your_table_name")
        db.get_user_from_login(cursor, "demo", "demo")

    finally:
        dba.close_connection(connection, cursor)