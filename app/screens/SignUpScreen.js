import React, {Component} from 'react';
import {
    View, Text, Image, ImageBackground, StyleSheet, StatusBar, Platform, TouchableOpacity
} from 'react-native';
import {Button, Header, Icon, Input, Item, Label, Left} from "native-base";
import LoadingButton from 'react-native-loading-button';
import Globals, {validateEmail} from "../Globals";
import LinearGradient from "react-native-linear-gradient";
import {TextField} from 'react-native-material-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {HeaderBackButton} from 'react-navigation';
import {HButtonBack} from "../components/HButtonBack";
import {HInput} from "../components/HInput";
import HButton from "../components/HButton";
import FastImage from "react-native-fast-image";
import Toast, {DURATION} from 'react-native-easy-toast'
import * as api from "../config/api";
import {setToLocal} from "../config/storage";

export default class SignUpScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            email: '',
            password1: '',
            password2: '',
            name:'',
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
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
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
                            ĐĂNG KÍ
                        </Text>

                        <HInput label="Email"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        email: text,
                                    })
                                }}
                        />

                        <HInput label="Họ và tên"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        name: text,
                                    })
                                }}
                        />

                        <HInput label="Mật khẩu"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        password1: text,
                                    })
                                }}
                                secureTextEntry={true}
                        />

                        <HInput label="Xác nhận mật khẩu"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        password2: text,
                                    })
                                }}
                                secureTextEntry={true}
                        />

                        <HButton text={'Đăng kí'}
                                 width={200}
                                 style={{marginBottom: 40, marginTop: 40}}
                                 navigation={this.props.navigation}
                                 border={20}
                                 action = { async () =>
                                 {
                                     if(this.state.email == '' )
                                     {
                                         this.refs.toast.show('Vui lòng nhập email và mật khẩu',1000);
                                         return;
                                     }
                                     if(!validateEmail(this.state.email))
                                     {
                                         this.refs.toast.show('Email không hợp lệ',1000);
                                         return;
                                     }
                                     if(this.state.name.length < 4)
                                     {
                                         this.refs.toast.show('Họ tên phải có ít nhất 4 kí tự',1000);
                                         return;
                                     }
                                     if(this.state.password1.length < 4)
                                     {
                                         this.refs.toast.show('Mật khẩu phải có ít nhất 4 kí tự',1000);
                                         return;
                                     }
                                     if(this.state.password1 != this.state.password2 )
                                     {
                                         this.refs.toast.show('Xác nhận mật khẩu không khớp',1000);
                                         return;
                                     }


                                     try
                                     {

                                         var res = await api.SignUp(this.state.email,this.state.password1,this.state.name);
                                     }
                                     catch(err)
                                     {
                                         console.log('Lỗi: ',err);
                                     }
                                     this.refs.toast.show(res.data.message,1000);
                                     if(res.data.code  === 200)
                                     {

                                         this.props.navigation.navigate('Login');
                                     }
                                 }}
                        />
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
        fontSize: Globals.TITLESIZE_BIG,
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
