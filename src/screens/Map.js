import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
import { RecommendationCard } from '../components/RecommendationCard';
import { axiosBackendInstance } from '../axios';

export const Map = ({ navigation }) => {
  const [bars, setBars] = useState();

  React.useEffect(() => {
    getBars();
  }, []);

  const getBars = () => {
    axiosBackendInstance
      .get('/bars', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log('response.data', response.data);
        setBars(response.data);
      });
  };

  // Hardcoded dummy data
  // const data = [
  //   {
  //     bar_id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  //     name: 'Johnny Pistolas',
  //     distance: '0.2 mi',
  //     categories: ['dancing'],
  //     image_url: 'https://pbs.twimg.com/media/E88legbXsAMlUDR.jpg',
  //     avg_stars: 5,
  //   },
  //   {
  //     bar_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //     name: 'Shenanigans',
  //     distance: '0.2 mi',
  //     categories: ['pub', 'sports', 'cheap drinks'],
  //     image_url:
  //       'https://assets3.thrillist.com/v1/image/1624506/828x610/flatten;crop;jpeg_quality=70',
  //     avg_stars: 4,
  //   },
  //   {
  //     bar_id: '58694a0f-3da1-471f-bd96-145571e29d72',
  //     name: 'Madams Organ',
  //     distance: '0.2 mi',
  //     categories: ['dive bar', 'has cover', 'live music'],
  //     image_url:
  //       'https://www.insidehook.com/wp-content/uploads/2020/02/madams_organ.jpg?fit=1200%2C800',
  //     avg_stars: 4,
  //   },
  //   {
  //     bar_id: '68694a0f-3da1-431f-bd56-142371e29d72',
  //     name: 'Grand Central',
  //     distance: '0.3 mi',
  //     categories: ['college', 'dancing'],
  //     image_url:
  //       'https://www.tripsavvy.com/thmb/TlCJoqlUfpF3GrLd4Mcy1FjXlpQ=/2125x1411/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-148672307-5953b5275f9b584bfe837796.jpg',
  //     avg_stars: 3,
  //   },
  //   {
  //     bar_id: '28694a0f-3da1-471f-bd96-142456e29d72',
  //     name: 'Pitchers',
  //     distance: '0.5 mi',
  //     categories: ['lgbtq+', 'dancing'],
  //     image_url:
  //       'https://images.squarespace-cdn.com/content/v1/5b1e9381a9e0285ae247e253/1529936795365-LEAYZPAVLA6V32G6ZUAC/IMG_0761.jpg?format=2500w',
  //     avg_stars: 3,
  //   },
  // ];
  // TODO: hardcode image array
  // data.forEach((bar) => {
  //   bar.imageUrl =
  // })

  return (
    <>
      <Box
        h="50%"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: 'https://www.thehotelguru.com/static-maps/collections/9723.png',
          }}
          alt="dummy map image"
        />
      </Box>
      <Box
        h="50%"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <Heading fontSize="xl" p="4" pb="3">
          Your Recommendations
        </Heading>
        {bars && (
          <FlatList
            data={bars}
            // data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('BarInfo', item)}
              >
                <RecommendationCard
                  name={item.name}
                  avgStars={item.avg_stars}
                  imageUrl={item.image_url}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.bar_id}
          />
        )}
      </Box>
    </>
  );
};
