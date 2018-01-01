import React, { Component } from 'react';
import {TextInput, View} from 'react-native';
import AddResourceCard from "../../../Components/AddResourceCard/AddResourceCard";
import firebase from "react-native-firebase";



export default class AddProduct extends Component {
    static navigationOptions = {
        title: 'Add new product',
    };

    state = {
        name: ''
    };

    componentDidMount() {
        this.products = firebase.firestore().collection('Products');
    }

    addProduct = () => {
        this.products.add({
            name: this.state.name,
        });
        this.setState({
            name: ''
        });
    };
    render() {
        return (
            <AddResourceCard title={"Add product"} onPress={this.addProduct}>
                <TextInput
                    placeholder={"Name"}
                    value={this.state.name}
                    onChangeText={(text) => {this.setState({name: text})}}
                />
            </AddResourceCard>
        )
    }
}