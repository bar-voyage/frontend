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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { axiosBackendInstance } from '../axios';

export const Survey = ({ navigation }) => {
  const [groupValues, setGroupValues] = React.useState([]);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [username, setUserName] = React.useState();

  AsyncStorage.getItem('user_name').then(value => {
    setUserName(value);
    console.log(value);
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('location in Survey.js', location);
    })();
  }, []);

  const handleSubmitUserPrefs = () => {
    AsyncStorage.getItem('user_id').then(value => {
      console.log('groupValues', groupValues);
      console.log('user_id', value);

      axiosBackendInstance
        .post('/user-pref', {
          pref: groupValues,
          user_id: value,
        })
        .then(response => {
          console.log('user pref response', response);
          navigation.navigate('Map', location);
        });
    });
  };

  return (
    <Center height="100%">
      <Heading size="xl">Hey Barb!</Heading>
      <Heading size="lg">What are the vibes for tonight?</Heading>
      <Checkbox.Group
        onChange={setGroupValues}
        value={groupValues}
        accessibilityLabel="choose numbers"
      >
        <VStack py={6}>
          <Checkbox value="karaoke" my={2}>
            <Text style={styles.checkboxText}>Karaoke 🎤</Text>
          </Checkbox>
          <Checkbox value="dive bar" my={2}>
            <Text style={styles.checkboxText}>Dive Bar 🍺</Text>
          </Checkbox>
          <Checkbox value="club" my={2}>
            <Text style={styles.checkboxText}>Club 🍾</Text>
          </Checkbox>
          <Checkbox value="sports" my={2}>
            <Text style={styles.checkboxText}>Sports 🏈</Text>
          </Checkbox>
          <Checkbox value="dancing" my={2}>
            <Text style={styles.checkboxText}>Dancing 🕺</Text>
          </Checkbox>
          <Checkbox value="lgbtq+" my={2}>
            <Text style={styles.checkboxText}>LGBTQ+ 🌈</Text>
          </Checkbox>
        </VStack>
      </Checkbox.Group>
      <Box width="80%">
        <Button onPress={handleSubmitUserPrefs}>
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
