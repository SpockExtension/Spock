import React from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { saveAs } from 'file-saver';
import { Button } from '@chakra-ui/react';

export const keyPairsAtom = atomWithStorage('keyPairs', []);

const SpockConfigExporter = () => {
  const [keyPairs] = useAtom(keyPairsAtom);

  const handleExportSpockConfig = () => {
    const json = JSON.stringify(keyPairs, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    saveAs(url, 'spock.config.json');

    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExportSpockConfig}>
      Export Spock Config
    </Button>
  );
};

export default SpockConfigExporter;
