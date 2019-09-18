import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import WelcomeScreen from '../screens/WelcomeScreen'
import ChoresScreen from '../screens/ChoresScreen'
import AddChore from '../screens/AddChore'
import AuthScreen from '../screens/AuthScreen'
import StatsScreen from '../screens/StatsScreen'
import StatsDetailScreen from '../screens/StatsDetailScreen'
import Colors from '../constants/Colors'


const ChoresNavigator = createStackNavigator({
    Chore: ChoresScreen,
    AddChore: AddChore
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.navigation.headerTint,
        headerStyle: {
            backgroundColor: Colors.navigation.topBg
        },
        headerTitleStyle: {
            fontFamily: 'drive',
            fontWeight: '200',
            letterSpacing: 2
        }
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.navigation.headerTint,
        headerStyle: {
            backgroundColor: Colors.navigation.topBg
        },
        headerTitleStyle: {
            fontFamily: 'drive',
            fontWeight: '200',
            letterSpacing: 2
        }
    }
})

const StatsNavigator = createStackNavigator({
    Stats: StatsScreen,
    StatsDetail: StatsDetailScreen
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.navigation.headerTint,
        headerStyle: {
            backgroundColor: Colors.navigation.topBg
        },
        headerTitleStyle: {
            fontFamily: 'drive',
            fontWeight: '200',
            letterSpacing: 2
        }
    },
    navigationOptions: {
        tabBarOnPress({ navigation, defaultHandler }) {
            defaultHandler()

        }
    }
})



const LaundryNavigator = createSwitchNavigator({
    Welcome: WelcomeScreen,
    Auth: AuthNavigator

}, {
    navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            navigation.navigate('Auth')
        }
    }
})



const BottomTabNavigator = createBottomTabNavigator({
    'Change User': {
        screen: LaundryNavigator, navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name='md-people' size={25} color={tabInfo.tintColor} />
            },
            tabBarVisible: false
        }
    },
    Chores: {
        screen: ChoresNavigator, navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name='md-done-all' size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Stats: {
        screen: StatsNavigator, navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name='md-stats' size={25} color={tabInfo.tintColor} />
            },
            resetOnBlur: true
        }
    }

}, {
    tabBarOptions: {
        activeTintColor: Colors.navigation.tabTint,
        style: {
            backgroundColor: Colors.navigation.tabBg
        }
    }
})



export default createAppContainer(BottomTabNavigator)


