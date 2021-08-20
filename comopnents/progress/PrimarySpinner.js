import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

export default function PrimarySpinner() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Loading...</Text>
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
})
