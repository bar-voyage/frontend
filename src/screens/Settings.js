import React, { useState } from "react";
import { SectionList, StyleSheet, Text, View, Header } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

// const Stack = create

export const Settings = () => {
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
            <SectionList
                sections={[
                    { title: 'Account Information', data: ['View and update your info'] },
                    { title: 'Past Bars', data: ['Review all your past visits'] },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>

    );




};

