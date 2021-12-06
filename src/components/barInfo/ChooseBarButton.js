import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

export const ChooseBarButton = props => (
  <Button onPress={props.onPressChooseBar}>
    <Text style={styles.text}>Let&apos;s go here!</Text>
  </Button>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
});
