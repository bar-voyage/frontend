import React from 'react';
import { HStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const DetailsRow = props => {
  const { iconName, details } = props;
  return (
    <HStack>
      <MaterialIcons name={iconName} size={24} />
      <Text pl={2}>{details}</Text>
    </HStack>
  );
};
