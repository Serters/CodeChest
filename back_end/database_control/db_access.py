import mysql.connector

def connect_to_database(db_config):
    try:
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
