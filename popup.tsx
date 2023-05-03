import { ChakraProvider, Flex } from "@chakra-ui/react";
import SignMessage from "~components/aggr";
import PasswordModal from "~components/Lock";
import "~styling/blur.css";
import { useState } from 'react';

function App() {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handlePasswordMatch = () => {
    setIsPasswordCorrect(true);
  };

  return (
    <ChakraProvider>
      <Flex display={isPasswordCorrect ? "none" : "inline"} position="absolute" top="40%" left="5%" zIndex="99">
        <PasswordModal onPasswordMatch={handlePasswordMatch} />
      </Flex>
      <div className={isPasswordCorrect ? "" : "blur"}>
        <div style={{ padding: "50px" }}>
          <SignMessage />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
