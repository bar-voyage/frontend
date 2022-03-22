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
import { MaterialIcons } from '@expo/vector-icons';

export const AcctInfoCard = props => {
    const { cat, value } = props;

    const currentPassword = '123456'
    const newEmail = 'll@jstreet'


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
                    {/* <Spacer /> */}
                    <Text
                        fontSize="lg"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf='flex-start'

                        onPress={() => changeEmail(currentPassword, newEmail)}
                    >

                        {value}
                    </Text>

                </VStack>
                {/* <Spacer /> */}
            </HStack>
        </Box>
    );
};
