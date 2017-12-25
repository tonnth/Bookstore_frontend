import React, {Component} from 'react';
import {
    View, Text, Image, ImageBackground, StyleSheet, StatusBar, Platform, TouchableOpacity
} from 'react-native';
import {Button, Header, Icon, Input, Item, Label, Left} from "native-base";
import LoadingButton from 'react-native-loading-button';
import Globals from "../Globals";
import LinearGradient from "react-native-linear-gradient";
import {TextField} from 'react-native-material-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {HeaderBackButton} from 'react-navigation';
import {HButtonBack} from "../components/HButtonBack";
import HButton from "../components/HButton";
import {HInput} from "../components/HInput";
import FastImage from "react-native-fast-image";

export default class ForgotScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            email: '',
            password: '',
        };
        this.isLoading = false
    }

    render()
    {
        console.log(this.props.navigation.state.routeName +  ' Render');
        return (
            <KeyboardAwareScrollView
                innerRef={ref =>
                {
                    this.scroll = ref
                }}
                enableOnAndroid={false}
                contentContainerStyle={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                    translucent
                />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <FastImage
                        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                        source={{
                            uri: Globals.URIIMAGE,
                            priority: FastImage.priority.normal,
                        }}/>
                    <LinearGradient colors={Globals.GRADIENT_COLOR}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        opacity: Globals.GRADIENT_OPACITY
                                    }}/>
                    <HButtonBack navigation={this.props.navigation}/>

                    <View style={{width: 300, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.textTitle}>
                            QUÊN MẬT KHẨU
                        </Text>
                        <Text style={{
                            fontFamily: 'OpenSans-Regular',
                            color: '#fff',
                            backgroundColor: 'transparent',
                            alignSelf: 'flex-start',
                            marginTop: 20,
                            marginBottom: 20,
                            fontSize: 18
                        }}>
                            Vui lòng nhập email đã đăng kí để lấy lại mật khẩu
                        </Text>

                        <HInput label="Email"
                                width={300}/>

                        <HButton text={'Gửi lại mật khẩu'}
                                 width={220}
                                 style={{marginBottom: 40, marginTop: 40}}
                                 navigation={this.props.navigation}
                                 border={20}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    shouldComponentUpdate(nextProps)
    {
        console.log(this.props.navigation.state.routeName +  ' Render' , nextProps);
        return true;
        // if (nextProps.navigation.stackNav.index === 0)
        // {
        //     // NOTE WELL: THIS IS A ROUGH CUT CONDITION
        //     // MAKE SURE TO IMPLEMENT IT PROPERLY
        //     // IN YOUR COMPONENT
        //
        //     return true;
        // }
        // return false;
    }
}

const buttonHeight = 40;

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        backgroundColor: 'transparent'
    },
    textTitle: {
        fontFamily: 'OpenSans-Regular',
        color: '#fff',
        fontSize: Globals.TITLESIZE_MEDIUM -2,
        backgroundColor: 'transparent',
        fontWeight: "600",
        alignSelf: 'flex-start'
    },
    logo: {
        height: 130,
        width: 100,
        marginBottom: 40,
    },
});
