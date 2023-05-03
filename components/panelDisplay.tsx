import React from "react";
import { useAtom } from "jotai";
import { keyPairsAtom, keyPairDefaultAtom } from "../logic/Atoms";
import { keyPairState } from "~types";
import { Box, Heading, Text } from "@chakra-ui/react";

function DefaultKeyPair() {
  const [keyPairs, setKeyPairs] = useAtom(keyPairsAtom);
  const [keyPairDefault, setKeyPairDefault] = useAtom(keyPairDefaultAtom);

  const getDefaultKeyPair = () => {
    if (keyPairDefault && keyPairs[keyPairDefault]) {
      const { pubKey } = keyPairs[keyPairDefault];
      const username = keyPairDefault.slice(0, 4) + (keyPairDefault.length > 10 ? "..." : "") + keyPairDefault.slice(-4);
      return (
        <Box>
          <Heading as="h2" fontSize="xl" mb={4}>
            Default Key Pair
          </Heading>
          <Text fontSize="md" mb={2}>
            Username: {username}
          </Text>
          <Text fontSize="md">
            Public Key: {pubKey.slice(0, 10) + (pubKey.length > 10 ? "..." : "")}
          </Text>
        </Box>
      );
    } else {
      return (
        <Box>
          <Heading as="h2" fontSize="xl" mb={4}>
          </Heading>
        </Box>
      );
    }
  };

  return getDefaultKeyPair();
}

export default DefaultKeyPair;
