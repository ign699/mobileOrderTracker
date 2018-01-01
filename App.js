import React, { Component } from 'react';

import {
    AppRegistry, Button,
    Text, TextInput, View,
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from './Scenes/Login/Login'
import Customers from './Scenes/App/Customers/Customers'
import AddCustomer from './Scenes/App/AddCustomer/AddCustomer'
import Icon from 'react-native-vector-icons/FontAwesome'
import Products from "./Scenes/App/Products/Products";
import AddProduct from "./Scenes/App/AddProduct/AddProduct";
import AddOrder from "./Scenes/App/AddOrder/AddOrder";
import Orders from './Scenes/App/Orders/Orders'

console.disableYellowBox = true;


const CustomersNavigator = StackNavigator(
    {
        Customers: {screen: Customers, navigationOptions: { header: null }},
        AddCustomer: {screen: AddCustomer}
    }
);

const ProductsNavigator = StackNavigator(
    {
        Products: {screen: Products, navigationOptions: { header: null }},
        AddProduct: {screen: AddProduct}
    }
);

const OrdersNavigator = StackNavigator(
    {
        Orders: {screen: Orders, navigationOptions: { header: null }},
        AddOrder: {screen: AddOrder},
        SelectCustomer: {screen: Customers},
        AddCustomer: {screen: AddCustomer},
        SelectProduct: {screen: Products },
        AddProduct: {screen: AddProduct}
    }
);

const AppNavigator = TabNavigator(
    {
        Orders: { screen: OrdersNavigator, navigationOptions: {tabBarIcon: () => (<Icon name={"file-o"} color={"#FFF"} size={16}/>)}},
        Customers: { screen: CustomersNavigator, navigationOptions: {tabBarIcon: () => (<Icon name={"user-o"} color={"#FFF"} size={16}/>)}},
        Products: { screen: ProductsNavigator, navigationOptions: {tabBarIcon: () => (<Icon name={"lemon-o"} color={"#FFF"} size={16}/>)}},
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            style: {
                backgroundColor: "#0b5bdd",
                height: 60,
                justifyContent: 'center'
            },
            showIcon: true
        }
    }
);


export const SimpleApp = StackNavigator(
    {
      Login: { screen: Login, navigationOptions: { header: null }},
      App: { screen: AppNavigator, navigationOptions: { header: null } },
    },
);

AppRegistry.registerComponent('mobileOrderTracker', () => SimpleApp);