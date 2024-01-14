from .db import get_one_from_db
from .db import get_all_from_db
from .db import execute

def get_url_from_db(name):
    result = get_one_from_db('SELECT url FROM urls WHERE name=?', (name,))
    if result is None:
        return None
    else:
        return result[0]

def get_url_from_db_with_hit(name):
    result = get_one_from_db('SELECT url FROM urls WHERE name=?', (name,))
    if result is None:
        return None
    else:
        execute('UPDATE urls SET hits=hits+1 WHERE name=?', (name,))
        return result[0]

def create_table():
    execute('CREATE TABLE IF NOT EXISTS urls (name TEXT PRIMARY KEY, url TEXT, hits INTEGER DEFAULT 0)', ())
    
def add_url_to_db(name, url):
    execute('INSERT INTO urls (name, url) VALUES (?, ?)', (name, url))
    
def get_all_urls_from_db():
    return [ { 'name':name, 'url':url, 'hits':hits } for name, url, hits in get_all_from_db('SELECT name, url, hits FROM urls', ()) ]

def update_name_in_db(old_name, new_name):
    execute('UPDATE urls SET name=? WHERE name=?', (new_name, old_name))

def update_url_in_db(name, url):
    execute('UPDATE urls SET url=? WHERE name=?', (url, name))
    
def delete_url_from_db(name):
    execute('DELETE FROM urls WHERE name=?', (name,))