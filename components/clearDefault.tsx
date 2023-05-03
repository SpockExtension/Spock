import React from "react";
import { useAtom } from "jotai";
import { keyPairDefaultAtom } from "../logic/Atoms";
import { Button } from '@chakra-ui/button';

function ClearDefaultButton() {
  const [keyPairDefault, setKeyPairDefault] = useAtom(keyPairDefaultAtom);

  function handleClick() {
    setKeyPairDefault(null);
  }

  return (
    <Button onClick={handleClick}>Clear Default</Button>
  );
}

export default ClearDefaultButton;