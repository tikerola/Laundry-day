import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {

    return <View style={{...styles.cardContainer, ...props.style}}>
        {props.children}
    </View>
}

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 10
    }
})

export default Card