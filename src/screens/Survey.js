import React from "react"
import { Checkbox, Center, NativeBaseProvider, Button, Heading } from "native-base"
export const Survey = ({ navigation }) => {
    const [groupValues, setGroupValues] = React.useState([])
    return (
        <Center height="50%">
            <Heading size="md">Tonight's Vibes</Heading>
            <Checkbox.Group
                onChange={setGroupValues}
                value={groupValues}
                accessibilityLabel="choose numbers"
            >
                <Checkbox value="1" my={1}>Karaoke</Checkbox>
                <Checkbox value="2" my={1}>Dive Bar</Checkbox>
                <Checkbox value="3" my={1}>Happy Hour</Checkbox>
                <Checkbox value="4" my={1}>Sports</Checkbox>
                <Checkbox value="5" my={1}> Dancing</Checkbox>
                <Checkbox value="6" my={1}>LGBTQ+</Checkbox>
            </Checkbox.Group>

            <Button onPress={() => navigation.navigate('Recommend')}>Submit</Button>

        </Center >
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
        </NativeBaseProvider>
    )
}