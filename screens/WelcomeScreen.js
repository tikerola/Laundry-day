import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/actions/auth'
import * as FileSystem from 'expo-file-system'



const WelcomeScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {

        const tryGetUserId = async () => {

            let userId

            try {
                const path = FileSystem.documentDirectory + "laundry_day_userId.txt"
                const info = await FileSystem.readAsStringAsync(path)
                userId = info.split(',')[0]
                const email = info.split(',')[1]
                dispatch(setUser(userId, email))
                
            } catch (error) {
                console.log(error)
            }


            setTimeout(() => {
               
                if (userId)
                    props.navigation.navigate('Chore')
                else
                    props.navigation.navigate('Auth')
            }, 2000)

        }

        tryGetUserId()

    }, [])

    return <View style={styles.container}>
        <Text style={styles.title}>Laundry Day</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'palegreen'
    },
    title: {
        fontSize: 36,
        color: 'green',
        fontFamily: 'drive'
    }
})

export default WelcomeScreen