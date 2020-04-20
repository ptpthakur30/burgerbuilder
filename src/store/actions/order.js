/**
 * All action types for orders
 */
import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-order'
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

// For purchasing the burger
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        // We can call 2 action function from action creater
        dispatch(purchaseBurgerStart());
        // passing the auth token for authentication
        axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                // The response.data consists of the id 
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(
                error => {
                    dispatch(purchaseBurgerFail(error));
                }
            )
    }
}

// For showing the loading screen on purchase begin
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

// For redirecting the page to home page on succesful purchase
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

// Logging the error message on purchase fail
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

// To get the loading icon
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

// To fetch the orders from database and pass the token for authentication
export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        // pass the auth token
        // pass the orderBy="userId" and &equalTo="userId" for filtering by userId
        const queryParams = '?auth='+token+'&orderBy="userId"'+'&equalTo="'+userId+'"'
        // passing the auth token
        axios.get('/orders.json'+queryParams)
            .then(response => {
                const fetchedata = [];
                for (let key in response.data) {
                    fetchedata.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedata))
            })
            .catch(error => {
                dispatch(fetchOrderFail(error))
            })
    }
}