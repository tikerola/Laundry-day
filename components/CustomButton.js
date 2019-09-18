import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CustomButton = ({containerStyles, textStyles, children, onPress, disabled}) => {

    return <TouchableOpacity disabled={disabled} onPress={onPress} >
        <View style={{...styles.button, ...containerStyles}}>
            <Text style={{...styles.text, ...textStyles, ...{color: disabled ? '#999' : 'white' }}} >{children}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 35,
        borderRadius: 5,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})

export default CustomButton