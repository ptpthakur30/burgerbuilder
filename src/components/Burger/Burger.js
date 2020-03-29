/**
 * Used to wrap up individual burger ingredients into single component
 */
import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    /*
    Object.keys will creata a array of key of object
    [...Arrays(2)] wil create array of length 2 
    .reduce will helps to flatten the array, will help in removing the zero length array
    using let for variable helps to assign anything
     */
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])]
                .map((_, i) => {
                    return <BurgerIngredients key={igkey + i} type={igkey} />
                });
        }).reduce((arr,el)=>{
            return arr.concat(el);
        },[]);

        if(transformedIngredients.length === 0)
        {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;
