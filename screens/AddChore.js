import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { addChore } from '../store/actions/chores'
import CustomButton from '../components/CustomButton'
import { withTheme } from 'react-native-paper'


const AddChore = props => {

    const [newChore, setNewChore] = useState('')
    const [duration, setDuration] = useState('')
    const dispatch = useDispatch()
    const darkTheme = useSelector(state => state.theme.darkTheme)
    const { theme } = props

    const handleSend = () => {
        if (!newChore || !duration || isNaN(duration)) {
            Alert.alert('Not gonna happen', 'Both fields need to be filled', [{ text: 'Roger' }])
            return
        }
        dispatch(addChore(newChore, duration))
        setNewChore('')
        props.navigation.goBack()
    }

    return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <View style={{ ...styles.container, backgroundColor: theme(darkTheme).bGMain }}>
            <Text style={{ ...styles.title, color: theme(darkTheme).header }}>Here you add Chores</Text>
            <Card style={{ ...styles.card, backgroundColor: theme(darkTheme).cardBg }}>

                <View style={styles.choreContainer}>

                    <Text style={{ ...styles.label, color: theme(darkTheme).header }}>New Chore:</Text>
                    <TextInput
                        style={{ ...styles.textInput, color: theme(darkTheme).text, borderBottomColor: theme(darkTheme).underline  }}
                        onChangeText={(text) => setNewChore(text)}
                        value={newChore}
                        placeholder='Add a new chore'
                        placeholderTextColor={theme(darkTheme).placeholder}
                    />
                    <Text style={{ ...styles.label, color: theme(darkTheme).header }}>Duration:</Text>
                    <TextInput
                        style={{ ...styles.textInput, color: theme(darkTheme).text, borderBottomColor: theme(darkTheme).underline }}
                        onChangeText={(text) => setDuration(text)}
                        value={duration}
                        placeholder='Estimated duration in minutes'
                        placeholderTextColor={theme(darkTheme).placeholder}
                        keyboardType='number-pad'
                    />
                    <View style={styles.button}>
                        <CustomButton textStyles={{ fontFamily: 'drive' }} onPress={handleSend}>Send</CustomButton>
                    </View>
                </View>

            </Card>
        </View>
    </TouchableWithoutFeedback>
}

AddChore.navigationOptions = navData => {
    const bgColor = navData.navigation.getParam('color')
    

    return {
        headerTitle: 'Add Chore',
        headerStyle: {
            backgroundColor: bgColor
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        height: '60%'
    },
    title: {
        fontSize: 30,
        fontFamily: 'drive',
        marginTop: 30,
        marginBottom: 20
    },
    choreContainer: {
        alignItems: 'center',
        paddingTop: 30
    },
    textInput: {
        height: 40,
        width: '80%',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    button: {
        marginTop: 20,
        width: '50%'

    },
    label: {
        fontFamily: 'drive',
        fontSize: 20,
        letterSpacing: 2
    }
})

export default withTheme(AddChore)