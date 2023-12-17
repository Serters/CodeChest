def get_table(table_name, cursor):
    try:
        # Execute a query to get all items in the specified table
        query = f"SELECT * FROM {table_name};"
        cursor.execute(query)
        output = cursor.fetchall()

        # Print the table data
        print(f"Items in '{table_name}':")
        #print(output)
        for row in output:
            print(row)

    except Exception as err:
        print(f"Error: {err}")

def get_user_from_login(cursor, username, password):
    try:
        # Execute a query to get the user from the specified table based on login credentials
        query = f"SELECT * FROM users WHERE username = %s AND password = %s;"
        cursor.execute(query, (username, password))
        output = cursor.fetchone()

        if output:
            # Print the user data
            print(f"User found in users for username='{username}' and password='{password}':")
            print(output)
        else:
            print(f"No user found for the given credentials.")

    except Exception as err:
        print(f"Error: {err}")

# Example usage:
# Assuming you have a connection and cursor already established, you can call the function like this:
# get_user_by_credentials("users", your_cursor, "input_username", "input_password")


#SELECT * FROM users WHERE username = input AND password = input