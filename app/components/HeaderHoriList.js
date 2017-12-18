import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import {connect} from "react-redux";
import Globals, {formatCurency, TheLoai} from "../Globals";
import * as api from "../config/api";
import HImage from "./HImage";
import LinearGradient from "react-native-linear-gradient";

export default class HeaderHoriList extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <View
                style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: 6, height: 20, backgroundColor: Globals.COLOR.MAINCOLOR, marginRight: 10}}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    title: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

