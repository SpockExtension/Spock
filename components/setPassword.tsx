import React from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { saveAs } from 'file-saver';
import { Button, Input } from '@chakra-ui/react';
import { passwordAtom } from '~logic/Atoms';
import { useState } from 'react';

const SetPassword = () => {
  const [, setPassword] = useAtom(passwordAtom);
  const [passwordState, setPasswordState] = useState('');

  const handleSetPassword = () => {
    setPassword(passwordState);
  };

  return (
    <div>
      <Input type="password" value={passwordState} onChange={(e) => setPasswordState(e.target.value)} placeholder="Enter New Password" />
      <Button onClick={handleSetPassword}>
          Set Password
      </Button>
    </div>
  );
};

export default SetPassword;
