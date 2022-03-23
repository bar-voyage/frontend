import React from 'react';
import {
    /* Badge, */
    Box,
    Image,
    HStack,
    VStack,
    Text,
    Spacer,
} from 'native-base';
import { SafeAreaView, StyleSheet, TextInput, View, Button } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { style } from 'styled-system';


export const AcctInfoCard = props => {
    const { cat, value, changeEmail, changePassword, childToParent } = props;

    const [new_value, setUpdate] = React.useState('');
    const password = '123456';

    const get_cat = (category, curr_password, update_value) => {
        if (category == 'Update Email:') {
            console.log('update:', update_value);
            changeEmail(curr_password, update_value);
        }

        if (category == 'Update Password:') {
            changePassword(curr_password, update_value);
        }
    }


    return (
        <Box
            borderBottomWidth="1"
            _dark={{
                borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
        >
            <HStack space={3} justifyContent="space-between">
                <VStack>
                    <Text
                        fontSize="lg"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        bold
                    >
                        {cat}

                    </Text>

                    {/* <Text onPress={() => { get_cat(cat, new_value) }}> */}
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setUpdate(text)}
                        value={new_value}
                        placeholder={value}
                        keyboardType="default"
                    />

                    {/* </Text> */}

                    {/* <Button onPress={() => { get_cat(cat, password, value) }} style={styles.button}>
                        <Text style={styles.buttonText}> Submit Changes </Text>
                    </Button> */}

                </VStack>
                {/* <Spacer /> */}
            </HStack>


        </Box>


    );


};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
