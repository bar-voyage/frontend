import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecommendationCard } from '../components/RecommendationCard';
import { SafeAreaView, View, StyleSheet, Text, StatusBar } from 'react-native';

export const AcctInfo = ({ navigation }) => {

    const [users, setUsers] = useState([
        { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
        { id: 2, firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
        { id: 3, firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
        { id: 4, firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
        { id: 5, firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
    ]);

    const DATA = [
        { id: 1, title: 'email' },
        { id: 2, title: 'Change Here' },
        { id: 3, title: '******' },
        { id: 4, title: 'Change Here' }
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
    });

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
                    // renderItem={renderItem}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                // keyExtractor={(_item, i) => i.toString()}
                />
            </Box>

        </>
    );
}
