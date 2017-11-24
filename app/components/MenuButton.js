import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';


export class MenuButton extends Component {
    render() {
        const { onPress } = this.props;
        return (
            <TouchableOpacity
                style={{ paddingHorizontal: 20 }}
                onPress={() => onPress()}
            >
                <Image
                    source={require('../img/bars.png')}
                    style={{
                        height: 32,
                        width: 32,
                    }}
                />
            </TouchableOpacity>

        );
    }
}

MenuButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

