/**
 * Used for mobile view
 */
import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    let classesAdded = [classes.SideDrawer, classes.Close];
    if(props.showSideDrawer)
    {
        classesAdded = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.showSideDrawer} clicked={props.closed}/>
            <div className={classesAdded.join(' ')}>
                {/* <Logo height="11%"/> */}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer
