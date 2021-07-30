import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ // throwing an object
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post( //make the api call to get back the user token 
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        // if this dispatch is success, send the payload 
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// export const logout = () => (dispatch) => {
//     localStorage.removeItem('userInfo')
//     dispatch({ type: USER_LOGOUT })
//     dispatch({ type: USER_DETAILS_RESET })
//     dispatch({ type: ORDER_LIST_MY_RESET })
//     dispatch({ type: USER_LIST_RESET })
// }
