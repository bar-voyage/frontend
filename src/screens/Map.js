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
        console.log(bars);
      });
  };

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
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('BarInfo', item)}
              >
                <RecommendationCard
                  name={item.name}
                  avgStars={item.avg_stars}
                  imageUrl={item.img_url}
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
