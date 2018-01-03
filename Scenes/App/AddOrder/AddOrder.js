import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Modal, Picker,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Customer from '../../../Models/Customer'
import AddHover from "../../../Components/AddHover/AddHover";
import OrderEntryCard from "./OrderEntryCard/OrderEntryCard";
import Product from "../../../Models/Product";
import firebase from 'react-native-firebase'
import Container from '../../../Models/Container'
import EntryDetailsModal from "./EntryDetailsModal/EntryDetailsModal";

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


export default class AddOrder extends Component {
    static navigationOptions = {
        title: 'Add new order',
    };

    state = {
        customer: null,
        entries: [],
        containers: [],
        showEntryDetails: false,
        selectedProduct: null,
    };

    onCustomerPress = (customer) => {
        this.setState({
            customer,
            selectedContainer: Customer.getContainerId(customer)
        });
        const { navigation } = this.props;
        navigation.goBack(null);
    };

    componentDidMount() {
        this.containers = firebase.firestore().collection('Containers');
        this.unsubscriber = this.containers.onSnapshot(res => {
            this.setState({containers: res._docs})
        })
    }

    onProductPress = (product) => {
        this.setState(prevState => {
            return {
                selectedProduct: product,
                showEntryDetails: true
            }
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

    closeModal = () => {
        this.setState(prevState => {
            prevState.entries.pop();
            return {
                entries: prevState.entries,
                showEntryDetails: false
            }
        })
    };

    addEntry = (containerId, quantity) => {
        const entry = {
            product: this.state.selectedProduct,
            container: this.state.containers.filter(container => Container.getId(container) === containerId)[0],
            quantity: quantity
        };
        console.log(entry)
        this.setState(prevState => {

            prevState.entries.push(entry)
            return {
                quantity: '0',
                selectedProduct: null,
                selectedContainer: Customer.getContainerId(this.state.customer) || Container.getId(prevState.containers[0]),
                entries: prevState.entries,
                showEntryDetails: false
            }
        })
    };

    render() {
        const { customer, containers } = this.state
        console.log(Container.getId(containers[0]))
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
                    />
                    <FlatList
                        data={this.state.entries}
                        extraData={this.state}
                        renderItem={this.renderEntry}
                    />
                </ScrollView>
                <EntryDetailsModal
                    containers={this.state.containers}
                    containerId={Customer.getContainerId(this.state.customer) || Container.getId(containers[0])}
                    showModal={this.state.showEntryDetails}
                    addEntry={this.addEntry}
                />
                <AddHover onPress={this.navigateProducts}/>
            </View>
        )
    }
}