import React from 'react';
import { Button, Center } from 'native-base';

export const Home = ({ navigation }) => {
  return (
    <Center height="100%">
      <Button onPress={() => navigation.navigate('Idk')}>Hello world</Button>
    </Center>
  );
};
