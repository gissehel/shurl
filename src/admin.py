from flask import jsonify, request
from lib.app import app
from lib.data_access import get_url_from_db
from lib.data_access import create_table
from lib.data_access import add_url_to_db
from lib.data_access import get_all_urls_from_db
from lib.data_access import update_name_in_db
from lib.data_access import update_url_in_db
from lib.data_access import delete_url_from_db
import click


@app.cli.command("init")
def init():
    create_table()
    click.echo("Initialized the database.")

@app.cli.command("add-url")
@click.argument("name")
@click.argument("url")
def add_url(name, url):
    create_table()
    get_url = get_url_from_db(name)
    if (get_url == None):
        add_url_to_db(name, url)
        click.echo("Added url to database.")
    else:
        click.echo("Name already exists in database.")
        
@app.route('/_/get-all-urls', methods=['GET'])
def get_all_urls():
    urls = get_all_urls_from_db()
    print(urls)
    if (urls != None):
        return jsonify({'urls': urls})
    else:
        return jsonify({'error': 'No urls in database'}), 404

@app.route('/_/admin-get-url/<name>', methods=['GET'])
def get_url(name):
    url = get_url_from_db(name)
    if (url != None):
        return jsonify({'name': name, 'url': url, 'ok': True})
    else:
        return jsonify({'name':name, 'error': 'Name not found', 'ok': False}), 404

@app.route('/_/add-url', methods=['POST'])
def add_url_route():
    input = request.get_json()
    name = input['name']
    url = input['url']
    add_url_to_db(name, url)
    return jsonify({'name': name, 'url': url, 'ok': True})

@app.route('/_/update-name', methods=['POST'])
def update_name():
    input = request.get_json()
    old_name = input['old_name']
    new_name = input['new_name']
    update_name_in_db(old_name, new_name)
    return jsonify({'oldName': old_name, 'newName': new_name, 'ok': True})

@app.route('/_/update-url', methods=['POST'])
def update_url():
    input = request.get_json()
    name = input['name']
    url = input['url']
    update_url_in_db(name, url)
    return jsonify({'name': name, 'url': url, 'ok': True})  

@app.route('/_/delete-url', methods=['POST'])
def delete_url():
    input = request.get_json()
    name = input['name']
    delete_url_from_db(name)
    return jsonify({'name': name, 'ok': True})

if __name__ == '__main__':
    app.run(debug=True)