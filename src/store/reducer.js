/**
 * Reducer is a fucntion that takes the old state and action and returns the new state based on the action type
 */
import * as actionTypes from './actions'
// The price of individual ingerdient
const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 20
};

// Initial state
const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // for adding the ingredients
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // It will create a copy as well as overwrite the old with new value
                ingredients: {
                    ...state.ingredients,
                    // This will assign a new value to the passes property
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        // for removing the ingredients
        case actionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                // It will create a copy as well as overwrite the old with new value
                ingredients: {
                    ...state.ingredients,
                    // This will assign a new value to the passes property
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
}
export default reducer;