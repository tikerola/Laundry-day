import React, {useLayoutEffect} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { withTheme } from 'react-native-paper'


const StatsDetailScreen = props => {

    const date = props.navigation.getParam('date')
    const data = props.navigation.getParam('data')
    const darkTheme = useSelector(state => state.theme.darkTheme)

    const { theme } = props

    useLayoutEffect(() => {
        props.navigation.setParams({ color: theme(darkTheme).navigation.topBg })
    }, [darkTheme])

    return <View style={{...styles.screen, backgroundColor: theme(darkTheme).bGMain}}>
        <Text style={{...styles.title, color: theme(darkTheme).header}}>{date}</Text>
        <ScrollView style={styles.scrollView}>
            {data.map(chore => <View key={chore.id} style={styles.textContainer}>
                <View style={{width: '70%'}}>
                <Text style={{...styles.text, color: theme(darkTheme).text}}>{chore.chore}</Text>
                </View>
                <View style={{width: '30%', alignItems: 'flex-end'}}>
                <Text style={{...styles.text, color: theme(darkTheme).text}}>{chore.duration} min</Text>
                </View>
            </View>)}
            <View style={{...styles.totalContainer, borderTopColor: theme(darkTheme).statsTotalLine}}>
                <Text style={{...styles.text, color: theme(darkTheme).text}}>Total: {data.reduce((a, b) => a + b.duration, 0)} minutes</Text>
            </View>

        </ScrollView>
    </View>
}

StatsDetailScreen.navigationOptions = navData => {
    color = navData.navigation.getParam('color')

    return {
        headerTitle: 'Day\'s Chores',
        headerStyle: {
            backgroundColor: color
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontFamily: 'drive',
        marginTop: 30,
        marginBottom: 20
    },
    scrollView: {
        width: '80%',
        height: '80%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 20,
        fontFamily: 'drive'
    },
    totalContainer: {
        alignItems: 'flex-end',
        borderTopWidth: 2
    }
})

export default withTheme(StatsDetailScreen)