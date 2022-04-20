import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Menu, Divider, Text, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HeaderMenu = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [username, setUserName] = useState('');
  AsyncStorage.getItem('user_name').then(value => {
    setUserName(value);
  });

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUserName('');
        navigation.navigate('Login');
        toast.show({
          title: 'Logged out',
          status: 'success',
          description: 'See you later, ' + username + ' 👋',
        });
      })
      .catch(error => alert(error.message));
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <Menu
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps}>
            <MaterialIcons name="person" size={40} />
          </Pressable>
        );
      }}
    >
      <Menu.Item isDisabled>
        <Text style={styles.user}>🤩 &nbsp; Barb</Text>
      </Menu.Item>
      <Menu.Item isDisabled={auth.currentUser}>
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
      </Menu.Item>
      <Divider />
      <Menu.Item>
        <Pressable onPress={handleSettings}>
          <Text>Settings</Text>
        </Pressable>
      </Menu.Item>
      <Menu.Item>
        <Text>Privacy Policy</Text>
      </Menu.Item>
    </Menu>
  );
};

const styles = StyleSheet.create({
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
