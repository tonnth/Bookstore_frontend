import React, {Component, PropTypes} from 'react';
import {AlertIOS} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default class FingerprintPopup extends Component
{
    componentDidMount()
    {
        FingerprintScanner
            .authenticate({description: 'Scan your fingerprint on the device scanner to continue'})
            .then(() =>
            {
                this.props.handlePopupDismissed(true);
                AlertIOS.alert('Authenticated successfully');
            })
            .catch((error) =>
            {
                this.props.handlePopupDismissed(false);
                AlertIOS.alert(error.message);
            });
    }

    render()
    {
        return false;
    }
}