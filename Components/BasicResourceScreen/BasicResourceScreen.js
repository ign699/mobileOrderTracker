import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import AddHover from "../AddHover/AddHover";
import Icon from "react-native-vector-icons/FontAwesome";


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
        right: 0
    },
    searchBar: {
        margin: 10,
        flexDirection: 'row',
        alignSelf: 'stretch'
    }
});

export default class BasicResourceScreen extends Component {

    state = {
        query: ''
    };

    render() {
        const { data, renderItem, addOnPress  } = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={{flex: 1}}
                        placeholder={"Search..."}
                        onChangeText={(text) => { this.setState({query: text}) }}
                        value={this.state.query}
                    />
                    <Icon style={{alignSelf: 'center'}} name={"search"} color={"#000"} size={18}/>
                </View>

                <FlatList
                    data={data(this.state.query)}
                    renderItem={renderItem}
                />
                <AddHover onPress={addOnPress}/>
            </View>
        )
    }
}


BasicResourceScreen.propTypes = {
    data: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    addOnPress: PropTypes.func.isRequired
};