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
                    source={{uri: 'data:image/jpeg;base64,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'}}
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
                                 navigation={this.props.navigation}/>
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
