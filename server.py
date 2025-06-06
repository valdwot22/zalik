from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/form-api', methods=['POST'])
def form_api():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if email and password:
        return jsonify({'status': 'OK'})
    else:
        return jsonify({'status': 'fail'})

if __name__ == '__main__':
    app.run(debug=True) 