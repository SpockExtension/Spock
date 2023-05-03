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

async function get_random_nonce() {
  const url = `${base_uri}/nonce`;
  try {
    const response = await axios.get(url);
    return response.data.nonce;
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

module.exports = {
  generateECDSAKeyPair,
  signMessage,
  validateMessage,
  signAndValidateMessage,
  derivePubKey,
  get_random_nonce
}
