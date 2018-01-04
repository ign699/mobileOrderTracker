import React, { Component } from 'react';
import {Text, View, ActivityIndicator} from 'react-native';

export default class SplashScreen extends Component {

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#0b5bdd', alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: '#000', fontSize: 24}}>Astani</Text>
                <ActivityIndicator size={'large'} color={'#000'}/>
            </View>
        )
    }
}


