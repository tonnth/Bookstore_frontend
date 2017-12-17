import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Globals from "../Globals";

export class HButton extends Component
{
    render() 
    {
        const buttonHeight = 40;
        const styles = StyleSheet.create({
            button: {
                height: buttonHeight,
                borderRadius: buttonHeight / 2,
                width: this.props.width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Globals.COLOR.MAINCOLOR,
                ...this.props.style,
            },
            text: {
                fontFamily: 'OpenSans-Regular',
                color: '#fff',
                fontSize: 18,
                fontWeight: "600"
            },
            shadow:{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2},
                shadowOpacity: 0.4,
                shadowRadius: 3,

                elevation: 3,
            }
        });
        let stylebutton = this.props.shadow ? [styles.button,styles.shadow]: styles.button;

        return (
            <TouchableOpacity style={stylebutton}
                              onPress={this.props.action}>
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}