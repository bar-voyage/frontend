import React from 'react';
import { Button, Center, Heading, Stack } from 'native-base';
import { styles } from 'styled-system';


export const Home = ({ navigation }) => {
  return (
    <Center height="50%">
      <Heading size="md">Pages</Heading>
      <Stack
        mb="2.5"
        mt="1.5"
        direction={{
          base: "column",
          md: "row"
        }}
        space={3}
        mx={{
          base: "auto",
          md: "0",
        }}
      >
        <Button onPress={() => navigation.navigate('Idk')}>Hello world</Button>
        <Button onPress={() => navigation.navigate('Survey')}>Survey for Vibes</Button>
      </Stack>
    </Center>
  );
};
