import { useState, useEffect } from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

function HeaderChecker() {
  const [usesSpock, setUsesSpock] = useState(false);

  useEffect(() => {
    fetch(window.location.href, {
      method: 'HEAD',
    })
      .then((response) => {
        const usesSpockHeader = response.headers.get('usesSpock');
        
        setUsesSpock(usesSpockHeader === 'True');
      })
      .catch((error) => {
        console.error(error);
        setUsesSpock(false);
      });
  }, []);

  return (
    <Box display="flex" alignItems="center">
      {usesSpock ? <CheckIcon color="green.500" /> : <CloseIcon color="red.500" />}
      <Box marginLeft="2">{usesSpock ? 'Uses Spock' : 'Does not use Spock'}</Box>
    </Box>
  );
}

export default HeaderChecker;
