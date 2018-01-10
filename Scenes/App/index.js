import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from './SplashScreen/SplashScreen'
import { connect } from 'react-redux'
import firebase from "react-native-firebase";
import { updateCustomers } from "../../reducers/customers/actions";
import {updateContainers} from "../../reducers/containers/actions";
import { authenticateUser } from "../../reducers/user/actions";
import { updateProducts } from "../../reducers/products/actions";
import Login from '../Login/Login'
import MainRouter from '../../router'

class App extends Component {


    componentDidMount() {
        this.customers = firebase.firestore().collection('Customers').onSnapshot(res => {
            this.props.updateCustomers(res._docs)
        });
        this.containers = firebase.firestore().collection('Containers').onSnapshot(res => {
            this.props.updateContainers(res._docs)
        })
        this.products = firebase.firestore().collection('Products').onSnapshot(res => {
            this.props.updateProducts(res._docs)
        })
        this.auth = firebase.auth().onAuthStateChanged((user) => {
            if(user!==null){
                this.props.authenticateUser(user)
            }
        });
    }

    componentWillUnmount() {
        this.customers();
        this.containers();
    }

    render() {
        const fetched = ((this.props.containers.length > 0) && (this.props.customers.length > 0));
        return (
            <View style={{flex: 1}}>
                {
                    fetched
                    ?
                        this.props.user
                        ?
                            <MainRouter />
                        :
                            <Login />
                    :
                         <SplashScreen />

                }
            </View>
        )
    }
}

const mapStateToProps = ({ customers, containers, user }) => {
    return {
        customers: customers.list,
        containers: containers.list,
        user: user.user
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomers: (customers) => {
            dispatch(updateCustomers(customers))
        },
        updateContainers: (containers) => {
            dispatch(updateContainers(containers))
        },
        authenticateUser: (user) => {
            dispatch(authenticateUser(user))
        },
        updateProducts: (products) => {
            dispatch(updateProducts(products))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)