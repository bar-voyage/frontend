import React from 'react';
import {
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

export const BarInfoComponent = props => {
  const blurRadius = props.blurContent ? 5 : 0;

  return (
    <Container>
      <HStack width="100%">
        <Box flex={1} alignItems="flex-end" pt={2}>
          <ChooseBarButton onPressChooseBar={props.onPressChooseBar} />
        </Box>
      </HStack>
      <VStack space={4} pb={4}>
        <Heading>SEH</Heading>

        <DetailsRow
          iconName="location-pin"
          details="800 22nd St NW, Washington, DC 20052"
        />
        <Divider my={-2} />
        <DetailsRow iconName="access-time" details="5:00PM - 3:00AM" />
        <Divider my={-2} />
        <DetailsRow
          iconName="description"
          details="Top nightlife hotspot attracting DC's hottest young engineers"
        />
        <Divider my={-2} />
        <DetailsRow
          iconName="attach-money"
          details="$3 tequila shots 8:40PM - close"
        />
        <Stack space={1} alignItems="center">
          <VStack space={3} alignItems="center">
            <HStack space={3}>
              <Image
                source={{
                  uri: 'https://gwtoday.gwu.edu/sites/g/files/zaxdzs1531/f/styles/gw_editorial_article_full/public/image/SEH17_SEH_UP_2015-WLA_6446_1080x.jpg?itok=9egdRwXz',
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />

              <Image
                source={{
                  uri: 'https://s3-media3.fl.yelpcdn.com/bphoto/7jr8YBqSzqG6fPGF6LmNrw/o.jpg',
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />
            </HStack>
            <HStack space={3}>
              <Image
                source={{
                  uri: 'https://www.washingtonian.com/wp-content/uploads/2017/01/MG_0098.jpg',
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />
              <Image
                source={{
                  uri: 'https://z0sqrs-a.akamaihd.net/3207-mcguiresirishpub/images/display-records/galleries/pensacola-packed-bar.jpg',
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />
            </HStack>
          </VStack>
        </Stack>
        <ChooseBarButton onPressChooseBar={props.onPressChooseBar} />
      </VStack>
    </Container>
  );
};
