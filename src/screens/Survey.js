import React from 'react';
import { Checkbox, Center, Button, Heading, HStack, VStack } from 'native-base';

export const Survey = ({ navigation }) => {
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <Center height="50%">
      <Heading size="md" pb={4}>
        What are the vibes for tonight?
      </Heading>
      <Checkbox.Group
        onChange={setGroupValues}
        value={groupValues}
        accessibilityLabel="choose numbers"
      >
        <HStack pb={4}>
          <VStack pr={4}>
            <Checkbox value="1" my={1}>
              Karaoke 🎤
            </Checkbox>
            <Checkbox value="2" my={1}>
              Dive Bar 🍺
            </Checkbox>
            <Checkbox value="3" my={1}>
              Club 🍾
            </Checkbox>
          </VStack>
          <VStack pl={4}>
            <Checkbox value="4" my={1}>
              Sports 🏈
            </Checkbox>
            <Checkbox value="5" my={1}>
              Dancing 🕺
            </Checkbox>
            <Checkbox value="6" my={1}>
              LGBTQ+ 🌈
            </Checkbox>
          </VStack>
        </HStack>
      </Checkbox.Group>

      <Button onPress={() =>
        navigation.navigate('Map')}>Next</Button>
    </Center >
  );
};
