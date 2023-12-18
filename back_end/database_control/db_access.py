import mysql.connector
from back_end.database_control.secret import db_secret

def connect_to_database():
    # Replace these temporary values with your actual database credentials
    db_config = db_secret
    try:
        # Establish a connection to the database
        connection = mysql.connector.connect(**db_config)

        if connection.is_connected():
            print("Connected to the database")
            return connection

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def close_connection(connection, cursor):
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
