import React, { useState, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import Card from '../components/Card'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, login, clearUser } from '../store/actions/auth'
import { withTheme } from 'react-native-paper'

const AuthScreen = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const darkTheme = useSelector(state => state.theme.darkTheme)
    const dispatch = useDispatch()

    const { theme } = props

    useLayoutEffect(() => {
        props.navigation.setParams({ color: theme(darkTheme).navigation.topBg })
    }, [darkTheme])

    const handleLoginandSignup = async () => {

        try {
            if (isLogin)
                await dispatch(login(email, password))

            else
                await dispatch(signUp(email, password))

            setEmail('')
            setPassword('')
            props.navigation.navigate('Chores')

        } catch (error) {
            Alert.alert(error.message, 'Please check again your input', [{ text: 'Roger' }])
        }
    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >

            <View style={{ ...styles.authScreen, backgroundColor: theme(darkTheme).bGMain }}>
                <NavigationEvents onWillFocus={payload => {
                    dispatch(clearUser())
                }} />
                <View style={styles.mainTitleContainer}>
                    <Text style={{ ...styles.mainTitle, color: theme(darkTheme).header }}>Sign in or Sign up</Text>
                </View>
                <View style={styles.loginTextContainer}>
                    <Text onPress={() => setIsLogin(true)} style={{
                        ...styles.loginText,
                        color: theme(darkTheme).header,
                        ...(isLogin ? { ...styles.isActive, textDecorationColor: theme(darkTheme).underline } : {})
                    }}
                    >Login</Text>
                    <Text onPress={() => setIsLogin(false)} style={{
                        ...styles.loginText,
                        color: theme(darkTheme).header,
                        ...(isLogin ? {} : { ...styles.isActive, textDecorationColor: theme(darkTheme).underline })
                    }}
                    >Sign Up</Text>
                </View>
                <Card style={{ ...styles.card, backgroundColor: theme(darkTheme).cardBg }}>
                    <Text style={{ ...styles.label, color: theme(darkTheme).header }}>Email:</Text>
                    <TextInput style={{ ...styles.textInput, color: theme(darkTheme).text, borderBottomColor: theme(darkTheme).underline }}
                        placeholder='Email'
                        placeholderTextColor={theme(darkTheme).placeholder}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <Text style={{ ...styles.label, color: theme(darkTheme).header }}>Password:</Text>
                    <TextInput style={{ ...styles.textInput, color: theme(darkTheme).text, borderBottomColor: theme(darkTheme).underline }}
                        placeholder='Password'
                        placeholderTextColor={theme(darkTheme).placeholder}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                    <View style={styles.button}>
                        <CustomButton
                            onPress={handleLoginandSignup}
                            textStyles={{ fontFamily: 'drive' }}

                        >
                            Send
                            </CustomButton>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>

    )
}

AuthScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Welcome Stranger!',
        headerStyle: {
            backgroundColor: navData.navigation.getParam('color')
        }
    }
}

const styles = StyleSheet.create({
    authScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    scrollView: {
        flex: 1,
    },

    mainTitleContainer: {
        width: '100%',
        marginTop: 30,
        marginBottom: 15
    },
    mainTitle: {
        fontFamily: 'drive',
        fontSize: 32,
        textAlign: 'center'
    },
    loginTextContainer: {
        width: '80%',
        flexDirection: 'row',
        marginBottom: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    loginText: {

        fontFamily: 'drive',
        letterSpacing: 2,
        fontSize: 20
    },
    isActive: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },
    card: {
        width: '80%',
        height: '50%',
        paddingTop: 10,
        alignItems: 'center'
    },
    label: {
        fontFamily: 'drive',
        fontSize: 20,
        letterSpacing: 2
    },
    textInput: {
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 10
    },
    button: {
        width: '50%',
        marginTop: 15
    }
})

export default withTheme(AuthScreen)