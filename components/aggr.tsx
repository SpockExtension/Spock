import React, { useState } from 'react';
import { generateECDSAKeyPair, signMessage } from '~logic/genKeyPair';
import { useStorage } from '@plasmohq/storage/hook';
import DefaultKeyPair from '~components/panelDisplay';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import Hburg from '~components/settingsAccordion';
import SignButton from '~components/signButton';
import ClearDefaultButton from '~components/clearDefault';
import LogOut from '~components/logoutHandler';
import { Box, Center, Heading, Input, Text, VStack } from '@chakra-ui/react';
import HeaderChecker from '~components/usesSpock';

function SignMessage() {
  const [inputValue, setInputValue] = useState('');
  const [defPubKey] = useStorage<string>('defPubKey');
  const [isHburgOpen, setIsHburgOpen] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleHburgToggle = () => {
    setIsHburgOpen((prevState) => !prevState);
  };

  return (
    <Box maxW="xl" mx="auto" py={6}>
      <VStack spacing={6} align="stretch">
        <LogOut />
        <ClearDefaultButton />
        <Box bg="white" border="1px solid" borderColor="gray.200" p={6} rounded="md">
          <DefaultKeyPair />
          <SignButton />
        </Box>
        <Box>
          <Button
            onClick={handleHburgToggle}
            leftIcon={isHburgOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            variant="link"
            size="sm"
          >
            Settings
          </Button>
          <Collapse in={isHburgOpen}>
            <Hburg />
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
}

export default SignMessage;
