/**
 * BurgerIngredients contains the burger ingredients 
 * It will return the burger ingredients based on the ingredient type passed
 */
import React from 'react'
import classes from './BurgerIngredients.css'
import PropTypes from 'prop-types'
const burgerIngredients = props=>{
        let ingredients = null;
        //The ingredient type is passed to switch and it will return the burger based on the type selected
        switch (props.type) {
            case ('bread-bottom'):
                ingredients = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredients = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                )
                break;
            case ('meat'):
                ingredients = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingredients = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingredients = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingredients = <div className={classes.Bacon}></div>
                break;
            default:
                ingredients = null;
                break;
        }
        return ingredients;
    
}

burgerIngredients.propTypes = {
    type : PropTypes.string.isRequired
};

export default burgerIngredients
