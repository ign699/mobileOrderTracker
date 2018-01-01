import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Modal, Picker} from 'react-native';
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
        details: false
    };

    onCustomerPress = (customer) => {
        this.setState({
            customer
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
            prevState.entries.push({product: product, quantity: 0, container:{}});
            return {
                entries: prevState.entries,
                details: true
            }
        });
        const { navigation } = this.props;
        navigation.goBack(null);
    };

    renderEntry = ({ item }) => {
        return (
            <OrderEntryCard name={Product.getName(item)}/>
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

    render() {
        const { customer, containers } = this.state;
        console.log(containers)
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
                        data={this.state.entries.map(entry => entry.product)}
                        renderItem={this.renderEntry}
                    />
                </ScrollView>
                <AddHover onPress={this.navigateProducts}/>
                <Modal
                    visible={this.state.details}
                    transparent={true}
                >
                    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: "#FFF", alignSelf:'stretch', padding: 15, margin: 20, borderRadius: 5}}>
                            <View style={{ flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize:16, fontWeight: 'bold', color:'#000'}}>
                                    Container:
                                </Text>
                                <Picker
                                    style={{flex: 1}}
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
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}