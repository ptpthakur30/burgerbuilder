import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga } from './auth'

// It is a listener to the action type
// Yield means wait for the execution of the function
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTHENTICATION_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTHENTICATION_CHECK_TIMEOUT, checkAuthTimeoutSaga)
} 