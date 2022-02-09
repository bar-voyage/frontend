import React, { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
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
import { FaStar } from 'react-icons/fa';
import * as ImagePicker from 'expo-image-picker';
import { BarInfoComponent } from '../components/barInfo/BarInfoComponent';
import { axiosBackendInstance } from '../axios';

const Star = ({ filled, onClick }) => {
  return (
    <FaStar
      color={filled ? 'orange' : 'lightgray'}
      size={36}
      onClick={onClick}
    />
  );
};

const DescriptorBadge = ({ text }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
      }}
    >
      <Badge variant={selected ? 'solid' : 'outline'}>
        <Text color={selected ? 'white' : 'black'}>{text}</Text>
      </Badge>
    </Pressable>
  );
};

export const BarInfo = ({ route, navigation }) => {
  const {
    address,
    avg_stars,
    bar_id,
    city,
    // TODO: add deals + description + imageLinks in db for Bar ?
    deals,
    description,
    hours,
    imageLinks,
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
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const sendRating = () => {
    const formData = new FormData();
    console.log('image', image);
    formData.append('photo', image, 'photo.png');
    formData.append('bar_id', 1);
    formData.append('user_id', 55);
    axiosBackendInstance
      .post('/upload_photo', {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .catch(function (error) {
        console.log(error.toJSON());
        toast.show({
          title: 'Oops! Something went wrong',
          status: 'error',
          description: `Our team is working on it - please try again later!`,
        });
      })
      .then(response => {
        console.log('response.data', response);
        // toast.show({
        //   title: 'Submitted',
        //   status: 'success',
        //   description: `Thanks! We appreciate you 💛 \nYour rating was ${rating}`,
        // });
      });
    axiosBackendInstance
      .post('/rating', {
        bar_id: 1,
        num_stars: rating,
      })
      .catch(function (error) {
        console.log(error.toJSON());
        toast.show({
          title: 'Oops! Something went wrong',
          status: 'error',
          description: `Our team is working on it - please try again later!`,
        });
      })
      .then(response => {
        console.log('response.data', response);
        toast.show({
          title: 'Submitted',
          status: 'success',
          description: `Thanks! We appreciate you 💛 \nYour rating was ${rating}`,
        });
      });
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      console.log('blooob', blob);
      setImage(blob);
    }
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}>What do you think of {name}?</Text>
          </Modal.Header>
          <Modal.Body>
            <Center>
              <HStack pb={5} space="sm">
                {Array(5)
                  .fill()
                  // eslint-disable-next-line no-unused-vars
                  .map((_, i) => (
                    // <MaterialIcons name="star-outline" size={56} key={i}
                    <Star
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      filled={i < rating}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
              </HStack>
              <HStack space={4}>
                <DescriptorBadge text="crowded" />
                <DescriptorBadge text="good music" />
                <DescriptorBadge text="fun" />
              </HStack>
              <HStack space={4} pt={4}>
                <DescriptorBadge text="cheap drinks" />
                <DescriptorBadge text="has cover" />
                <DescriptorBadge text="dirty" />
              </HStack>
              <HStack space={4} pt={4}>
                <DescriptorBadge text="boring" />
                <DescriptorBadge text="expensive" />
                <DescriptorBadge text="young crowd" />
              </HStack>
              <Box pt={8} pb={8} alignItems="center">
                <Box p="4" rounded="10" borderWidth={3} borderColor="#2596be">
                  <Text style={styles.text} pt={4}>
                    Help fellow bar-goers out 🙏
                  </Text>
                  <Text style={styles.text}>
                    Upload your photos/videos below!
                  </Text>
                  <Box alignItems="center">
                    <IconButton
                      _icon={{
                        as: MaterialIcons,
                        name: 'file-upload',
                        size: 100,
                      }}
                      onPress={selectImage}
                      style={styles.uploadButton}
                    />
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                navigation.navigate('Map');
                sendRating();
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
