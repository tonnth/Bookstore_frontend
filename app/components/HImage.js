import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import Globals from "../Globals";
import FastImage from "react-native-fast-image";

export default class HImage extends Component
{
    render()
    {
        const {style, uri, borderRadius} = this.props;
        const styles = StyleSheet.create({
            image: {
                ...style,
                marginTop: 8,
                marginBottom: 8,
                marginLeft: 5,
                marginRight: 5,
                borderRadius: borderRadius,

                backgroundColor: 'white',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 3,

                // android (Android +5.0)
                elevation: 5,

            },
        });

        return (
            <View style={styles.image}>
                <View style={{overflow: 'hidden', borderRadius: borderRadius,flex:1}}>
                    <FastImage
                        source={{uri: uri, priority: FastImage.priority.hight,}}
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                            borderRadius: borderRadius,
                        }}/>
                </View>
            </View>
        );
    }
}