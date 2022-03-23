import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useToast,
  Radio,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebase';
import { axiosBackendInstance } from '../axios';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const toast = useToast();

  const registerUser = (
    userEmail,
    userPassword,
    userFName,
    userLName,
    userGender,
    userAge,
  ) => {
    console.log(userFName, userLName, userGender, userAge);
    axiosBackendInstance
      .post('/register', {
        email: userEmail,
        password: userPassword,
        fname: userFName,
        lname: userLName,
        gender: userGender,
        age: userAge,
      })
      .then(response => {
        console.log('registerUser response', response);
        axiosBackendInstance
          .post('/login', {
            email: userEmail,
            password: userPassword,
          })
          .then(res => {
            AsyncStorage.setItem('user_id', res.data.user_id);
            AsyncStorage.setItem('user_name', res.data.fname);
            AsyncStorage.getItem('user_name').then(value => {
              console.log('user name value in sign up: ', value);
            });
            AsyncStorage.getItem('user_id').then(value => {
              console.log('user_id value IN SIGNUP', value);
            });
          });
      });
  };

  const handleSignUp = () => {
    if (fname == '' || lname == '') {
      alert('please enter a name');
    }
    if (age < 21) {
      alert('anyone under 21 should not use bar voyage!');
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          registerUser(user.email, password, fname, lname, gender, age);
          console.log(
            'Registered with:',
            user.email,
            fname,
            lname,
            gender,
            age,
          );
          toast.show({
            title: 'Account created',
            status: 'success',
            description: `Now let's get this show on the road! 🥳`,
          });
        })
        .catch(error => alert(error.message));
    }
  };

  return (
    <Center>
      <Heading size="xl">&nbsp;</Heading>
      <Heading size="2xl" pb={3}>
        Create Account
      </Heading>
      <HStack>
        <Text italic>Welcome! Bar hopping journeys await you</Text>
        <Text>🚢</Text>
      </HStack>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            value={fname}
            onChangeText={text => setFName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lname}
            onChangeText={text => setLName(text)}
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
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={text => setAge(text)}
            style={styles.input}
          />
          <Box pt={4}>
            <Radio.Group
              style={styles.radio}
              name="Gender"
              value={gender}
              onChange={nextValue => {
                setGender(nextValue);
              }}
            >
              <Radio value="F" my="1">
                Female
              </Radio>
              <Radio value="M" my="1">
                Male
              </Radio>
              <Radio value="NB" my="1">
                Nonbinary
              </Radio>
            </Radio.Group>
          </Box>
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
  radio: {
    justifyContent: 'center',
    alignItems: 'left',
  },
});
