import React, {Component, PropTypes} from 'react';
import {AlertIOS} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default class FingerprintPopup extends Component
{
    componentDidMount()
    {
        FingerprintScanner
            .authenticate({description: 'Vui lòng dùng sinh trắc học để xác thực'})
            .then(() =>
            {
                this.props.handlePopupDismissed(true);
                AlertIOS.alert('Xác nhận thành công');
            })
            .catch((error) =>
            {
                this.props.handlePopupDismissed(false);
                AlertIOS.alert('Lỗi: ', error.message);
            });
    }

    render()
    {
        return false;
    }
}