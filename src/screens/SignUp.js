import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Button, Center, Heading, HStack, Text, useToast } from 'native-base';
import { auth } from '../../firebase';
import { axiosBackendInstance } from '../axios';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  const registerUser = (userEmail, userPassword) => {
    axiosBackendInstance
      .post('/register', {
        email: userEmail,
        password: userPassword,
      })
      .then(response => {
        console.log('registerUser response', response);
      });
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        registerUser(user.email, password);
        console.log('Registered with:', user.email);
        toast.show({
          title: 'Account created',
          status: 'success',
          description: `Now let's get this show on the road! 🥳`,
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <Center>
      <Heading size="4xl" pt={38}>
        &nbsp;
      </Heading>
      <Heading size="2xl" pb={3}>
        Create Account
      </Heading>
      <HStack pb={8}>
        <Text italic>Welcome! Bar hopping journeys await you</Text>
        <Text>🚢</Text>
      </HStack>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
          />
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
          <Button onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 15,
  },
});
