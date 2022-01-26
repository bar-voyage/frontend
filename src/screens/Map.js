import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { RecommendationCard } from '../components/RecommendationCard';
import { axiosBackendInstance } from '../axios';

export const Map = ({ navigation }) => {
  const [bars, setBars] = useState();
  // const [userId, setUserId] = useState(0);

  React.useEffect(() => {
    getBars();
  }, []);

  const getBars = () => {
    AsyncStorage.getItem('user_id').then(value => {
      console.log('value', value);
      // setUserId(value);
      axiosBackendInstance
        .post('/rec_bars', {
          user_id: value,
        })
        .then(response => {
          console.log('response.data', response.data);
          setBars(response.data);
          console.log(bars);
        });
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
