import React, { useState } from "react";
import { ec as EC } from "elliptic";
import { derivePubKey } from "~logic/genKeyPair";
import { atom, useAtom } from "jotai";
import { keyPairsAtom } from "../logic/Atoms";
import { Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

function ImportKeys() {
  const [privKey, setPrivKey] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [username, setUsername] = useState("");
  const [keyPairs, setKeyPairs] = useAtom(keyPairsAtom);

  const handleImportKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const privKey = String(event.target.result).trim();
      setPrivKey(privKey);
      const pubKey = derivePubKey(privKey);
      setPubKey(pubKey);
    };
    reader.readAsText(file);
  };

  const handleAddToConfig = () => {
    const newKeyPairs = { ...keyPairs };
    newKeyPairs[username] = { pubKey, privKey };
    setKeyPairs(newKeyPairs);
    setUsername("");
    setPrivKey("");
    setPubKey("");
  };

  return (
    <div>
      <FormControl>
        <FormLabel htmlFor="file-upload">
        </FormLabel>
        <Button as="label" htmlFor="file-upload">
          Choose file
        </Button>
        <Input
          type="file"
          id="file-upload"
          accept=".pem"
          onChange={handleImportKey}
          display="none"
        />
      </FormControl>
      <br />
      <FormControl>
        <FormLabel htmlFor="username">
          Username
        </FormLabel>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <br />
      <FormControl>
        <FormLabel htmlFor="private-key">
          Private Key
        </FormLabel>
        <Textarea id="private-key" value={privKey} readOnly />
      </FormControl>
      {pubKey && (
        <div>
          Public Key: <code>{pubKey}</code>
        </div>
      )}
      <br /><br></br>
      <Button onClick={handleAddToConfig}>Add to keyPairs</Button>
    </div>
  );
}

export default ImportKeys;
