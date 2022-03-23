import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Box, FlatList, Heading, Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecommendationCard } from '../components/RecommendationCard';
import { axiosBackendInstance } from '../axios';


export const PastBars = ({ navigation }) => {
  const [bars, setBars] = useState([]);

  console.log('Past Bars before:', bars)
  React.useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => {
      console.log('user_id value', value);
      axiosBackendInstance
        .post('/past_bars', {
          user_id: value,
        })
        .then(response => {
          console.log('getPastBars response.data', response.data);
          setBars(response.data);
          console.log('Past Bars BARS', bars);
        });
    });
  }, []);


  return (

    <>
      <Box
        h="100%"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <Heading fontSize="xl" p="4" pb="3">
          Your Past Bars
        </Heading>

        <FlatList

          data={bars}
          renderItem={({ item }) => (

            <RecommendationCard
              name={item.name}
              avgStars={item.avg_stars}
              imageUrl={item.img_url}

            />
          )}
          keyExtractor={item => item.bar_id}
        />)



      </Box>

    </>
  );
}
