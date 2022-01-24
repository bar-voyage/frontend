import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Badge,
  Box,
  Button,
  Modal,
  Center,
  HStack,
  IconButton,
  Text,
  useToast,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { BarInfoComponent } from '../components/barInfo/BarInfoComponent';
import { FaStar } from "react-icons/fa";
import { axiosBackendInstance } from '../axios';


function Star({ filled, onClick }) {
  return (
    <FaStar
      color={filled ? "orange" : "lightgray"}
      size={30}
      onClick={onClick} />
  );
}
export default Star;

export const BarInfo = ({ route, navigation }) => {
  const {
    address,
    avg_stars,
    bar_id,
    city,
    hours,
    is_open,
    latitude,
    longitude,
    name,
    review_count,
    state,
    zip,
  } = route.params;
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();

  React.useEffect(() => {
    postRating();
  }, []);

  const postRating = () => {
    axiosBackendInstance
      .post('/rating', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        console.log('response.data', response.data);
        // setBars(response.data);
        // Object.keys(data.map())
        // console.log(bars);
      });
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}>So... how was {name}?</Text>
          </Modal.Header>
          <Modal.Body>
            <Center>
              <HStack pb={5}>
                {Array(5)
                  .fill()
                  // eslint-disable-next-line no-unused-vars
                  .map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MaterialIcons name="star-outline" size={56} key={i} />
                  ))}
              </HStack>
              <HStack space={4}>
                <Badge variant="outline">
                  <Text>crowded</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>good music</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>fun</Text>
                </Badge>
              </HStack>
              <HStack space={4} pt={4}>
                <Badge variant="outline">
                  <Text>cheap drinks</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>has cover</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>dirty</Text>
                </Badge>
              </HStack>
              <HStack space={4} pt={4}>
                <Badge variant="outline">
                  <Text>boring</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>expensive</Text>
                </Badge>
                <Badge variant="outline">
                  <Text>young crowd</Text>
                </Badge>
              </HStack>
              <Box pt={8} pb={8} alignItems="center">
                <Box p="4" rounded="10" borderWidth={3} borderColor="#2596be">
                  <Text style={styles.text} pt={4}>
                    Help fellow bar-goers out 🙏
                  </Text>
                  <Text style={styles.text}>
                    Upload your photos/videos below!
                  </Text>
                  <Box>
                    <IconButton
                      _icon={{
                        as: MaterialIcons,
                        name: 'file-upload',
                        size: 100,
                      }}
                      style={styles.uploadButton}
                    />
                  </Box>
                </Box>
              </Box>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                navigation.navigate('Map');
                toast.show({
                  title: 'Submitted',
                  status: 'success',
                  description: 'Thanks! We appreciate you 💛',
                });
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <BarInfoComponent
        bar={route.params}
        blurContent={false}
        onPressChooseBar={() => setShowModal(true)}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  submitButtonText: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
  },
});
