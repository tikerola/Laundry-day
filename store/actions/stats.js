import { FETCH_CHORES } from "./chores"

export const FETCH_STATS = 'FETCH_STATS'
export const TOGGLE_DATABASE_UPDATED = 'TOGGLE_DATABASE_UPDATED'

export const toggleDatabaseUpdated = () => {
    return {
        type: TOGGLE_DATABASE_UPDATED
    }
}

export const fetchStats = userId => {

    return async (dispatch) => {
        
        
        try {
            const response = await fetch(`https://laundry-app-7a4cd.firebaseio.com/${userId}/chores.json`)

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
    
            const resData = await response.json()
            
    
            dispatch({
                type: FETCH_STATS,
                stats: resData
            })


        } catch (err) {
            throw new Error('Loading failed')
        }
       
    }
}