import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Idk } from '../screens/Idk';
import { Survey } from '../screens/Survey';
import { Recommend } from '../screens/Recommend';
import { BarInfoScreen } from '../screens/BarInfoScreen';

const MainStack = createStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Idk" component={Idk} />
    <MainStack.Screen name="Survey" component={Survey} />
    <MainStack.Screen name="Recommend" component={Recommend} />
    <MainStack.Screen name="BarInfoScreen" component={BarInfoScreen} />
  </MainStack.Navigator>
);
