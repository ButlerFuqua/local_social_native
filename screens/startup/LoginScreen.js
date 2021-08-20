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
import * as SecureStore from 'expo-secure-store'
import { useDispatch } from 'react-redux'

import { updateUserData } from '../../features/user/userSlice'
import { setUserToken } from '../../features/auth/authSlice'
import PrimarySpinner from '../../comopnents/progress/PrimarySpinner'
import { API_URL } from "@env"


export default function LoginScreen({ navigation }) {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const simulateError = false
    const fakeWaitTime = 600
    const getTokenFromApi = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!simulateError) {
                resolve({
                    success: true,
                    message: 'token received',
                    token: 'SUPER_LONG_TOKEN',
                    userData: {
                        username,
                        email: `${username}@site.com`
                    }
                })
            } else {
                reject('There was an error getting the token')
            }
        }, fakeWaitTime)
    })

    const loginClicked = async () => {

        setIsLoading(true)

        // Get token from API
        let response
        try {
            response = await getTokenFromApi(username, password)
        } catch (error) {
            console.log('error', error)
            response = {
                success: false,
                message: error.message || JSON.stringify(error),
            }
        }

        const { success, message, token, userData: { username: resUsername, email } } = response

        if (!success) {
            alert(message)
            setIsLoading(false)
            return
        }

        // Save token to storage
        await SecureStore.setItemAsync('auth_token', token)

        //Save user to App state
        dispatch(updateUserData({
            username: resUsername,
            email,
            token,
        }))

        // Set auth token and loggedOut to false
        dispatch(setUserToken(token))

    }

    const forgotPasswordClicked = () => {
        navigation.navigate('ForgotPassword')
    }

    const createAccountClicked = () => {
        navigation.navigate('Signup')
    }

    return (
        !isLoading
            ? (
                <View style={styles.container}>
                    <Text style={styles.titleText}>Login</Text>
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
                        title="Login"
                        onPress={loginClicked}
                    />
                    <Button
                        title="Forgot Password"
                        onPress={forgotPasswordClicked}
                    />
                    <Button
                        title="Create an account"
                        onPress={createAccountClicked}
                    />
                </View>
            )
            : <PrimarySpinner />
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