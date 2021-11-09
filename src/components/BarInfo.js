// components/BarInfo.js
import React from 'react';
import { Image, Heading, Container, Text, HStack, Stack, Center, Button } from 'native-base'

export const BarInfo = props => {
    const blurRadius = props.blurContent ? 5 : 0;

    return (
        // Bar name heading, info, content heading
        <Container>
            <Heading> Bar Name </Heading>
            <Text> Some general info about bar </Text>
            <Text> Some info about bar hours </Text>
            <Text> ★ ★ ★ ★ ★ </Text>
            <Stack space={1} alignItems="center">
                <HStack space={1} alignItems="center">
                    <Image
                        source={{ uri: "https://s3-media3.fl.yelpcdn.com/bphoto/7jr8YBqSzqG6fPGF6LmNrw/o.jpg", }}
                        alt="Photo of xyz"
                        size="xl"
                        blurRadius={blurRadius}
                    />

                    <Image
                        source={{ uri: "https://s3-media0.fl.yelpcdn.com/bphoto/JKmlhv7doeXiMNKE_c0Xdw/348s.jpg", }}
                        alt="Photo of xyz"
                        size="xl"
                        blurRadius={blurRadius}
                    />

                    <Image
                        source={{ uri: "https://www.washingtonian.com/wp-content/uploads/2017/01/MG_0098.jpg", }}
                        alt="Photo of xyz"
                        size="xl"
                        blurRadius={blurRadius}
                    />
                </HStack>
            </Stack>
            <Button onPress={() => navigation.navigate('somewhere')}>Go Here</Button>


        </Container>
    );
}






