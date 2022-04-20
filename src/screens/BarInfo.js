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
import { BlurView } from 'expo-blur';
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
  const [errorMsg, setErrorMsg] = useState('');
  const [currentBar, setCurrentBar] = useState({});

  React.useEffect(() => {
    AsyncStorage.getItem('user_id').then(value => {
      // Get content view value from backend (0 = not viewable, 1 = viewable)
      axiosBackendInstance
        .post('/get_content_view', {
          user_id: value,
        })
        .then(response => {
          const contentView = response.data.content_viewable;
          console.log('content viewable (0 or 1): ', contentView);
          if (contentView === 0) {
            setShowAskForReviewModal(true);
          }
          setContentViewable(contentView === 1);
        })
        .catch(function (error) {
          console.log('error!', error);
        });

      // Get user's current bar
      axiosBackendInstance
        .post('/get_current_bar', {
          user_id: value,
        })
        .then(response => {
          const currBar = response.data[0];
          console.log('current bar: ', currBar);
          setCurrentBar(currBar);
          // Prompt user for photo review if they're checked in + if the bar they're looking at is different from their current checked in bar
          if (contentViewable === false && bar_id !== currBar.bar_id) {
            setShowAskForReviewModal(true);
          }
        })
        .catch(function (error) {
          console.log('error!', error);
        });
    });
  }, []);
  console.log('CONTENT_VIEWABLE', contentViewable);
  console.log('CURRENT BAR', currentBar);

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
    // Set current bar value to be bar id of place user is checking into
    AsyncStorage.getItem('user_id').then(user_id => {
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
          console.log('set current bar response: ', response);
        });

      // Set content view value to 0 (locked/not viewable) since user has checked in but not yet uploaded photos
      axiosBackendInstance
        .post('/set_content_view', {
          content_view: 0,
          user_id: user_id,
        })
        .catch(function (error) {
          success -= 1;
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

      // Send star rating to backend
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
          console.log('rating endpoint response', response);
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
            bar_id: currentBar.bar_id,
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

        /* Update content viewable if they uploaded a picture */
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
                title: 'Uploaded successfully',
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
                  .map((_, i) => (
                    <Star
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
      {/* Modal for part 2 review: upload media content */}
      <Modal
        isOpen={showUploadContentModal}
        onClose={() => setShowUploadContentModal(false)}
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}>
              {currentBar ? currentBar.name : ''}
            </Text>
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
                setShowUploadContentModal(false);
                setShowAskForReviewModal(false);
                // navigation.navigate('Map', location);
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* Modal for uh oh review previous bar */}
      {/* TODO: fix this modal wrongly appearing for user's current bar */}
      <Modal
        isOpen={currentBar && showAskForReviewModal}
        onClose={() => {
          setShowAskForReviewModal(false);
          navigation.navigate('Map', location);
        }}
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.modalHeader}>🔒 Uh Oh! 🔒</Text>
          </Modal.Header>
          <Modal.Body>
            <Center>
              <Box pt={8} pb={8} alignItems="center">
                {/* <Box p="4" rounded="10" borderWidth={3} borderColor="#2596be"> */}
                <Text style={styles.askforReviewText} pt={4}>
                  Upload photos/videos from your currently checked-in bar{' '}
                  <b>{currentBar ? currentBar.name : ''}</b> to unlock exclusive
                  Bar Voyage content.
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
              <Text style={styles.submitButtonText}>Continue</Text>
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
  askforReviewText: {
    fontSize: 18,
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
  },
});
