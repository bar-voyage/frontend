import React from 'react';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';

export const LogoutButton = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => alert(error.message));
  };
  return <Button onPress={handleLogout}>Logout</Button>;
};
