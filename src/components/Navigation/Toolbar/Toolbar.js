import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClick}/>
            {/* <Logo height="80%"/> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}> 
             {/* The isAutheticated is passed to check if the user is autheticated and show logout */}
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>

        </header>
    )
}

export default toolbar;
