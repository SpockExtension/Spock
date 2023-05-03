const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const EC = require('elliptic').ec;

// Initialize the app
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Route for signature verification
app.post('/verify-signature', (req, res) => {
  const { message, signature, publicKey } = req.body;
  const ec = new EC('secp256k1');

  // Create a key pair from the public key
  const key = ec.keyFromPublic(publicKey, 'hex');

  // Verify the signature
  const verified = key.verify(message, signature);

  if (verified) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
