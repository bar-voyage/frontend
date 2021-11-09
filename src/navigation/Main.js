import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Idk } from '../screens/Idk';
import { Survey } from '../screens/Survey';
import { BarInfo } from '../screens/BarInfo';
import { Map } from '../screens/Map';

const MainStack = createStackNavigator();

const noTitle = {
  options: {
    title: '',
  },
};

export const Main = () => (
  <MainStack.Navigator
  // screenOptions={{
  //   headerStyle: {
  //     backgroundColor: '#ff7f11',
  //   },
  // }}
  >
    <MainStack.Screen name="Home" component={Home} {...noTitle} />
    <MainStack.Screen name="Idk" component={Idk} {...noTitle} />
    <MainStack.Screen name="Survey" component={Survey} {...noTitle} />
    <MainStack.Screen name="Map" component={Map} {...noTitle} />
    <MainStack.Screen name="BarInfo" component={BarInfo} {...noTitle} />
  </MainStack.Navigator>
);
