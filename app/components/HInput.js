import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import {TextField} from "react-native-material-textfield";


export class HInput extends Component
{
    render() 
    {
        /*https://github.com/n4kz/react-native-material-textfield*/
        return (
            <TextField
                textColor={'#fff'}
                label={this.props.label}
                labelFontSize={18}
                containerStyle={{
                    width: this.props.width,
                    marginBottom: 10,
                }}
                tintColor={'#fff'}
                baseColor={'#d6d6d6'}
                lineWidth={1}
            />
        );
    }
}