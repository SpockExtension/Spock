export class keyPairState {
    name: string;
    publicKey: string;
    privateKey: string;
    constructor(name: string, publicKey: string, privateKey: string) {
      this.name = name;
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }

    getPublicKey() {
        return this.publicKey;
    }

    getPrivateKey() {
        return this.privateKey;
    }

    getName() {
      return this.name;
    }
  }