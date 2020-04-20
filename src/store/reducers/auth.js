/**
 * Reducer for authentication
 */
import * as actionTypes from '../actions/actionTypes'
import updateObject from '../utility'

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

// To set the path after the user successfully signs in
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_START: return authStart(state, action);
        case actionTypes.AUTHENTICATION_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTHENTICATION_FAIL: return authFail(state, action);
        case actionTypes.AUTHENTICATION_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTHENTICATION_REDIRECTPATH: return setAuthRedirectPath(state, action);
        default: return state;
    }

}

export default reducer;