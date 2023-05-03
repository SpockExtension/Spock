import { firebase } from './Firebase';

function addUser(username, pubkey, nonce) {
  const userRef = firebase.firestore().collection('users');
  userRef.doc(pubkey).set({
    username: username,
    pubkey: pubkey
  })
}

export { addUser };