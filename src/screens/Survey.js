import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Checkbox,
  Center,
  Button,
  Heading,
  Text,
  VStack,
} from 'native-base';

export const Survey = ({ navigation }) => {
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <Center height="100%">
      <Heading size="lg">What are the vibes for tonight?</Heading>
      <Checkbox.Group
        onChange={setGroupValues}
        value={groupValues}
        accessibilityLabel="choose numbers"
      >
        <VStack py={6}>
          <Checkbox value="1" my={2}>
            <Text style={styles.checkboxText}>Karaoke 🎤</Text>
          </Checkbox>
          <Checkbox value="2" my={2}>
            <Text style={styles.checkboxText}>Dive Bar 🍺</Text>
          </Checkbox>
          <Checkbox value="3" my={2}>
            <Text style={styles.checkboxText}>Club 🍾</Text>
          </Checkbox>
          <Checkbox value="4" my={2}>
            <Text style={styles.checkboxText}>Sports 🏈</Text>
          </Checkbox>
          <Checkbox value="5" my={2}>
            <Text style={styles.checkboxText}>Dancing 🕺</Text>
          </Checkbox>
          <Checkbox value="6" my={2}>
            <Text style={styles.checkboxText}>LGBTQ+ 🌈</Text>
          </Checkbox>
        </VStack>
      </Checkbox.Group>
      <Box width="80%">
        <Button onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>Next →</Text>
        </Button>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  checkboxText: {
    fontSize: 32,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
  },
});
