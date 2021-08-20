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
import { useDispatch } from 'react-redux'

import { updateUserData } from '../../features/user/userSlice'
import { logoutUser } from '../../features/auth/authSlice'

export default function BulletinScreen({ navigation }) {

    const username = useSelector((state) => state.username)
    const dispatch = useDispatch()

    const logoutClicked = () => {
        //Save user to App state
        dispatch(updateUserData({
            username: null,
            email: null,
            token: null,
        }))

        // Remove auth token and loggedOut to true
        dispatch(logoutUser())
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="coral"
            />
            <Text style={styles.titleText}>Bulletin</Text>
            <Button
                title="logout"
                onPress={logoutClicked}
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