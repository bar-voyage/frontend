import React from 'react';
import {
    Box,
    Image,
    HStack,
    VStack,
    Text,
    Spacer,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const SettingCard = props => {
    const { name } = props;

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
                        {name}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};
