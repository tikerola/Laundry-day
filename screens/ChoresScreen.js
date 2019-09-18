import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    ScrollView,
    Switch
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Card from '../components/Card'
import { saveChores, fetchChores } from '../store/actions/chores'
import CustomButton from '../components/CustomButton'
import { toggleDatabaseUpdated } from '../store/actions/stats'

import { withTheme } from 'react-native-paper'
import { toggleDarkTheme } from '../store/actions/theme'



const ChoresScreen = props => {
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const { userId, email } = useSelector(state => state.auth)
    const [refresh, setRefresh] = useState(false)
    const [ darkTheme, setDarkTheme ] = useState(false)

    const dispatch = useDispatch()
    const dark = useSelector(state => state.theme.darkTheme)
    const chores = useSelector(state => state.chores.chores)

    const { theme } = props

    useEffect(() => {

        const fetch = async () => {
            await dispatch(fetchChores(userId))
            setLoading(false)

        }
        fetch()

    }, [userId])


    const setNavigationDark = () => {
        props.navigation.navigate('AddChore', { color: theme(dark).navigation.topBg })
    }

    useEffect(() => {
        props.navigation.setParams({ color: theme(dark).navigation.topBg, navigate: setNavigationDark })
        setDarkTheme(dark)
        
    }, [dark])


    return (

        <ScrollView contentContainerStyle={[styles.screen, { backgroundColor: theme(darkTheme).bGMain }]}>
            {loading ? <View style={styles.indicator}><ActivityIndicator size='large' /></View> :
                (<View style={styles.container}>

                    <Text style={{ ...styles.title, color: theme(darkTheme).header }}>What I've done today</Text>
                    <View style={styles.statsCardButtonContainer}>
                        <View style={styles.stats}>
                            <Text style={{ ...styles.subTitle, color: theme(darkTheme).text }}>Chores done: {chores.length}</Text>
                            <Text style={{ ...styles.subTitle, color: theme(darkTheme).text }}>Duration: {chores.reduce((acc, next) => acc + next.duration, 0)} min</Text>
                        </View>
                        <Card style={{ ...styles.card, backgroundColor: theme(darkTheme).cardBg }}>
                            {isSaving ? <ActivityIndicator size='large' /> :
                                <FlatList
                                    data={chores}
                                    extraData={() => setRefresh(!refresh)}
                                    keyExtractor={item => item.id}
                                    renderItem={itemData => <View style={{ ...styles.itemContainer, borderBottomColor: theme(darkTheme).underline }}>
                                        <Text style={{ ...styles.itemText, color: theme(darkTheme).text }}>
                                            {itemData.item.chore}
                                        </Text>
                                    </View>}
                                />}
                        </Card>
                        <View style={styles.buttonContainer}>
                            <CustomButton disabled={!userId} textStyles={{ fontFamily: 'drive' }} onPress={async () => {
                                setIsSaving(true)
                                try {
                                    await dispatch(saveChores(userId))
                                    setIsSaving(false)
                                    Alert.alert('Congrats!', 'Your chores have been saved to a database', [{ text: 'Roger' }])
                                    dispatch(toggleDatabaseUpdated())
                                } catch (err) {
                                    Alert.alert(err)
                                }
                            }}
                            >
                                Save
                            </CustomButton>
                        </View>
                    </View>
                    <View style={styles.switchAndEmail}>

                        <View style={styles.switch}>
                            <Switch
                                onValueChange={() => dispatch(toggleDarkTheme())}
                                value={dark}
                            />
                        </View>

                        <View style={styles.email} >
                            <Text style={{ color: theme(darkTheme).text }}>{email}</Text></View>
                    </View>
                </View>)}
        </ScrollView>
    )
}

ChoresScreen.navigationOptions = navData => {
    const color = navData.navigation.getParam('color')
    
    return {
        headerTitle: 'Chores',
        headerStyle: {
            backgroundColor: !color ? 'green' : color
        },
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title='Add Chore' iconName='md-add' onPress={navData.navigation.getParam('navigate')} />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsCardButtonContainer: {
        width: '80%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    stats: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    card: {
        width: '100%',
        height: '100%',
        padding: 15,
        marginBottom: 15
    },
    title: {
        fontSize: 32,
        fontFamily: 'drive'
    },
    subTitle: {
        fontSize: 14,
        fontFamily: 'drive'
    },
    itemContainer: {
        marginBottom: 5,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        paddingLeft: 5,
        borderBottomColor: '#777'
    },
    itemText: {
        fontSize: 18,
        fontFamily: 'drive',
        letterSpacing: 2,
        color: '#777'
    },
    buttonContainer: {
        width: '50%'
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchAndEmail: {
        width: '100%',
        flexDirection: 'row',

    },
    switch: {
        width: '25%',
        justifyContent: 'flex-start'
    },
    email: {
        width: '50%',
        alignItems: 'center'
    }
})

export default withTheme(ChoresScreen)