import React, { Component } from 'react';
import {Text, View} from 'react-native';
import ResourceCard from "../../../../Components/ResourceCard/ResourceCard";





export default class OrderEntryCard extends Component {
    render() {
        const { name } = this.props;
        return (
            <ResourceCard onPress={()=>{}} onLongPress={()=>{}}>
                    <Text style={{fontSize: 14, fontWeight: '300', color:"#000"}}>
                        { name }
                    </Text>
            </ResourceCard>
        )
    }
}