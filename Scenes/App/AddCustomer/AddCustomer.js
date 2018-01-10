import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Button, Picker} from 'react-native';
import firebase from 'react-native-firebase'
import AddResourceCard from "../../../Components/AddResourceCard/AddResourceCard";
import Container from "../../../Models/Container";
import {connect} from "react-redux";

class AddCustomer extends Component {
    static navigationOptions = {
        title: 'Add new customer',
    };

    state = {
        companyName: '',
        phone: '',
        email: '',
        containers: [],
        selected: null
    };

    componentDidMount() {
        this.customers = firebase.firestore().collection('Customers');
        this.containers = firebase.firestore().collection('Containers');
        this.setState({selected: Container.getId(this.props.containers[0])})
    }

    addCustomer = () => {
        this.customers.add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: this.state.companyName,
            phone: this.state.phone,
            email: this.state.email,
            container: this.props.containers.filter(container => Container.getId(container)===this.state.selected)[0]._ref
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
                <View style={{flexDirection: 'row'}}>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={this.state.selected}
                        onValueChange={(itemValue) => {this.setState({selected: itemValue})}}
                    >
                        {
                            this.props.containers.map(container => {
                                return <Picker.Item key={Container.getId(container)} label={Container.getName(container)} value={Container.getId(container)}/>
                            })
                        }
                    </Picker>
                </View>
            </AddResourceCard>
        )
    }
}


const mapStateToProps = ({containers}) => {
    return {
        containers: containers.list,
    }
};


export default connect(mapStateToProps)(AddCustomer)