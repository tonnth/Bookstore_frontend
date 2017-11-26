import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
const { height }  = Dimensions.get('window')
export default class Spinner extends Component
{
    render()
    {
        return(
            <View style = {{
                backgroundColor: 'white',
                height: height * 0.3,
                margin: 5,

            }}>
                <Text>Spinner</Text>

            </View>
        );
    }
}

