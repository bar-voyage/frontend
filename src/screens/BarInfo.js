import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Modal,
  Center,
  HStack,
  IconButton,
  Text,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { BarInfoComponent } from '../components/barInfo/BarInfoComponent';

export const BarInfo = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>So... how was SEH?</Modal.Header>
          <Modal.Body>
            <Center>
              <HStack pb={8}>
                {Array(5)
                  .fill()
                  // eslint-disable-next-line no-unused-vars
                  .map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MaterialIcons name="star-outline" size={36} key={i} />
                  ))}
              </HStack>
              <HStack space={2}>
                <Badge variant="outline">crowded</Badge>
                <Badge variant="outline">good music</Badge>
                <Badge variant="outline">cheap drinks</Badge>
                <Badge variant="outline">fun</Badge>
              </HStack>
              <HStack space={2} pt={2}>
                <Badge variant="outline">has cover</Badge>
                <Badge variant="outline">dirty</Badge>
                <Badge variant="outline">boring</Badge>
                <Badge variant="outline">expensive</Badge>
              </HStack>
              <Text pt={8}>Help fellow bar-goers out 🙏</Text>
              <Text>Upload your photos/videos below!</Text>
              <Box>
                <IconButton
                  size="lg"
                  _icon={{
                    as: MaterialIcons,
                    name: 'file-upload',
                  }}
                />
              </Box>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                navigation.navigate('Map');
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <BarInfoComponent
        blurContent={false}
        onPressChooseBar={() => setShowModal(true)}
      />
    </Center>
  );
};
