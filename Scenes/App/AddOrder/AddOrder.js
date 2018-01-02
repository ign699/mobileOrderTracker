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
    }
});


export default class AddOrder extends Component {
    static navigationOptions = {
        title: 'Add new order',
    };

    state = {
        customer: null,
        entries: [],
        containers: [],
        details: false,
        selectedContainer: '',
        selectedProduct: null,
        quantity: '0'
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
            this.setState({containers: res._docs, selectedContainer:Container.getId(res._docs[0])})
        })
    }

    onProductPress = (product) => {
        this.setState(prevState => {
            return {
                selectedProduct: product,
                details: true
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
                details: false,
                entries: prevState.entries,
                selectedContainer: Customer.getContainerId(this.state.customer)
            }
        })
    };

    addEntry = () => {
        const entry = {
            product: this.state.selectedProduct,
            container: this.state.containers.filter(container => Container.getId(container) === this.state.selectedContainer)[0],
            quantity: this.state.quantity
        };
        this.setState(prevState => {

            prevState.entries.push(entry)
            return {
                quantity: '0',
                selectedProduct: null,
                selectedContainer: Customer.getContainerId(this.state.customer) || Container.getId(prevState.containers[0]),
                entries: prevState.entries,
                details: false
            }
        })
    };

    render() {
        const { customer, containers } = this.state;
        console.log(this.state.entries)
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
                        style={{
                            borderColor: '#000',
                            borderWidth: 1,
                            borderRadius: 3,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <FlatList
                        data={this.state.entries}
                        extraData={this.state}
                        renderItem={this.renderEntry}
                    />
                </ScrollView>
                <AddHover onPress={this.navigateProducts}/>
                <Modal
                    visible={this.state.details}
                    transparent={true}
                    onRequestClose={this.closeModal}
                >
                    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: "#FFF", alignSelf:'stretch', padding: 15, margin: 20, borderRadius: 5}}>
                            <View style={{ flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, fontWeight: 'bold', color:'#000'}}>
                                    Container:
                                </Text>
                                <Picker
                                    style={{flex: 1}}
                                    selectedValue={this.state.selectedContainer}
                                    onValueChange={(itemValue) => {this.setState({selectedContainer: itemValue})}}
                                >
                                    {
                                        this.state.containers.map(container => {
                                            return <Picker.Item label={Container.getName(container)} value={Container.getId(container)}/>
                                        })
                                    }
                                </Picker>
                            </View>
                            <View style={{ flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, fontWeight: 'bold', color:'#000'}}>
                                    Quantity:
                                </Text>
                                <TouchableOpacity style={{flex: 1}}>
                                    <TextInput
                                        value={this.state.quantity}
                                        onChangeText={(text) => {this.setState({quantity: text})}}
                                        keyboardType={'numeric'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{margin: 30}} >
                                <Button title={"Add entry"} onPress={this.addEntry}/>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}