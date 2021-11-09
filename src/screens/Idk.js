import React from 'react';
import { Box, Center, Icon, IconButton, NativeBaseProvider } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export const Idk = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box>Tap for a surprise ;) </Box>
        <IconButton
          icon={<Icon as={Entypo} name="emoji-happy" />}
          borderRadius="full"
          _icon={{
            color: 'orange.500',
            size: '2xl',
          }}
          _hover={{
            bg: 'orange.600:alpha.20,',
          }}
          _pressed={{
            bg: 'orange.600:alpha.20',
            _icon: {
              name: 'emoji-flirt',
              size: '2xl',
            },
          }}
          _ios={{
            _icon: {
              size: '2xl',
            },
          }}
        />
      </Center>
    </NativeBaseProvider>
  );
};
