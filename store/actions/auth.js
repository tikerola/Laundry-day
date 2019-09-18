import ENV from '../../env'
import * as FileSystem from 'expo-file-system'


export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const FETCH_USER = 'FETCH_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const SET_USER = 'SET_USER'

export const clearUser = () => ({
    type: CLEAR_USER
})

export const setUser = (userId, email) => ({
    type: SET_USER,
    userId,
    email
})


export const signUp = (email, password) => {

    return async dispatch => {

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecurityToken: true
            })
        })

        if (!response.ok) {
            throw new Error('Authentication Failed')
        }

        const { localId, idToken } = await response.json()

        const path = FileSystem.documentDirectory + "laundry_day_userId.txt"

        try {
            await FileSystem.writeAsStringAsync(path, localId + ',' + email)
           
        } catch (error) {
            throw new Error('Problem writing to a file')
        }
        

        dispatch({ type: SIGN_UP, userId: localId, token: idToken, email })
    }
}

export const login = (email, password) => {
    return async dispatch => {

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecurityToken: true
            })
        })

        if (!response.ok) {
            throw new Error('Authentication Failed')
        }

        const { localId, idToken } = await response.json()

        const path = FileSystem.documentDirectory + "laundry_day_userId.txt"

        try {
            await FileSystem.writeAsStringAsync(path, localId + ',' + email)
           
        } catch (error) {
            throw new Error('Problem writing to a file')
        }
        
        dispatch({ type: SIGN_IN, userId: localId, token: idToken, email })
    }
}