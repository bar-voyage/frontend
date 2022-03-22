import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AcctInfoCard } from '../components/AcctInfoCard';
import { SafeAreaView, View, StyleSheet, Text, StatusBar } from 'react-native';

export const AcctInfo = ({ navigation }) => {

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);


    AsyncStorage.getItem('user_name').then(value => {
        setEmail(value);
        console.log(value);
    });

    const DATA = [
        { id: 1, cat: 'Email:', value: email },
        { id: 2, cat: 'Update Email:', value: 'Change Here' },
        { id: 3, cat: 'Password:', value: '******' },
        { id: 4, cat: 'Update Password:', value: 'Change Here' }
    ];

    const changePassword = (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });

        React.useEffect(() => {
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
        }, []);


    }

    const changeEmail = (currentPassword, newEmail) => {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() => {
                console.log("Email updated!");
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });

        React.useEffect(() => {
            AsyncStorage.getItem('user_id').then(value => {
                console.log('user_id value', value);
                axiosBackendInstance
                    .post('/change_password', {
                        user_id: value,
                    })
                    .then(response => {
                        console.log('password change response.data', response.data);
                        setPassword(response.data);
                    });
            });
        }, []);
    }


    return (
        <>
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

                        />
                    )}
                    keyExtractor={item => item.id}
                />


            </Box>

        </>
    );
}
