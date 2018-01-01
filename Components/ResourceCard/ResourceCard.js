import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 5,
        padding: 10
    }
});
export default class ResourceCard extends PureComponent {



    render() {
        const { onPress, onLongPress } = this.props;
        return (
            <TouchableOpacity style={styles.card} onPress={onPress} onLongPress={onLongPress}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

ResourceCard.propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
};