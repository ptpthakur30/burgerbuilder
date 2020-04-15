import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-order'
export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        id : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
}

export const purchaseBurgerStart = ()=>{
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData)=>{
    return dispatch=>{
        // We can call 2 action function from action creater
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response=>{
            // The response.data consists of the id 
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data,orderData))
        }).catch(
            error=>{
                dispatch(purchaseBurgerFail(error));
            }
        )
    }
}