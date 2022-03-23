import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
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





export const AcctInfo = ({ navigation }) => {

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);


    AsyncStorage.getItem('user_name').then(value => {
        setEmail(value);
        console.log(value);
    });

    const reauthenticate = (currentPassword) => {
        var user = auth.currentUser;

        console.log(user.email)
        console.log(currentPassword);

        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);

        return user.reauthenticateWithCredential(cred);
    }

    const DATA = [
        { id: 1, cat: 'Email:', value: email },
        { id: 2, cat: 'Update Email:', value: 'Change Here' },
        { id: 3, cat: 'Password:', value: '******' },
        { id: 4, cat: 'Update Password:', value: 'Change Here' }
    ];



    const changePassword = (currentPassword, newPassword) => {
        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });

        AsyncStorage.getItem('user_id').then(value => {
            console.log('user_id value', value);
            axiosBackendInstance
                .post('/change_pass', {
                    user_id: value,
                })
                .then(response => {
                    console.log('password change response.data', response.data);
                    setPassword(response.data);
                });
        });

    }

    const changeEmail = (currentPassword, newEmail) => {
        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });

        AsyncStorage.getItem('user_id').then(value => {
            console.log('user_id value', value);
            axiosBackendInstance
                .post('/change_email', {
                    user_id: value,
                })
                .then(response => {
                    console.log('email change response.data', response.data);
                    setEmail(response.data);
                });
        });

    }




    return (
        <Box
            h="100%"
            w={{
                base: '100%',
                md: '25%',
            }}
        >
            <Heading fontSize="xl" p="4" pb="3">
                Account Information
            </Heading>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (

                    <AcctInfoCard
                        cat={item.cat}
                        value={item.value}
                        changeEmail={changeEmail}
                        changePassword={changePassword}

                    />
                )}
                keyExtractor={item => item.id}
            />


        </Box>


    );
}

