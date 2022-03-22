import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, FlatList, Heading } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-web-maps';
import { RecommendationCard } from '../components/RecommendationCard';
import { axiosBackendInstance } from '../axios';

export const Map = ({ route, navigation }) => {
  console.log('ROUTE.PARAMS', route.params);
  const { coords, timestamp } = route.params;
  console.log('coords', coords);
  console.log('timestamp', timestamp);
  const [bars, setBars] = useState([]);
  console.log('bars in beginning', bars);

  React.useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => {
      console.log('user_id value', value);
      axiosBackendInstance
        .post('/rec_bars', {
          user_id: value,
        })
        .then(response => {
          console.log('getRecBars response.data', response.data);
          setBars(response.data);
          console.log('BARS', bars);
        });
    });
    // getBars();
  }, []);

  // const getBars = () => {
  //   AsyncStorage.getItem('user_id').then(value => {
  //     console.log('user_id value', value);
  //     axiosBackendInstance
  //       .post('/rec_bars', {
  //         user_id: value,
  //       })
  //       .then(response => {
  //         console.log('getRecBars response.data', response.data);
  //         setBars(response.data);
  //         console.log('BARS', bars);
  //       });
  //   });
  // };

  return (
    <>
      <Box
        h="20%"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <MapView
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          {bars.map((bar, index) => (
            <MapView.Marker
              key={index}
              coordinate={{ latitude: bar.latitude, longitude: bar.longitude }}
              title={bar.name}
              // description={marker.description}
            />
          ))}
        </MapView>
      </Box>
      <Box
        h="100%"
        w={{
          base: '100%',
          md: '25%',
        }}
      >
        <Heading fontSize="xl" p="4" pb="3">
          Your Recommendations
        </Heading>
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
      </Box>
    </>
  );
};
