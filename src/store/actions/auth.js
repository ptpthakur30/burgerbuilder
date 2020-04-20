// Action creator for Authentication
import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const authStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        token: token,
        userId: userId
    }
}

// To set the time of the logout
export const checkAuthTimeout = (expirationTime) => {
    return dispatch=>{
        setTimeout(() => {
            dispatch(authLogout())
            // For converting to milliseconds
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        // We just differentiate url based on the isSignUp value 
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjDXiGrxj3mq0IcoiCbOYy3WiUHSl1ntg'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjDXiGrxj3mq0IcoiCbOYy3WiUHSl1ntg'
        }
        axios.post(url, authData)
            .then(response => {
                // We are passing the token and userId 
                // Passing only the relevant data
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                // To set the logout time , i.e null the token
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAIL,
        error: error
    }
}
export const authLogout = () => {
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    }
}
