import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Globals from "../Globals";
import {Icon} from "native-base";

export class HButtonBack extends Component
{
    render()
    {
        const styles = StyleSheet.create({
            buttonBack: {
                position: 'absolute',
                top: 30,
                left: 25,
                backgroundColor: 'transparent',
            },
        });

        return (
            <TouchableOpacity style={styles.buttonBack}
                              onPress={() => this.props.navigation.goBack(null)}>
                <Icon name="arrow-back"
                      style={{color: this.props.color ? this.props.color : "#fff", fontSize: Globals.ICONSIZE}}/>
            </TouchableOpacity>
        );
    }
}