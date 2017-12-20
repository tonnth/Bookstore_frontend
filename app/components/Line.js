import React, {Component} from 'react';

import {
    View, TouchableOpacity, Text, StyleSheet
} from 'react-native';

export default class Line extends Component<>
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <View
                style={{
                    borderBottomColor: '#d9d9d9',
                    borderBottomWidth: 1.5,
                    width: this.props.width,
                    margin:10,
                }}
            />

        );
    }
}
