import React, { Component } from 'react'
import {TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";



const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        margin: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#0b5bdd",
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
        elevation: 5
    }
});



export default class AddHover extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.addButton} onPress={this.props.onPress}>
                <Icon name={"ios-add"} color={"#FFF"} size={60}/>
            </TouchableOpacity>
        )
    }
}