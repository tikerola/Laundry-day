import { FETCH_STATS, TOGGLE_DATABASE_UPDATED } from "../actions/stats"
import { CLEAR_USER } from "../actions/auth"

const initialState = {
    choresByDate: {},
    databaseUpdated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATS:
            return {
                ...state,
                choresByDate: action.stats
            }
        case TOGGLE_DATABASE_UPDATED:
            return {
                ...state,
                databaseUpdated: !state.databaseUpdated
            }

        case CLEAR_USER:
            return initialState

        default:
            return state
    }
}