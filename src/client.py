from flask import jsonify
from lib.app import app
from lib.data_access import get_url_from_db_with_hit

@app.route('/_/get-url/<name>', methods=['GET'])
def get_url(name):
    url = get_url_from_db_with_hit(name)
    if (url != None):
        return jsonify({'name': name, 'url': url})
    else:
        return jsonify({'name':name, 'error': 'Name not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)