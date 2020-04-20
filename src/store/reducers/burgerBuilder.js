/**
 * Reducer is a fucntion that takes the old state and action and returns the new state based on the action type
 */
import * as actionTypes from '../actions/actionTypes'
import updateObject from '../utility'

// The price of individual ingerdient
const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 20
};

// Initial state
const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building:false
}

const addIngredients = (state, action) => {
    return {
        ...state,
        // It will create a copy as well as overwrite the old with new value
        ingredients: {
            ...state.ingredients,
            // This will assign a new value to the passes property
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
}

const deleteIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state,
        // ingredients : action.ingredients,
        {
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            totalPrice: 5,
            error: false,
            building:false
        })
}

const setIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // for adding the ingredients
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        // for removing the ingredients
        case actionTypes.DELETE_INGREDIENT: return deleteIngredients(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_INGREDIENTS_FAILED: return setIngredientsFailed(state, action);
        default: return state;
    }
}
export default reducer;