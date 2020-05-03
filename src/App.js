import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/index'
import Logout from './containers/Auth/Logout/Logout'

//Loading the component lazily 
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});


// We are setting the auto login here as the app loads first in the when the application reloads
const app = props => {
  // object destructuring
  const {onAutoLogin} = props;
  // Use the useEffect in place of componentDidMount
  // onAutoLogin is passed for optimization
  useEffect(() => {
    onAutoLogin();
  }, [onAutoLogin])

  // routes to  un authenticated users
  let routes = (
    <Switch>
      {/* We need to use render for loading the component lazily */}
      {/* The props is passed to lead the routing variables in the component */}
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" component={BurgerBuilder} />
      {/* Redirect to Home page if route not found */}
      <Redirect to="/" />
    </Switch>
  )
  // Guarding Routes
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
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
          {/* To load the component lazily */}
          <Suspense fallback={<p>Loading..</p>}>
            {routes}
          </Suspense>
        </Switch>
      </Layout>
    </div>
  );
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
