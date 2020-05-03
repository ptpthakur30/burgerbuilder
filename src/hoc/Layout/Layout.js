/**
 *  Contains:
 *  Toolbars , SideDrawers and Backdrop
 *  The BurgerBuilder is Passed through it as prop.children
 */
import React, { useState } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import { connect } from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const layout = props => {
    const [sideDrawerVisibility, setsideDrawerVisibility] = useState(false);

    const sideDrawerClosedFunction = () => {
        setsideDrawerVisibility(false);
    }

    const sidedrawerToggleHandler = () => {
        setsideDrawerVisibility(!sideDrawerVisibility);
    }

    return (
        <Aux>
            {/* For Showing the Toolbar in desktop mode */}
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClick={sidedrawerToggleHandler} />

            {/* For showing the sidedrawer in mobile view */}
            <SideDrawer
                isAuth={props.isAuthenticated}
                showSideDrawer={sideDrawerVisibility}
                closed={sideDrawerClosedFunction} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps)(layout);