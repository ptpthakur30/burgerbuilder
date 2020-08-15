// The saga class that will segregate the side effects from the action 

import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions/index'
export function* logoutSaga(action) {
    // remove local storage
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    // The yield is to wait for the statment to run
    // The put will dispatch the action to reducers
    yield put(actions.logoutsucceed())
}

export function* checkAuthTimeoutSaga(action) {
    // For converting to milliseconds
    yield delay(action.expirationTime*1000);
    yield put(actions.logoutsucceed())
}