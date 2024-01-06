import sqlite3
import threading

connections = {}

def get_current_connection():
    thread_id = threading.get_ident()
    if thread_id not in connections:
        connections[thread_id] = sqlite3.connect('database.db')
    return connections[thread_id]

def get_all_from_db(query, params):
    connection = get_current_connection()
    with connection:
        cursor = connection.cursor()
        cursor.execute(query, params)
        result = cursor.fetchall()
        cursor.close()
        connection.commit()
        return result

def get_one_from_db(query, params):
    connection = get_current_connection()
    with connection:
        cursor = connection.cursor()
        cursor.execute(query, params)
        result = cursor.fetchone()
        cursor.close()
        connection.commit()
        return result

def execute(query, params):
    connection = get_current_connection()
    with connection:
        cursor = connection.cursor()
        cursor.execute(query, params)
        cursor.close()
        connection.commit()
            