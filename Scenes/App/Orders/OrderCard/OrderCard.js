import React, { PureComponent } from 'react';
import { StyleSheet, Text} from 'react-native';
import ResourceCard from "../../../../Components/ResourceCard/ResourceCard";
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    text: {
        marginTop: 5
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 14,
    }
});
export default class OrderCard extends PureComponent {



    render() {
        const { customer, note} = this.props;
        return (
            <ResourceCard onPress={onPress}>
                <Text style={[styles.name]}>{customer}</Text>
                <Text style={[styles.text, styles.info]}>{note}</Text>
            </ResourceCard>
        )
    }
}

OrderCard.propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
};