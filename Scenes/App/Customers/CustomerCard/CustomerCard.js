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
export default class CustomerCard extends PureComponent {



    render() {
        const { name, email, phone, id, onPress, onLongPress} = this.props;
        return (
            <ResourceCard onPress={onPress}>
                <Text style={[styles.name]}>{name}</Text>
                <Text style={[styles.text, styles.info]}>{email}</Text>
                <Text style={[styles.text, styles.info]}>{phone}</Text>
            </ResourceCard>
        )
    }
}

CustomerCard.propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
};