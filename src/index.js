import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})
// store needs reducer redux
// It is added for dev tools =>  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// process.env.NODE_ENV === 'development'  is used to check for development server
const composeEnhancers = process.env.NODE_ENV === 'development' 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
: null 
|| compose;
const store = createStore(rootReducer,
    composeEnhancers(
        // thunk is a middleware used to handle async code
        applyMiddleware(thunk)
    ));

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
