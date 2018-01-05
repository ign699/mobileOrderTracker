import React, { Component } from 'react';
import BasicResourceScreen from '../../../Components/BasicResourceScreen/BasicResourceScreen'
import Customer from '../../../Models/Customer'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'

class Orders extends Component {

    state = {
        orders: []
    };

    componentDidMount() {
        this.orders = firebase.firestore().collection('Orders');
        this.unsubscriber = this.orders.onSnapshot(res => {
            this.setState({orders: res._docs})
        })
    }

    componentWillUnmount() {
        this.unsubscriber();
    }

    filteredList = (query) => {
        return []
        return this.state.orders.filter(customer => {
            return Customer.getName(customer).toLocaleLowerCase().includes(query.toLocaleLowerCase())
        })
    };

    navigate = () => {
        const { navigate } = this.props.navigation;

        navigate('AddOrder');
    };

    renderItem = ({ item }) => {
        return (
            <View></View>
        )
    };

    render() {
        return (
            <BasicResourceScreen data={this.filteredList} renderItem={this.renderItem} addOnPress={this.navigate}/>
        )
    }
}


const mapStateToProps = (list) => {
    return {
        list: list
    }
};

export default connect(mapStateToProps)(Orders)