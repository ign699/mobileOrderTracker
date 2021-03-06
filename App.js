import React, { Component } from 'react';
import App from './Scenes/App'
import {
    AppRegistry
} from 'react-native';

import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import customers from './reducers/customers/customers'
import containers  from './reducers/containers/reducers'
import user from './reducers/user/reducer'
import products from './reducers/products/reducers'
import orders from './reducers/orders/reducers'
import logger from 'redux-logger'
console.disableYellowBox = true;


const reducers = combineReducers({customers, containers, user, products, orders});
const store = createStore(reducers, applyMiddleware(logger));


class AppReg extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('mobileOrderTracker', () => AppReg );