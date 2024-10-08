import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export const withChakraUi = Story => (
  <ChakraProvider>
    <Story />
  </ChakraProvider>
);