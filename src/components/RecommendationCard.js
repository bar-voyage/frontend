import React from 'react';
import {
  /* Badge, */
  Box,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const RecommendationCard = props => {
  const { name, avgStars, imageUrl } = props;
  const distance = '0.2 mi';

  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2"
    >
      <HStack space={3} justifyContent="space-between">
        <Image
          size="lg"
          source={{
            // uri: 'https://www.insidehook.com/wp-content/uploads/2020/02/madams_organ.jpg?fit=1200%2C800',
            uri: imageUrl,
          }}
          alt={name}
        />
        <VStack>
          <Text
            fontSize="lg"
            _dark={{
              color: 'warmGray.50',
            }}
            bold
          >
            {name}
          </Text>
          <Box maxWidth="180px">
            <HStack pt={2}>
              {/* {categories.map((c, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Badge key={i}>{c}</Badge>
              ))} */}
              {Array(Math.round(avgStars))
                .fill()
                .map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MaterialIcons name="star" size={22} key={i} />
                ))}
              {Array(5 - Math.round(avgStars))
                .fill()
                .map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <MaterialIcons name="star-outline" size={22} key={i} />
                ))}
            </HStack>
          </Box>
        </VStack>
        <Spacer />
        {/* <Text
          fontSize="sm"
          _dark={{
            color: 'warmGray.50',
          }}
          color="coolGray.800"
          alignSelf="flex-start"
        >
          {distance}
        </Text> */}
      </HStack>
    </Box>
  );
};
