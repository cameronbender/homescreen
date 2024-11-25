from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


word_bank = []

@app.route('/encrypt', methods=['POST'])
def encrypt():
    message = request.json.get('message', '')
    encrypted = ''.join(chr(ord(char) + 1) for char in message)  # Simple Caesar cipher for demo
    return jsonify({'encrypted_message': encrypted})

@app.route('/decrypt', methods=['POST'])
def decrypt():
    message = request.json.get('message', '')
    decrypted = ''.join(chr(ord(char) - 1) for char in message)  # Simple Caesar cipher for demo
    return jsonify({'decrypted_message': decrypted})

@app.route('/add_keyword', methods=['POST'])
def add_keyword():
    data = request.json
    keyword = data.get('keyword', '').strip()
    if keyword and keyword not in word_bank:
        word_bank.append(keyword)
        return jsonify({'success': True, 'message': 'Keyword added successfully'})
    return jsonify({'success': False, 'message': 'Keyword already exists or invalid'})

@app.route('/delete_keyword', methods=['POST'])
def delete_keyword():
    data = request.json
    keyword = data.get('keyword', '').strip()
    if keyword in word_bank:
        word_bank.remove(keyword)
        return jsonify({'success': True, 'message': 'Keyword deleted successfully'})
    return jsonify({'success': False, 'message': 'Keyword not found'})
@app.route('/')
def index():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)