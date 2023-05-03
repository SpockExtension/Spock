from flask import Flask, request, jsonify
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
import base64

app = Flask(__name__)

# Endpoint to generate a public key and private key pair
@app.route('/generate_keys', methods=['GET'])
def generate_keys():
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return jsonify({
        'private_key': private_key.decode('utf-8'),
        'public_key': public_key.decode('utf-8')
    })

# Endpoint to sign a message with a private key
@app.route('/sign_message', methods=['POST'])
def sign_message():
    private_key = request.json['private_key']
    message = request.json['message']
    key = RSA.import_key(private_key)
    h = SHA256.new(message.encode('utf-8'))
    signature = PKCS1_v1_5.new(key).sign(h)
    return jsonify({
        'signature': base64.b64encode(signature).decode('utf-8')
    })

# Endpoint to validate a message with a public key and signature
@app.route('/validate_message', methods=['POST'])
def validate_message():
    public_key = request.json['public_key']
    message = request.json['message']
    signature = base64.b64decode(request.json['signature'])
    key = RSA.import_key(public_key)
    h = SHA256.new(message.encode('utf-8'))
    verifier = PKCS1_v1_5.new(key)
    if verifier.verify(h, signature):
        return jsonify({'valid': True})
    else:
        return jsonify({'valid': False})

if __name__ == '__main__':
    app.run(debug=True)
