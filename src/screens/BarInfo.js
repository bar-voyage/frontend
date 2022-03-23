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
  Radio,
  Text,
  useToast,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FaStar } from 'react-icons/fa';
import * as ImagePicker from 'expo-image-picker';
//import { launchImageLibrary } from 'react-native-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
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
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showUploadContentModal, setShowUploadContentModal] = useState(false);
  const [showAskForReviewModal, setShowAskForReviewModal] = useState(false);
  const toast = useToast();
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imagetype, setImagetype] = useState('');
  const [filename, setFilename] = useState('');
  const [contentViewable, setContentViewable] = useState();
  const [location, setLocation] = useState();

  React.useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => {
      axiosBackendInstance
        .post('/get_content_view', {
          user_id: value,
        })
        .then(response => {
          console.log('content viewable: ', response.data.content_viewable);
          setContentViewable(response.data.content_viewable === 1);
          console.log('CONTENT_VIEWABLE', contentViewable);
          if (contentViewable === false) {
            setShowAskForReviewModal(true);
          }
        })
        .catch(function (error) {
          console.log('error!', error);
        });
    });
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('location in BarInfo.js', location);
    })();
  }, []);

  const sendCheckInRating = () => {
    let success = 0;
    AsyncStorage.getItem('user_id').then(user_id => {
      /* TODO: update the current bar status */
      axiosBackendInstance
        .post('/set_current_bar', {
          bar_id: bar_id,
          user_id: user_id,
        })
        .catch(function (error) {
          console.log('setting current bar:' + error.toJSON());
          toast.show({
            title: 'Oops! Something went wrong',
            status: 'error',
            description: `Our team is working on it - please try again later!`,
          });
        })
        .then(response => {
          success += 1;
          console.log('update current bar response: ', response);
        });
    });
    AsyncStorage.getItem('user_id').then(user_id => {
      axiosBackendInstance
        .post('/rating', {
          bar_id: bar_id,
          num_stars: rating,
          user_id: user_id,
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
          if (success > 0) {
            toast.show({
              title: 'Submitted',
              status: 'success',
              description: `You're checked in!\nYour rating was ${rating}`,
            });
          }
        });
    });
  };

  const sendContentReview = () => {
    let success = 0;
    AsyncStorage.getItem('user_id').then(user_id => {
      /* only upload if there's a picture there */
      if (image != null) {
        axiosBackendInstance
          .post('/upload_photo', {
            bar_id: bar_id,
            user_id: user_id,
            photo: image,
            phototype: imagetype,
            filename: filename,
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
            console.log('upload_photo response', response);
            success += 1;
          });

        /* TODO: update content viewable if they uploaded a picture */
        axiosBackendInstance
          .post('/set_content_view', {
            user_id: user_id,
            content_view: 1,
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
            console.log('set content view response', response);
            if (success > 0) {
              toast.show({
                title: 'Submitted',
                status: 'success',
                description: `Thanks! We appreciate you 💛`,
              });
            }
          });
      }
    });
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      let filename = result.uri.substring(50, 100);
      filename = filename.replace(/[^a-zA-Z0-9]/g, '');

      setImage(result.uri);
      setFilename(filename);
      setImagetype(blob.type);
    }
  };

  const onPressChooseBar = () => {
    setShowCheckInModal(true);
    AsyncStorage.getItem('user_id').then(user_id => {
      // set content view to 0 (blurred)
      axiosBackendInstance
        .post('/set_content_view', {
          content_view: 0,
          user_id: user_id,
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
          console.log('set content view response', response);
        });
    });
  };

  return (
    <Center>
      <Modal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        size="xl"
      >
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
                <DescriptorBadge text="loud" />
                <DescriptorBadge text="dirty" />
              </HStack>
              <HStack space={4} pt={4} pb={4}>
                <DescriptorBadge text="boring" />
                <DescriptorBadge text="expensive" />
                <DescriptorBadge text="young crowd" />
              </HStack>
              <Radio.Group name="coverRadioGroup" accessibilityLabel="cover">
                <Text>Cover</Text>
                <HStack space={4} pb={2}>
                  <Radio value="yes" my={1}>
                    Yes
                  </Radio>
                  <Radio value="no" my={1}>
                    No
                  </Radio>
                </HStack>
              </Radio.Group>
              <Radio.Group
                name="longLinesRadioGroup"
                accessibilityLabel="longLines"
              >
                <Text>Long lines</Text>
                <HStack space={4} pb={2}>
                  <Radio value="yes" my={1}>
                    Yes
                  </Radio>
                  <Radio value="no" my={1}>
                    No
                  </Radio>
                </HStack>
              </Radio.Group>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                sendCheckInRating();
                navigation.navigate('Map', location);
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* Modal for part 2 review */}
      <Modal
        isOpen={showUploadContentModal}
        onClose={() => setShowUploadContentModal(false)}
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}> {name}</Text>
          </Modal.Header>
          <Modal.Body>
            <Center>
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
                sendContentReview();
                navigation.navigate('Map', location);
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* Modal for uh oh review previous bar */}
      <Modal
        isOpen={showAskForReviewModal}
        onClose={() => {
          setShowAskForReviewModal(false);
          navigation.navigate('Map', location);
        }}
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}>Uh Oh!</Text>
          </Modal.Header>
          <Modal.Body>
            <Center>
              <Box pt={8} pb={8} alignItems="center">
                {/* <Box p="4" rounded="10" borderWidth={3} borderColor="#2596be"> */}
                <Text style={styles.text} pt={4}>
                  Upload photos/videos from your previous bar to unlock
                  exclusive Bar Voyage content.
                </Text>
                {/* </Box> */}
              </Box>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setShowUploadContentModal(true);
              }}
            >
              <Text style={styles.submitButtonText}>Review</Text>
            </Button>
            <Button
              onPress={() => {
                setShowAskForReviewModal(false);
                navigation.navigate('Map', location);
              }}
            >
              <Text style={styles.submitButtonText}>Skip</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <BarInfoComponent
        bar={route.params}
        onPressChooseBar={onPressChooseBar}
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
