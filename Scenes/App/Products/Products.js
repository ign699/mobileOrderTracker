import React, { Component } from 'react';
import BasicResourceScreen from '../../../Components/BasicResourceScreen/BasicResourceScreen'
import firebase from 'react-native-firebase'
import ProductCard from "./ProductCard/ProductCard";
import Product from "../../../Models/Product";

export default class Customers extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params?navigation.state.params.title:"Products"
    });

    state = {
        products: []
    };

    componentDidMount() {
        this.customers = firebase.firestore().collection('Products');
        this.unsubscriber = this.customers.onSnapshot(res => {
            this.setState({products: res._docs})
        })
    }

    componentWillUnmount() {
        this.unsubscriber();
    }

    filteredList = (query) => {
        return this.state.products.filter(product => {
            return Product.getName(product).toLocaleLowerCase().includes(query.toLocaleLowerCase())
        })
    };

    navigate = () => {
        const { navigate } = this.props.navigation;
        navigate('AddProduct');
    };

    onPress = (item) => () => {
        const { navigation } = this.props;
        const params = navigation.state.params;
        if(params)
            params.onPress(item)
    };


    renderItem = ({ item }) => {
        return (
            <ProductCard name={Product.getName(item)} onPress={this.onPress(item)} />
        )
    };

    render() {
        return (
            <BasicResourceScreen data={this.filteredList} renderItem={this.renderItem} addOnPress={this.navigate}/>
        )
    }
}