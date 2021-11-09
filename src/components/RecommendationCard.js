import React from 'react';
import { Badge, Box, Image, HStack, VStack, Text, Spacer } from 'native-base';

export const RecommendationCard = props => {
  const { name, distance, categories, imageUrl } = props;
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
            uri: imageUrl,
          }}
          alt={name}
        />
        <VStack>
          <Text
            fontSize="md"
            _dark={{
              color: 'warmGray.50',
            }}
            bold
          >
            {name}
          </Text>
          <Box maxWidth="180px">
            <HStack space={1} pt={2}>
              {categories.map((c, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Badge key={i}>{c}</Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
        <Spacer />
        <Text
          fontSize="xs"
          _dark={{
            color: 'warmGray.50',
          }}
          color="coolGray.800"
          alignSelf="flex-start"
        >
          {distance}
        </Text>
      </HStack>
    </Box>
  );
};
