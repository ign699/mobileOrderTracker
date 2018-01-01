import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import ResourceCard from "../../../../Components/ResourceCard/ResourceCard";
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
   name: {
       fontSize: 32,
       fontWeight: 'bold'
   }
});

export default class ProductCard extends Component {
    render() {
        const { name, onPress }  = this.props;
        return (
            <ResourceCard onPress={onPress}>
                <Text style={styles.name}>
                    {name}
                </Text>
            </ResourceCard>
        )
    }
}


ProductCard.propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string
};

