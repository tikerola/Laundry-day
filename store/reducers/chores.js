import { CHORES } from '../../data/chores'
import { ADD_CHORE, FETCH_CHORES, TOGGLE_LOADING } from '../actions/chores'
import { CLEAR_USER } from '../actions/auth'


const initialState = {
    chores: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHORES:
            return {
                ...state,
                chores: action.chores
            }
        case ADD_CHORE:
            return {
                ...state,
                chores: state.chores.concat({
                    id: new Date().toString(),
                    chore: action.chore,
                    duration: +action.duration,
                    date: action.date
                })
            }

            case TOGGLE_LOADING: 
            return {
                ...state,
                loading: !state.loading
            }
            case CLEAR_USER:
                return initialState
        default:
            return state
    }
}