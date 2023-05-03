import { useState } from 'react';
import { useAtom } from 'jotai';
import { passwordAtom } from '~logic/Atoms';
import { Button, Input, useToast } from "@chakra-ui/react";

function PasswordModal({ onPasswordMatch }) {
  const [passState, setPassState] = useState('');
  const [password] = useAtom(passwordAtom);
  const toast = useToast();

  const handleSubmit = () => {
    if (passState === password) {
      onPasswordMatch();
      toast({
        title: "Password Matched.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Password does not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Input background="white" border="none" type="password" value={passState} onChange={(e) => setPassState(e.target.value)} placeholder="Enter Password" marginBottom="1"/>
      <Button color = "white" backgroundColor = "#575757" left="30%" onClick={handleSubmit}>Submit</Button>
    </>
  );
}

export default PasswordModal;
