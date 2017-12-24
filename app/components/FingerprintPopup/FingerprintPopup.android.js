import React, {Component, PropTypes} from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import PopupDialog, {ScaleAnimation} from 'react-native-popup-dialog';

const scaleAnimation = new ScaleAnimation();

export default class FingerprintPopup extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {errorMessage: undefined};
    }

    componentDidMount()
    {
        FingerprintScanner
            .authenticate({onAttempt: this.handleAuthenticationAttempted})
            .then(() =>
            {
                this.props.handlePopupDismissed(true);
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) =>
            {
                this.props.handlePopupDismissed(false, error.message);
                Alert.alert('Fingerprint Authentication', error.message);
            });
    }

    componentWillUnmount()
    {
        FingerprintScanner.release();
    }

    handleAuthenticationAttempted = (error) =>
    {
        //this.setState({errorMessage: error.message});
    };

    render()
    {
        return false;
    }
}