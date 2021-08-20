import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SecureStore from 'expo-secure-store'
import { useDispatch, useSelector } from 'react-redux'

import { setUserToken } from './features/auth/authSlice'


//Screens
import SplashScreen from './screens/startup/SplashScreen'
import LoginScreen from './screens/startup/LoginScreen'
import SignupScreen from './screens/startup/SignupScreen'
import ForgotPasswordScreen from './screens/startup/ForgotPasswordScreen'
import BulletinScreen from './screens/bulletin/BulletinScreen'

const Stack = createNativeStackNavigator()

export default function Navigator() {

    const dispatch = useDispatch()
    const userToken = useSelector((state) => state.auth.userToken)
    const isLoggedOut = useSelector((state) => state.auth.isLoggedOut)

    const [showPlashScreen, setShowSplashScreen] = React.useState(true)

    const getAuthTokenFromStorage = async () => {
        let result = await SecureStore.getItemAsync('auth_token')
        return result
    }

    React.useEffect(() => {

        let mounted = true
        if (!mounted) return

        const initializeComponent = async () => {
            let token
            try {
                token = await getAuthTokenFromStorage()
            } catch (error) {
                token = false
            }

            // Set token (pass or fail)
            setUserToken('token')

            // Remove splash screen to show login, or app home
            setShowSplashScreen(false)

            console.log('isLoggedOut', isLoggedOut)

        }
        initializeComponent()



        return function cleanUp() {
            mounted = false
        }
    }, [isLoggedOut])

    if (showPlashScreen)
        return <SplashScreen />

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isLoggedOut
                        ? (
                            <>
                                <Stack.Screen
                                    name="Login"
                                    component={LoginScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Signup"
                                    component={SignupScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="ForgotPassword"
                                    component={ForgotPasswordScreen}
                                    options={{ headerShown: false }}
                                />
                            </>
                        )
                        : (
                            <Stack.Screen
                                name="Bulletin"
                                component={BulletinScreen}
                            />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}