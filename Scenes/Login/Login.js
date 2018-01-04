import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Button} from 'react-native';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginCard: {
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    loginButton: {
        marginTop: 20,
        padding: 20,
        backgroundColor: "#699bea",
        borderRadius: 30
    }
});
export default class Login extends Component {
    state = {
        login: '',
        password: '',
        user: null
    };

    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.login, this.state.password)
            .catch(err => {
                console.log(err)
            })
    };


    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>
                    Astani order tracker
                </Text>
                <View style={styles.loginCard}>
                    <TextInput
                        placeholder={'login'}
                        value={this.state.login}
                        onChangeText={(text) => {this.setState({login: text})}}
                    />
                    <TextInput
                        placeholder={'password'}
                        value={this.state.password}
                        onChangeText={(text) => {this.setState({password: text})}}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}