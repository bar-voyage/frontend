import React from 'react';
import { Button, Center, Heading, HStack, Text } from 'native-base';

export const Home = ({ navigation }) => (
  <Center height="100%">
    <Heading size="3xl">🍻</Heading>
    <Heading size="xl" pb={1}>
      Bar Voyage
    </Heading>
    <HStack pb={8}>
      <Text italic>Nights out have never been better</Text>
      <Text>😎</Text>
    </HStack>
    <Button onPress={() => navigation.navigate('Survey')}>Get started →</Button>
  </Center>
);
