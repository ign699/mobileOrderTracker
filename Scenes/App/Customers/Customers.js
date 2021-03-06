import React, { Component } from 'react';
import BasicResourceScreen from '../../../Components/BasicResourceScreen/BasicResourceScreen'
import Customer from '../../../Models/Customer'
import firebase from 'react-native-firebase'
import CustomerCard from "./CustomerCard/CustomerCard";
import PropTypes from 'prop-types';
import {View} from "react-native";
import {connect} from "react-redux";
import customers from "../../../reducers/customers/customers";

class Customers extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params?navigation.state.params.title:"Customers"
    });

    state = {
        customers: [],
        top: 0,
        left: 0
    };

    filteredList = (query) => {
        return this.props.customers.filter(customer => {
            return Customer.getName(customer).toLocaleLowerCase().includes(query.toLocaleLowerCase())
        })
    };

    navigate = () => {
        const { navigate } = this.props.navigation;
        navigate('AddCustomer');
    };

    onPress = (item) => () => {
        const { navigation } = this.props;
        const params = navigation.state.params;
        if(params)
            params.onPress(item)
    };

    renderItem = ({ item }) => {
        return (
            <CustomerCard name={Customer.getName(item)} email={Customer.getEmail(item)} phone={Customer.getPhone(item)} onPress={this.onPress(item)}/>
        )
    };

    render() {
        return (
            <BasicResourceScreen data={this.filteredList} renderItem={this.renderItem} addOnPress={this.navigate}/>
        )
    }
}

Customer.propTypes = {
    onPress: PropTypes.func
};



const mapStateToProps = ({customers}) => {
    return {
        customers: customers.list
    }
};

export default connect(mapStateToProps)(Customers)