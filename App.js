import 'react-native-gesture-handler'
import * as React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

import Navigator from './AppNavigator'

export default function App() {

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}