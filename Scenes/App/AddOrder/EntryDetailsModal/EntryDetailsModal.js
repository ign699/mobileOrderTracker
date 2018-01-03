import React, { Component } from 'react';
import {View, StyleSheet, Modal, Text, Picker, TouchableOpacity, TextInput, Button} from 'react-native';
import Container from "../../../../Models/Container";
import PropTypes from 'prop-types'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    modalBody: {
        backgroundColor: "#FFF",
        alignSelf:'stretch',
        padding: 15,
        margin: 20,
        borderRadius: 5
    },
    containerSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantitySection: {
        flexDirection:'row',
        alignItems:'center'
    },
    label: {
        fontSize:16,
        fontWeight: 'bold',
        color:'#000'
    },
    picker: {
        flex: 1
    },
    button: {
        margin: 30
    }
});


export default class EntryDetailsModal extends Component {


    state = {
        selectedContainer: null,
        quantity: ''
    };

    _addEntry = () => {
        this.props.addEntry(this.state.selectedContainer || this.props.containerId, this.state.quantity)
        this.setState({
            quantity: '',
            selectedContainer: null
        })
    };

    _onChangeText = (text) => {
        if(text.slice(-1) !== ' ' && text.slice(-1) !== '-') {
            this.setState({quantity: text})
        }
    };


    render() {
        const { showModal, containers, containerId, addEntry } = this.props;
        return (
            <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={this.closeModal}
            >
                <View style={styles.container}>
                    <View style={styles.modalBody}>
                        <View style={styles.containerSection}>
                            <Text style={styles.label}>
                                Container:
                            </Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={ this.state.selectedContainer || containerId }
                                onValueChange={(value) => {this.setState({selectedContainer: value})}}
                            >
                                {
                                    containers.map(container => {
                                        return <Picker.Item label={Container.getName(container)} value={Container.getId(container)}/>
                                    })
                                }
                            </Picker>
                        </View>
                        <View style={styles.quantitySection}>
                            <Text style={styles.label}>
                                Quantity:
                            </Text>
                            <TouchableOpacity style={styles.picker}>
                                <TextInput
                                    value={this.state.quantity}
                                    onChangeText={this._onChangeText}
                                    keyboardType={'numeric'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button} >
                            <Button title={"Add entry"} onPress={this._addEntry}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}


EntryDetailsModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    containers: PropTypes.array.isRequired,
    containerId: PropTypes.string.isRequired,
    addEntry: PropTypes.func.isRequired,
}