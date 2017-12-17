import React, {Component} from 'react'
import {Text, Platform} from 'react-native'

export default class Letter extends Component
{
    render()
    {
        const {children, spacing, textStyle} = this.props;
        const letterStyles = [
            textStyle,
            {
                paddingRight: Platform.OS === 'ios' ? spacing : spacing + 3,
                fontFamily: 'OpenSans-Regular',
                backgroundColor:'transparent',
            }
        ];
        return (
            <Text style={letterStyles}>{children}</Text>
        );
    }
}