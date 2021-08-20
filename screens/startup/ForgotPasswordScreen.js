import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native'

export default function ForgotPasswordScreen({ navigation }) {

    const [username, setUsername] = useState("")

    const submitUsernameClicked = () => {
        console.log('username', username)
    }

    const goToLoginClicked = () => {
        navigation.navigate('Login')
    }

    const goToSignupClicked = () => {
        navigation.navigate('Signup')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Enter email or username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <Button
                title="Submit"
                onPress={submitUsernameClicked}
            />
            <Button
                title="Go to Login"
                onPress={goToLoginClicked}
            />
            <Button
                title="Go to Signup"
                onPress={goToSignupClicked}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        margin: 12,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
})