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
                this.props.handlePopupDismissed(false);
                this.setState({errorMessage: error.message});
            });
    }

    componentWillUnmount()
    {
        FingerprintScanner.release();
    }

    handleAuthenticationAttempted = (error) =>
    {
        this.setState({errorMessage: error.message});
    };

    render()
    {
        const {errorMessage} = this.state;
        const {handlePopupDismissed} = this.props;

        return (
            <View style={{}}>
                <View>

                    <Image
                        source={{uri: 'http://www.psdgraphics.com/file/fingerprint-icon.jpg'}}
                    />

                    <Text>
                        Fingerprint{'\n'}Authentication
                    </Text>
                    <Text>
                        {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
                    </Text>

                    <TouchableOpacity
                        onPress={() => handlePopupDismissed(false)}
                    >
                        <Text>
                            BACK TO MAIN
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}