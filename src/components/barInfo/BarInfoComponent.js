import React, { useState } from 'react';
import {
  Badge,
  Box,
  Image,
  Heading,
  Container,
  Divider,
  HStack,
  Stack,
  VStack,
} from 'native-base';
import { DetailsRow } from './DetailsRow';
import { ChooseBarButton } from './ChooseBarButton';
import { axiosBackendInstance } from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BarInfoComponent = props => {
  const { bar, onPressChooseBar } = props;
  const [userId, setUserId] = useState();
  const address = `${bar.address}, ${bar.city}, ${bar.state} ${bar.zip}`;
  const [photos, setPhotos] = useState([]);
  const [contentViewable, setContentViewable] = useState(null);
  const [adjectives, setAdjectives] = useState([]);

  React.useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => {
      axiosBackendInstance
        .post('/get_content_view', {
          user_id: value,
        })
        .then(response => {
          console.log('content viewable: ', response.data.content_viewable);
          setContentViewable(response.data.content_viewable === 1);
        })
        .catch(function (error) {
          console.log('error!', error);
        });
    });

    axiosBackendInstance
      .post('/get_photos', {
        bar_id: bar.bar_id,
      })
      .then(response => {
        console.log('getphotos response.data', response.data);
        setPhotos(response.data);
        console.log('PHOTOS', photos);
      })
      .catch(function (error) {
        console.log('No photos');
      });

    axiosBackendInstance
      .post('/get_adj', {
        bar_id: bar.bar_id,
      })
      .then(response => {
        console.log('get_adj response.data', response.data);
        setAdjectives(response.data);
      })
      .catch(function (error) {
        console.log(error, 'error retrieving adjectives');
      });
  }, []);

  return (
    <Container>
      <VStack space={4} pt={8} pb={4}>
        <Heading size="xl">{bar.name}</Heading>

        <VStack space={2}>
          <HStack space={3}>
            {adjectives.map(adj => (
              <Badge>{adj}</Badge>
            ))}
          </HStack>
          <HStack space={3}>
            <Badge colorScheme="info">cover charge</Badge>
            <Badge colorScheme="info">short line</Badge>
          </HStack>
        </VStack>

        <DetailsRow iconName="location-pin" details={address} />
        <Divider my={-2} />
        <DetailsRow iconName="access-time" details={bar.hours} />
        <Divider my={-2} />
        <DetailsRow
          iconName="description"
          // details="Top nightlife hotspot attracting DC's hottest young engineers"
          details={bar.description}
        />
        <Divider my={-2} />
        <DetailsRow
          iconName="attach-money"
          // details="$3 tequila shots 8:40PM - close"
          details={bar.deals}
        />
        <Stack space={1} pt={8} alignItems="center">
          <VStack space={3} alignItems="center">
            {photos.map(photo => (
              <HStack space={3}>
                <Image
                  source={{
                    uri: photo,
                  }}
                  alt="Photo of xyz"
                  size="xl"
                  // blurRadius={contentViewable ? 0 : 5}
                />
              </HStack>
            ))}
          </VStack>
        </Stack>
        <Box alignItems="center" pt={8}>
          <ChooseBarButton onPressChooseBar={onPressChooseBar} />
        </Box>
      </VStack>
    </Container>
  );
};
