from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/form-api', methods=['POST'])
def form_api():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    # Тут можна додати перевірку логіна/пароля
    return jsonify({'message': f'Вітаю, {email}!'})

if __name__ == '__main__':
    app.run(debug=True) 