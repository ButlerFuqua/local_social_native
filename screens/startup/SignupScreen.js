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

export default function SignupScreen({ navigation }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const signupClicked = () => {
        console.log('username', username)
        console.log('password', password)
    }

    const goToLoginClicked = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Create Account</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button
                title="Sign Up"
                onPress={signupClicked}
            />
            <Button
                title="Go to Login"
                onPress={goToLoginClicked}
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