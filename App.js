import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LaundryNavigator from './navigation/LaundryNavigator'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import choresReducer from './store/reducers/chores'
import authReducer from './store/reducers/auth'
import statsReducer from './store/reducers/stats'
import themeReducer from './store/reducers/theme'
import thunk from 'redux-thunk'
import { Provider as PaperProvider } from 'react-native-paper'
import * as Font from 'expo-font'

import { useScreens } from 'react-native-screens';
useScreens();

const DarkTheme = (dark = false) => {
  return {
    bGMain: dark ? 'black' : 'palegreen',
    cardBg: dark ? '#333' : 'white',
    header: dark ? "#777" : 'black',
    text: dark ? "#777" : 'black',
    placeholder: dark ? '#555' : '#999',
    underline: dark ? '#555' : '#999',
    statsTotalLine: dark ? '#555' : 'black',
    navigation: {
      topBg: dark ? 'black' : 'green',
      bottomBg: 'black',
      headerTint: 'white',
      tabTint: 'yellow',
      tabBg: 'black'
    },
    welcome: {
      text: 'green'
    }
  }
}


const rootReducer = combineReducers({
  chores: choresReducer,
  auth: authReducer,
  stats: statsReducer,
  theme: themeReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'drive': require('./assets/fonts/FFF_Tusj.ttf'),
        'drive_two': require('./assets/fonts/Midnight_Drive_Two.otf')
      })
      setLoading(false)
    }
    loadFonts()
  }, [])


  if (loading) {
    return <View></View>
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={DarkTheme} >
        <LaundryNavigator />
      </PaperProvider>
    </Provider>
  );
}

