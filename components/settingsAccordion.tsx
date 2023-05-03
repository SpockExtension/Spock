import { useState } from 'react';
import EcdsaKeyGenerator from './generateKeys';
import ImportKeys from './importKeys';
import ManageKeys from './manageKeys';
import { useStorage } from '@plasmohq/storage/hook';
import SpockConfigExporter from './exportConfig';
import ClearDefaultButton from './clearDefault';
import { Box, Button, Collapse, Heading, Icon, Text, Flex } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SpockConfigImporter from './importConfig';
import SetPassword from './setPassword';

function HBurg() {
  const [isManageKeysOpen, setIsManageKeysOpen] = useState(false);
  const [isImportKeysOpen, setIsImportKeysOpen] = useState(false);
  const [isGenerateKeysOpen, setIsGenerateKeysOpen] = useState(false);
  const [defPubKey] = useStorage('defPubKey');

  const toggleManageKeys = () => {
    setIsManageKeysOpen(!isManageKeysOpen);
    setIsImportKeysOpen(false);
    setIsGenerateKeysOpen(false);
  };

  const toggleImportKeys = () => {
    setIsImportKeysOpen(!isImportKeysOpen);
    setIsManageKeysOpen(false);
    setIsGenerateKeysOpen(false);
    console.log(defPubKey);
  };

  const toggleGenerateKeys = () => {
    setIsGenerateKeysOpen(!isGenerateKeysOpen);
    setIsManageKeysOpen(false);
    setIsImportKeysOpen(false);
  };

  return (
    <Box mt={6} maxW="xl" mx="auto">
      <Box mb={6}>
        <Button size="md" onClick={toggleManageKeys} leftIcon={<Icon as={isManageKeysOpen ? FaChevronUp : FaChevronDown} />}>
          Manage Keys
        </Button>
        <Collapse in={isManageKeysOpen}>
          <Box border="1px solid" borderColor="gray.200" rounded="md" p={4}>
            <ManageKeys />
          </Box>
        </Collapse>
      </Box>
      <Box mb={6}>
        <Button size="md" onClick={toggleImportKeys} leftIcon={<Icon as={isImportKeysOpen ? FaChevronUp : FaChevronDown} />}>
          Import Keys
        </Button>
        <Collapse in={isImportKeysOpen}>
          <ImportKeys />
        </Collapse>
      </Box>
      <Box mb={6}>
        <Button size="md" onClick={toggleGenerateKeys} leftIcon={<Icon as={isGenerateKeysOpen ? FaChevronUp : FaChevronDown} />}>
          Generate Keys
        </Button>
        <Collapse in={isGenerateKeysOpen}>
          <EcdsaKeyGenerator />
        </Collapse>
      </Box>
      <Box><SpockConfigImporter /></Box><br></br>
      <Box><SpockConfigExporter /></Box><br></br>
      <ClearDefaultButton />
      <SetPassword/>
    </Box>
  );
}

export default HBurg;
