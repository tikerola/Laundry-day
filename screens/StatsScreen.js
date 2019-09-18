import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats, toggleDatabaseUpdated } from '../store/actions/stats'
import * as helpers from '../helpers/helpers'
import moment from 'moment'
import { withTheme } from 'react-native-paper'
import { NavigationEvents } from 'react-navigation'


const StatsScreen = props => {
    const [isLoading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const stats = useSelector(state => state.stats.choresByDate)
    const darkTheme = useSelector(state => state.theme.darkTheme)
    const userId = useSelector(state => state.auth.userId)
    const databaseUpdated = useSelector(state => state.stats.databaseUpdated)
    const readyToRender = stats !== null && Object.keys(stats) !== null && stats[Object.keys(stats)[0]] !== undefined
    const { theme } = props

    useEffect(() => {
        const getStats = async () => {
            if (userId) {
                try {
                    await dispatch(fetchStats(userId))
                    setIsLoading(false)

                    if (databaseUpdated) {
                        dispatch(toggleDatabaseUpdated())
                    }
                } catch (err) {
                    Alert.alert('There seems to be a problem', err.message, [{ text: 'Roger' }])
                }
            }
        }
        getStats()
    }, [userId, databaseUpdated])

    useLayoutEffect(() => {
        props.navigation.setParams({ color: theme(darkTheme).navigation.topBg })
    }, [darkTheme])

    if (isLoading) {
        return <View style={{ ...styles.spinner, backgroundColor: theme(darkTheme).bGMain }}>
            <ActivityIndicator size='large' />
        </View>
    }

    return <View style={{ ...styles.container, backgroundColor: theme(darkTheme).bGMain }}>
    
        <Text style={{ ...styles.title, color: theme(darkTheme).header }}>Pick a Date</Text>
        <View style={styles.flatList}>
            {readyToRender ? (<FlatList
                data={helpers.returnKeys(stats)}
                extraData={() => setRefresh(!refresh)}
                keyExtractor={item => item}
                renderItem={itemData => {
                    return <TouchableOpacity onPress={() => props.navigation.navigate('StatsDetail',
                        { date: moment(itemData.item, 'MMDDYYYY').format('LL'), 
                        data: stats[itemData.item],
                    color: theme(darkTheme).navigation.topBg })} >
                        <Text style={{ marginHorizontal: 15, marginVertical: 10, color: theme(darkTheme).text }}>
                            {moment(itemData.item, 'MMDDYYYY').format('LL')}
                        </Text>
                    </TouchableOpacity>
                }}
                numColumns={2}
            />) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Nothing to Show</Text></View>}
        </View>
    </View>
}

StatsScreen.navigationOptions = navData => {
    const color = navData.navigation.getParam('color')

    if (color) {
        return {
            headerTitle: 'Your Stats',
            headerStyle: {
                backgroundColor: color
            }
        }
    }
    
    return {
        headerTitle: 'Your Stats'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'drive',
        fontSize: 32,
        marginBottom: 20
    },
    flatList: {
        width: '85%',
        height: '80%',

    },
    itemContainer: {
        flex: 1
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default withTheme(StatsScreen)