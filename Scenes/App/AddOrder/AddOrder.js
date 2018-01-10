import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, ScrollView, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Customer from '../../../Models/Customer'
import AddHover from "../../../Components/AddHover/AddHover";
import OrderEntryCard from "./OrderEntryCard/OrderEntryCard";
import Product from "../../../Models/Product";
import firebase from 'react-native-firebase'
import Container from '../../../Models/Container'
import EntryDetailsModal from "./EntryDetailsModal/EntryDetailsModal";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    noteInput: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10
    },

});

class AddOrder extends Component {
    static navigationOptions = {
        title: 'Add new order',
    };

    state = {
        customer: null,
        entries: [],
        showEntryDetails: false,
        selectedProduct: null,
        note: ''
    };

    onCustomerPress = (customer) => {
        this.setState({
            customer,
            selectedContainer: Customer.getContainerId(customer)
        });
        const { navigation } = this.props;
        navigation.goBack(null);
    };


    onProductPress = (product) => {
        this.setState({
                selectedProduct: product,
                showEntryDetails: true
        });
        const { navigation } = this.props;
        navigation.goBack(null);
    };

    renderEntry = ({ item }) => {
        return (
            <OrderEntryCard productName={Product.getName(item.product)} containerName={Container.getName(item.container)} quantity={item.quantity} />
        )
    };

    navigateProducts = () => {
        const { navigate } = this.props.navigation;
        navigate("SelectProduct", {title: "Select pro...", onPress: this.onProductPress})
    };

    navigateCustomers = () => {
      const { navigate } = this.props.navigation;
      navigate("SelectCustomer", {title: "Select cus...", onPress: this.onCustomerPress})
    };

    addEntry = (containerId, quantity) => {
        const entry = {
            product: this.state.selectedProduct,
            container: this.props.containers.filter(container => Container.getId(container) === containerId)[0],
            quantity: quantity
        };
        this.setState(prevState => {

            prevState.entries.push(entry)
            return {
                quantity: '0',
                selectedProduct: null,
                selectedContainer: Customer.getContainerId(this.state.customer) || Container.getId(this.props.containers[0]),
                entries: prevState.entries,
                showEntryDetails: false
            }
        })
    };

    addOrder = () => {
        const parsedEntries = this.state.entries.map(entry => {
            return {
                product: entry.product._ref,
                container: entry.container._ref,
                quantity: entry.quantity
            }
        });
        const customer = this.state.customer._ref;
        const note = this.state.note;
        firebase.firestore().collection('Orders').add({
            entries: parsedEntries,
            customer: customer,
            note: note
        }).then(res => {
            ToastAndroid.show('Order added successfully', ToastAndroid.SHORT);
            this.setState({
                customer: null,
                entries: [],
                showEntryDetails: false,
                selectedProduct: null,
                note: ''
            })
        })
    };


    render() {
        const { customer, containers } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.card}>
                    <Text style={styles.header}>
                        Customer:
                    </Text>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={this.navigateCustomers}>
                        <TextInput
                            style={{flex: 1}}
                            editable={false}
                            placeholder={customer?Customer.getName(customer):"Selected customer"}
                        >
                        </TextInput>
                        <Icon name={'search'} color={"#000"} size={16}/>
                    </TouchableOpacity>
                    <Text style={styles.header}>
                        Notes:
                    </Text>
                    <TextInput
                        style={styles.noteInput}
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.note}
                        onChangeText={(text) => {this.setState({note: text})}}
                    />
                    <FlatList
                        data={this.state.entries}
                        extraData={this.state}
                        renderItem={this.renderEntry}
                    />
                    <TouchableOpacity
                        style={
                            {
                                width: 150,
                                height: 70,
                                borderRadius: 35,
                                backgroundColor: '#0b5bdd',
                                justifyContent:'center',
                                alignItems:'center',
                                alignSelf:'center'
                            }
                        }
                        onPress={this.addOrder}
                        disabled={!(this.state.customer&&this.state.entries.length>0)}
                    >
                        <Text style={{fontSize: 16, color: "#FFF"}}>
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <EntryDetailsModal
                    containerId={Customer.getContainerId(this.state.customer) || Container.getId(this.props.containers[0])}
                    showModal={this.state.showEntryDetails}
                    addEntry={this.addEntry}
                    onRequestClose={() => {}}
                />

                <AddHover onPress={this.navigateProducts}/>
            </View>
        )
    }
}


const mapStateToProp = ({containers}) => {
    return {
        containers: containers.list
    }
};

export default connect(mapStateToProp)(AddOrder)