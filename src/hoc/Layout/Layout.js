/**
 *  Contains:
 *  Toolbars , SideDrawers and Backdrop
 *  The BurgerBuilder is Passed through it as prop.children
 */
import React, { Component } from 'react'
import Aux from '../Auxiliary/Auxiliary'
import {connect} from 'react-redux'
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
                {/* For Showing the Toolbar in desktop mode */}
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClick={this.sidedrawerToggleHandler}/>

                {/* For showing the sidedrawer in mobile view */}
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                showSideDrawer={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedFunction} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps = state=>{
    return {
        isAuthenticated : state.auth.token !=null
    }
}
export default connect(mapStateToProps)(Layout);