import { SIGN_UP, SIGN_IN, FETCH_USER, CLEAR_USER, SET_USER } from "../actions/auth"

const initialState = {
    userId: '',
    token: '',
    email: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
        case SET_USER:
            return {
                ...state,
                userId: action.userId,
                email: action.email
            }
        case SIGN_UP:
            return {
                userId: action.userId,
                token: action.token,
                email: action.email
            }

        case SIGN_IN:
            return {
                userId: action.userId,
                token: action.token,
                email: action.email
            }

        case CLEAR_USER:
            return initialState

        default:
            return state
    }
}