const axios = require('axios');
const EC = require('elliptic').ec;

const base_uri = 'http://localhost:3000';

function generateECDSAKeyPair() {
    const ec = new EC('secp256k1');
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');
    return { publicKey, privateKey };
}

function signMessage(message, privateKey) {
  const ec = new EC('ed25519');
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const signature = key.sign(message).toDER('hex');
  return signature;
}

async function validateMessage(message, signature, publicKey) {
  const url = `${base_uri}/${publicKey}/${message}/${signature}`;

  try {
    const response = await axios.get(url);
    return response.data.isValid;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function signAndValidateMessage(message, privateKey, pubKey) {
  const signature = await signMessage(message, privateKey);
  return validateMessage(message, signature, pubKey);
}

function derivePubKey(privateKey) {
  const ec = new EC('ed25519');
  const key = ec.keyFromPrivate(privateKey);
  return key.getPublic().encode('hex');
}

// generateECDSAKeyPair().then(keyPair => {
//   const private = "add33c663a934479e5f7af2f678b18d303fc30f82b45096d4cfae37811c3b41"
//   const publicKey = derivePubKey(private);
//   const message = 'Hello world!';
//   signMessage(message, privateKey).then(signature => {
//     console.log(`Signature: ${signature}`);
//     validateMessage(message, signature, publicKey).then(isValid => {
//       console.log(`Is valid: ${isValid}`);
//     });
//   } );
// });


module.exports = {
  generateECDSAKeyPair,
  signMessage,
  validateMessage,
  signAndValidateMessage,
  derivePubKey
}
