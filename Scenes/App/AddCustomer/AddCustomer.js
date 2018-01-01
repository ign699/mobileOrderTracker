import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import firebase from 'react-native-firebase'
import AddResourceCard from "../../../Components/AddResourceCard/AddResourceCard";

export default class AddCustomer extends Component {
    static navigationOptions = {
        title: 'Add new customer',
    };

    state = {
        companyName: '',
        phone: '',
        email: ''
    };

    componentDidMount() {
        this.customers = firebase.firestore().collection('Customers');
    }

    addCustomer = () => {
        this.customers.add({
            name: this.state.companyName,
            phone: this.state.phone,
            email: this.state.email
        });
        this.setState({
            companyName: '',
            phone: '',
            email: ''
        });
    };

    render() {
        return (
            <AddResourceCard title={"Add customer"} onPress={this.addCustomer}>
                <TextInput
                    placeholder={"Company name"}
                    value={this.state.companyName}
                    onChangeText={(text) => {this.setState({companyName: text})}}
                />
                <TextInput
                    placeholder={"Phone"}
                    keyboardType={'phone-pad'}
                    value={this.state.phone}
                    onChangeText={(text) => {this.setState({phone: text})}}
                />
                <TextInput
                    placeholder={"Email"}
                    keyboardType={'email-address'}
                    value={this.state.email}
                    onChangeText={(text) => {this.setState({email: text})}}
                />
            </AddResourceCard>
        )
    }
}