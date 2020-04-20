import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/index'
import Orders from './containers/Orders/Orders'
import Authenicate from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
// We are setting the auto login here as the app loads first in the when the application reloads
class App extends Component {
  componentDidMount() {
    this.props.onAutoLogin();
  }
  render() {
    // routes to  un authenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={Authenicate} />
        <Route path="/" component={BurgerBuilder} />
        {/* Redirect to Home page if route not found */}
        <Redirect to="/" />
      </Switch>
    )
    // Guarding Routes
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          {/* Redirect to Home page if route not found */}
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actionTypes.checkAuthState())
  }
}
// withRouter is used here because connect is wrapping the component so to use router withRouter is used
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
