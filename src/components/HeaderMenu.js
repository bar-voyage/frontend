import React from 'react';
import { Pressable } from 'react-native';
import { Menu, Divider, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../../firebase';

export const HeaderMenu = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => alert(error.message));
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
      <Menu.Item isDisabled={auth.currentUser}>
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
      </Menu.Item>
      <Divider />
      <Menu.Item>
        <Text>Settings</Text>
      </Menu.Item>
      <Menu.Item>
        <Text>Privacy Policy</Text>
      </Menu.Item>
    </Menu>
  );
};
