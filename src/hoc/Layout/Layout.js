/**
 *  Contains:
 *  Toolbars , SideDrawers and Backdrop
 *  The BurgerBuilder is Passed through it as prop.children
 */
import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedFunction = () => {
        this.setState({ showSideDrawer: false });
    }
    sidedrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClick={this.sidedrawerToggleHandler}/>
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closed={this.sideDrawerClosedFunction} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout;