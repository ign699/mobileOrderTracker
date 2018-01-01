import React, { Component } from 'react';
import {View, Button} from 'react-native';
import PropTypes from 'prop-types';


export default class AddResourceCard extends Component {
    render() {
        const { title, onPress } = this.props;
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <View style={{margin: 20}}>
                    {this.props.children}
                    <Button title={title} onPress={onPress}/>
                </View>
            </View>
        )
    }
}


AddResourceCard.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.string.isRequired
};