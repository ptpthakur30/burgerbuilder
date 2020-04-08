import React from 'react'
import classes from './Order.css'
const order = (props) => {
    const ingredients = [];
    
    for(let ingredientname in props.ingredients)
    {
        ingredients.push({
            name : ingredientname,
            quantity : props.ingredients[ingredientname]
        })
    }
    const outputIngredients = ingredients.map(igkey=>{
    return <span key={igkey.name}
    style={{
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        padding:'5px',
        border:'1px solid #ccc',

    }}
    >{igkey.name} ({igkey.quantity})</span>;
    }
    )
    return (
        <div className={classes.Order}>
            <p>Ingredients : {outputIngredients}</p>
            <p>Price : <strong>{props.price}</strong></p>
        </div>
    )
}

export default order
