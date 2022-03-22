import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';

import { HeaderMenu } from '../components/HeaderMenu';

import { Login } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
import { Survey } from '../screens/Survey';
import { BarInfo } from '../screens/BarInfo';
import { Map } from '../screens/Map';
import { Settings } from '../screens/Settings';
import { PastBars } from '../screens/PastBars';
import { AcctInfo } from '../screens/AcctInfo';


const MainStack = createStackNavigator();

const headerOptions = {
  options: {
    headerTitle: () => (
      <View>
        <Image
          source={require('../../assets/header-logo.png')}
          style={styles.headerLogo}
          alt="bar voyage header logo"
        />
      </View>
    ),
    headerRight: () => <HeaderMenu />,
  },
};

const styles = StyleSheet.create({
  headerLogo: {
    height: 50,
    width: 80,
  },
});

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Login" component={Login} {...headerOptions} />
    <MainStack.Screen name="SignUp" component={SignUp} {...headerOptions} />
    <MainStack.Screen name="Survey" component={Survey} {...headerOptions} />
    <MainStack.Screen name="Map" component={Map} {...headerOptions} />
    <MainStack.Screen name="BarInfo" component={BarInfo} {...headerOptions} />
    <MainStack.Screen name="Settings" component={Settings} {...headerOptions} />
    <MainStack.Screen name="PastBars" component={PastBars} {...headerOptions} />
    <MainStack.Screen name="AcctInfo" component={AcctInfo} {...headerOptions} />

  </MainStack.Navigator>
);
