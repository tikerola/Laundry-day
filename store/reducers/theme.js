import { TOGGLE_DARK_THEME } from "../actions/theme"

const initialState = {
    darkTheme: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DARK_THEME:
            return {
                darkTheme: !state.darkTheme
            }
        default:
            return state
    }
}