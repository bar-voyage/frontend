import React from "react";
import { FlatList, StyleSheet, Text, View, Header } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { SettingCard } from '../components/SettingCard'


export const Settings = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 18,
            fontWeight: 'bold',
            backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
            padding: 10,
            fontSize: 15,
            height: 44,
        },
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    { name: 'View Past Bars', page: 'PastBars' },
                    { name: 'View/Edit Account Information', page: 'AcctInfo' }
                ]}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item.page)}
                    >
                        <SettingCard
                            name={item.name}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.name}
            />
        </View>

    );
};

