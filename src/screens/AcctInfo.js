import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image, useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AcctInfoCard } from '../components/AcctInfoCard';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
    SafeAreaView,
    Text,
    StatusBar
} from 'react-native';
import { Button, Center, HStack, VStack } from 'native-base';
import { auth } from '../../firebase';
import { axiosBackendInstance } from '../axios';
import firebase from '@firebase/app';
import '@firebase/auth';
import { borderLeft } from 'styled-system';





export const AcctInfo = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [current_password, setCurrentPassword] = useState('');
    const toast = useToast();



    const reauthenticate = (currentPassword) => {
        var user = auth.currentUser;

        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);

        return user.reauthenticateWithCredential(cred);
    }

    const update_values = () => {
        if (email == '' && password == '') {
            alert('Nothing to be Changed')
        } else {
            if (email != '') {
                changeEmail(current_password, email);
                console.log('update_values email:', email);
            }

            if (password != '') {
                changePassword(current_password, password);
                console.log('update_values password:', password);
            }

        }


    }


    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
                toast.show({
                    title: 'Changes Submitted',
                    status: 'success',
                    description: `You've changed your information!`,
                });
            }).catch((error) => { console.log(error); });
        }).catch((error) => {
            console.log(error);
            toast.show({
                title: 'Oops! Something went wrong',
                status: 'error',
                description: `Our team is working on it - please try again later!`,
            });
        });

        AsyncStorage.getItem('user_id').then(value => {
            console.log('user_id value', value);
            axiosBackendInstance
                .post('/change_pass', {
                    user_id: value,
                })
                .then(response => {
                    console.log('pass change response.data', response.data);
                });
        });


    }


    const changeEmail = (currentPassword, newEmail) => {
        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
                toast.show({
                    title: 'Changes Submitted',
                    status: 'success',
                    description: `You've changed your information!`,
                });
            }).catch((error) => {
                console.log(error);
                toast.show({
                    title: 'Oops! Something went wrong',
                    status: 'error',
                    description: `Our team is working on it - please try again later!`,
                });
            });
        }).catch((error) => { console.log(error); });

        AsyncStorage.getItem('user_id').then(value => {
            console.log('user_id value', value);
            axiosBackendInstance
                .post('/change_email', {
                    user_id: value,
                })
                .then(response => {
                    console.log('email change response.data', response.data);
                });
        });

    }


    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View>
                <Heading fontSize="xl" p="4" pb="3">
                    Account Information
                </Heading>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>
                    Current Password*
                </Text>

                <TextInput
                    placeholder="Current Password"
                    value={current_password}
                    onChangeText={text => setCurrentPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />

                <Text style={styles.text}>
                    Email
                </Text>

                <TextInput
                    placeholder="Change Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />

                <Text style={styles.text}>
                    Password
                </Text>

                <TextInput
                    placeholder="Change Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button onPress={update_values} style={styles.button}>
                    <Text style={styles.buttonText}> Save Changes</Text>
                </Button>
            </View>
        </KeyboardAvoidingView>

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
    text: {
        fontSize: 18,
        color: 'warmGray.50',
        // fontWeight: bold,
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
