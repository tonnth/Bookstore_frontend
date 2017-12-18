import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Globals from "../Globals";

export default class HButton extends Component
{
    render()
    {
        const {text, width, shadow, border} = this.props;
        const buttonHeight = 40;
        const styles = StyleSheet.create({
            button: {
                height: buttonHeight,
                borderRadius: border ? border : this.props.buttonHeight / 2,
                width: width,
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
            shadow: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.4,
                shadowRadius: 3,

                elevation: 3,
            }
        });
        let stylebutton = shadow ? [styles.button, styles.shadow] : styles.button;

        return (
            <TouchableOpacity style={stylebutton}
                              onPress={this.props.action}>
                <Text style={styles.text}>
                    {text.toUpperCase()}
                </Text>
            </TouchableOpacity>
        );
    }
}