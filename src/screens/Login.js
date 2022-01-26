import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Button, Center, Heading, HStack, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { auth } from '../../firebase';
import { axiosBackendInstance } from '../axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Survey');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUpNavigate = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    console.log(email, password);
    axiosBackendInstance
      .post('/login', {
        email: email,
        password: password,
      })
      .then(response => {
        console.log('response for login get', response);
        console.log('response.data.user_id', response.data.user_id);
        AsyncStorage.setItem('user_id', response.data.user_id);
        // setBars(response.data);
        // console.log(bars);
      });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <Center>
      <Heading size="4xl" pt={38}>
        🍻
      </Heading>
      <Heading size="3xl" pb={3}>
        Bar Voyage
      </Heading>
      <HStack pb={8}>
        <Text italic>Nights out have never been better</Text>
        <Text>😎</Text>
      </HStack>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login →</Text>
          </Button>
          <Button
            onPress={handleSignUpNavigate}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign up</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '80%',
    paddingTop: 40,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#2596be',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 15,
  },
  buttonOutlineText: {
    color: '#2596be',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 15,
  },
});
