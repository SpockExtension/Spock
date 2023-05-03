import React, { useState } from 'react';
import { ec as EC } from 'elliptic';
import { atom, useAtom } from 'jotai';
import { keyPairsAtom } from '../logic/Atoms';
import { generateECDSAKeyPair } from '~logic/genKeyPair';
import { FaDownload, FaCopy } from 'react-icons/fa';
import { Storage } from '@plasmohq/storage';
import { Button, Input, Stack, Text } from '@chakra-ui/react';

function EcdsaKeyGenerator() {
  const [username, setUsername] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [privKey, setPrivKey] = useState('');

  const [keyPairs, setKeyPairs] = useAtom(keyPairsAtom);

  const handleGenerateKeys = () => {
    const secret = '';
    const { publicKey, privateKey } = generateECDSAKeyPair();
    setPubKey(publicKey);
    setPrivKey(privateKey);
  };

  const handleDownloadKeys = () => {
    const element = document.createElement('a');
    const file = new Blob([`-----BEGIN PRIVATE KEY-----\n${privKey}\n-----END PRIVATE KEY-----`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'keys.pem';
    document.body.appendChild(element);
    element.click();
  };

  const handleCopyKeys = () => {
    navigator.clipboard.writeText(privKey);
  };

  const handleAddToConfig = () => {
    const newKeyPairs = { ...keyPairs };
    newKeyPairs[username] = { pubKey, privKey };
    setKeyPairs(newKeyPairs);
    // console log the atom
    console.log(newKeyPairs);
    setUsername('');
    setPubKey('');
    setPrivKey('');
  };

  return (
    <Stack spacing={4}>
      <br></br>
      <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <Button onClick={handleGenerateKeys}>Generate Keys</Button>
      {pubKey && (
        <Text>
          Public Key: {pubKey}
        </Text>
      )}
      {privKey && (
        <Text>
          Private Key: {privKey}
        </Text>
      )}
      {pubKey && privKey && username && (
        <Button onClick={handleAddToConfig}>Add Key to Configuration</Button>
      )}
    </Stack>
  );
}

export default EcdsaKeyGenerator;
