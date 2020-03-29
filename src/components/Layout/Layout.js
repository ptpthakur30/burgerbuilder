/**
 *  Contains:
 *  Toolbars , SideDrawers and Backdrop
 *  The BurgerBuilder is Passed through it as prop.children
 */
import React from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
const layout = (props) => (
    <Aux>
        <div>Toolbar,Sidedrawer,Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);
export default layout;