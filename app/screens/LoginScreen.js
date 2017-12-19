import React, {Component} from 'react';
import {
    View, Text, Image, ImageBackground, StyleSheet, StatusBar, Platform, TouchableOpacity
} from 'react-native';
import {Button, Header, Icon, Input, Item, Label} from "native-base";
import LoadingButton from 'react-native-loading-button';
import Globals from "../Globals";
import LinearGradient from "react-native-linear-gradient";
import {TextField} from 'react-native-material-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {HInput} from "../components/HInput";
import HButton from "../components/HButton";
import {HButtonBack} from "../components/HButtonBack";

export default class LoginScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
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
                <ImageBackground
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    source={require('../img/bookwall.jpg')}
                    blurRadius={Platform.OS === 'ios' ? 2 : 1}>

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
                        <Image
                            source={require("../img/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"/>

                        <HInput label="Email"
                                width={300}/>

                        <HInput label="Mật khẩu"
                                width={300}/>

                        <TouchableOpacity style={styles.buttonForgot}>
                            <Text style={styles.textForgot}
                                  onPress={() => this.props.navigation.navigate("Forgot")}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>

                        <HButton text={'Đăng nhập'}
                                 width={200}
                                 border={20}
                                 style={{marginBottom: 40, marginTop: 40}}
                                 navigation={this.props.navigation}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonSignup}
                                      onPress={() => this.props.navigation.navigate("SignUp")}>
                        <Text style={styles.textSignup}>
                            Chưa có tài khoản? {'\u00A0'}
                            <Text style={{
                                color: Globals.COLOR.MAINCOLOR,
                                fontSize: 16,
                                opacity: 1,
                                fontWeight: "600",
                                marginLeft: 10
                            }}>
                                Đăng kí
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    buttonForgot: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end'
    },
    textForgot: {
        fontFamily: 'OpenSans-Regular',
        color: '#e0e0e0',
        fontSize: 15,
        fontWeight: "600"
    },
    buttonSignup: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 10,
    },
    textSignup: {
        fontFamily: 'OpenSans-Regular',
        color: '#e0e0e0',
        fontSize: 15,
    },
    logo: {
        height: 130,
        width: 100,
        marginBottom: 40,
    },
});
