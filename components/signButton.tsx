import React from 'react';
import { useAtom } from 'jotai';
import { keyPairDefaultAtom, keyPairsAtom } from '../logic/Atoms';
import { signMessage } from '~logic/genKeyPair';
import type DefaultKeyPair from './panelDisplay';
import { Button, ButtonProps, chakra } from '@chakra-ui/react';

const MyButton = chakra(Button, {
  baseStyle: {
    filter: 'grayscale(100%)',
    _hover: {
      filter: 'grayscale(0%)',
    },
    _active: {
      filter: 'grayscale(0%)',
    },
  },
});

function MyComponent() {
  const [keyPairs, setKeyPairs] = useAtom(keyPairsAtom);
  const [keyPairDefault, setKeyPairDefault] = useAtom(keyPairDefaultAtom);

  const generateCookieString = (payload) => {
    const keyPairsVar = keyPairs[keyPairDefault];
    const privKey = keyPairsVar.privKey;
    const username = keyPairDefault;
    const signature = signMessage(privKey, JSON.stringify(payload));
    return JSON.stringify({
      username,
      signature,
    });
  };

  const handleClick = () => {
    const payload = {}; // add your actual payload here
    const cookieString = generateCookieString(payload);
    console.log(cookieString);

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;

        if (chrome.cookies) {
          chrome.cookies.set(
            {
              url: url,
              name: 'spock_request_cookie',
              value: cookieString,
            },
            (cookie) => {
              console.log('Cookie created', cookie);
            }
          );
        } else {
          console.warn(
            'This code must be run in an extension with cookie permissions'
          );
        }
      });
    }
  };

  return (
    <MyButton onClick={handleClick} size="lg">
      {keyPairDefault ? `Sign in for ${keyPairDefault}` : "Please select a key pair"}
    </MyButton>
  );
}

export default MyComponent;
