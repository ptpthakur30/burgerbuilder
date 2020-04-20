/**
 * Defines the action creator for the burgerBuilder container
 */
import * as actionTypes from './actionTypes'
import Axios from '../../axios-order'
// Adds the ingredient
export const addIngredients = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredients = (ingredientName) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: ingredientName
    }
}
// It will call the axios and dispatch the actions based on the response of the axios
export const initIngredients = () => {
    return dispatch => {
        Axios.get('https://burger-builder-7d519.firebaseio.com/ingredients.json')
            .then(response =>
                dispatch(setIngredients(response.data))
            ).catch(error => {
                dispatch(setIngredientsFailed())
            })
    }
}

// For storing the value of ingredients on store
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
    }
}