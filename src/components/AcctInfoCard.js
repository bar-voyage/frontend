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
    const { cat, value, changeEmail, changePassword } = props;

    const new_password = 'lolzthisisfun'
    const new_email = 'cng227@gmail.com'
    const curr_password = '123456'

    function get_cat(category) {
        if (category == 'Update Email:') {
            changeEmail(curr_password, new_email);
        } else if (category == 'Update Password:') {
            changePassword(curr_password, new_password);
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
                    <Text
                        fontSize="lg"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        alignSelf='flex-start'

                        onPress={() => { get_cat(cat) }}
                    >

                        {value}
                    </Text>

                </VStack>
                {/* <Spacer /> */}
            </HStack>
        </Box>
    );
};
