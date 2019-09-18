import moment from 'moment'

export const ADD_CHORE = 'ADD_CHORE'
export const SAVE_CHORES = 'SAVE_CHORES'
export const FETCH_CHORES = 'FETCH_CHORES'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'


export const fetchChores = userId => {

    let date = moment().format('L').replace(/\//g, '')


    return async dispatch => {
        const response = await fetch(`https://laundry-app-7a4cd.firebaseio.com/${userId}/chores/${date}.json`)
        const resData = await response.json()


        if (resData === null)
            return


        const chores = []

        for (let chore of resData) {
            if (chore) {
                chores.push(chore)
            }
        }


        dispatch({ type: FETCH_CHORES, chores })
    }
}

export const addChore = (chore, duration) => {

    const date = moment().format('L')
    return {
        type: ADD_CHORE,
        chore,
        duration,
        date
    }
}

export const saveChores = userId => {

    let date = moment().format('L').replace(/\//g, '')


    return async (dispatch, getState) => {
        const state = getState()
        const { chores } = state.chores
        const { token } = state.auth

        try {
            const response = await fetch(`https://laundry-app-7a4cd.firebaseio.com/${userId}/chores/${date}.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(chores)
                }

            )

            if (!response.ok) {
                throw new Error('WTF, saveChores, man!')
            }

        } catch (err) {
            throw new Error('Something went wrong')
        }

    }
}

export const toggleLoading = () => {

    return {
        type: TOGGLE_LOADING
    }
}