/**
 * The Logo component is used in Toolbar and side drawer component
 */
import React from 'react'
import burgerlogo from '../../assets/images/Burger-logo.png'
import classes from './Logo.css'

const logo = (props) => {
    return (
        // we have added inline style so that we can dynamically pass the height
        <div className={classes.Logo} style={{height:props.height}}> 
            <img src={burgerlogo} alt='Burgerlogo'/>
        </div>
    )
}

export default logo
