import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image} from 'react-native';
import {TextField} from "react-native-material-textfield";


export class HInput extends Component
{
    render()
    {
        /*https://github.com/n4kz/react-native-material-textfield*/
        return (
            <TextField
                textColor={this.props.textColor ? this.props.textColor : '#fff'}
                label={this.props.label}
                labelFontSize={18}
                containerStyle={{
                    ...this.props.style,
                    width: this.props.width,
                    marginBottom: 10,
                }}
                tintColor={this.props.tintColor ? this.props.tintColor : '#fff'}
                baseColor={this.props.baseColor ? this.props.baseColor : '#d6d6d6'}
                onChangeText={this.props.onChangeText}
                secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
            />
        );
    }
}