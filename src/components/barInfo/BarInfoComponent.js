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
  const { bar, blurContent, onPressChooseBar } = props;
  const blurRadius = blurContent ? 5 : 0;
  console.log("blurry: " + blurContent);

  const address = `${bar.address}, ${bar.city}, ${bar.state} ${bar.zip}`;

  return (
    <Container>
      <VStack space={4} pt={8} pb={4}>
        <Heading size="xl">{bar.name}</Heading>

        <DetailsRow iconName="location-pin" details={address} />
        <Divider my={-2} />
        <DetailsRow iconName="access-time" details={bar.hours} />
        <Divider my={-2} />
        {/* empty bc description or deals fields do not exist in db */}
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
            {/* TODO: replace image links, figure out how to display seamlessly with .map */}
            <HStack space={3}>
              <Image
                source={{
                  uri: 'https://gwtoday.gwu.edu/sites/g/files/zaxdzs1531/f/styles/gw_editorial_article_full/public/image/SEH17_SEH_UP_2015-WLA_6446_1080x.jpg?itok=9egdRwXz',
                  // uri: bar.imageLinks[0],
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />

              <Image
                source={{
                  uri: 'https://s3-media3.fl.yelpcdn.com/bphoto/7jr8YBqSzqG6fPGF6LmNrw/o.jpg',
                  // uri: bar.imageLinks[1],
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
                  // uri: bar.imageLinks[2],
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />
              <Image
                source={{
                  uri: 'https://z0sqrs-a.akamaihd.net/3207-mcguiresirishpub/images/display-records/galleries/pensacola-packed-bar.jpg',
                  // uri: bar.imageLinks[3],
                }}
                alt="Photo of xyz"
                size="xl"
                blurRadius={blurRadius}
              />
            </HStack>
          </VStack>
        </Stack>
        <Box alignItems="center" pt={8}>
          <ChooseBarButton onPressChooseBar={onPressChooseBar} />
        </Box>
      </VStack>
    </Container>
  );
};
