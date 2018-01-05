import React, {Component} from 'react';
import {
    View, Text, Image, ImageBackground, StyleSheet, StatusBar, Platform, TouchableOpacity
} from 'react-native';
import {Button, Header, Icon, Input, Item, Label} from "native-base";
import Globals, {UPDATE_CART, UPDATE_TOKEN, validateEmail} from "../Globals";
import LinearGradient from "react-native-linear-gradient";
import * as api from "../config/api";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {HInput} from "../components/HInput";
import HButton from "../components/HButton";
import {HButtonBack} from "../components/HButtonBack";

import Toast, {DURATION} from 'react-native-easy-toast'

import FastImage from "react-native-fast-image";
import {getFromLocal, setToLocal} from "../config/storage";
import store from "../Store";
import {connect} from "react-redux";

class LoginScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            Email: '',
            Password: '',

        };

    }

    render()
    {
        console.log(this.props.navigation.state.routeName + ' Render');
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
                        <Image
                            source={require("../img/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"/>

                        <HInput label="Email"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        Email: text,
                                    })
                                }}
                        />

                        <HInput label="Mật khẩu"
                                width={300}
                                onChangeText ={(text)=>{
                                    this.setState({
                                        Password: text,
                                    })
                                }}
                                secureTextEntry={true}
                        />

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
                                 action ={ async ()=>
                                 {
                                     if(this.state.Email == '' )
                                     {
                                         this.refs.toast.show('Vui lòng nhập email và mật khẩu',1000);
                                         return;
                                     }
                                     if(!validateEmail(this.state.Email))
                                     {
                                         this.refs.toast.show('Email không hợp lệ',1000);
                                         return;
                                     }

                                     try
                                     {

                                         var res = await api.Login(this.state.Email,this.state.Password);
                                     } catch(err)
                                     {
                                        console.log('Lỗi đăng nhập: ',err);
                                     }
                                     console.log(res);

                                     if(res.data.code  === 200)
                                     {
                                         //setToLocal('token', res.data.token);
                                         store.dispatch({type: UPDATE_TOKEN, payload: res.data.token});
                                         await api.getUserInfo(res.data.token)
                                         await api.getOrderHistory(res.data.token);
                                         await api.getFavouriteBooks(res.data.token);
                                         api.getCart(res.data.token).then(() =>
                                         {
                                             console.log('ngu:',this.props.reduxState.cart);
                                             var tempCart=this.props.reduxState.cart;
                                             var listBooks= this.props.reduxState.listBooks;
                                             for(i = 0; i< tempCart.length; i++)
                                             {
                                                 for(j=0; j < listBooks.length; j++)
                                                 {
                                                     if(tempCart[i].MaSach === listBooks[j].MaSach)
                                                     {
                                                         tempCart[i].GiaBan = listBooks[j].GiaBan;
                                                         tempCart[i].HinhAnh = listBooks[j].HinhAnh;
                                                         tempCart[i].KhuyenMai = listBooks[j].KhuyenMai;
                                                         tempCart[i].MaTheLoai = listBooks[j].MaTheLoai;
                                                         tempCart[i].MoTa = listBooks[j].MoTa;
                                                         tempCart[i].SoLuongTon = listBooks[j].SoLuongTon;
                                                         tempCart[i].TenSach = listBooks[j].TenSach;
                                                         tempCart[i].TacGia= listBooks[j].TacGia;
                                                         tempCart[i].TrangThai= listBooks[j].TrangThai;
                                                         break;
                                                     }
                                                 }

                                             }
                                             store.dispatch({type: UPDATE_CART, payload: tempCart});

                                         })
                                          this.props.navigation.navigate('Home');
                                     }
                                     else
                                     {
                                         this.refs.toast.show(res.data.message,1000);
                                     }

                                 }}
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
                </View>
            </KeyboardAwareScrollView>
        );
    }

    shouldComponentUpdate(nextProps)
    {
        // console.log(this.props.navigation.state.routeName + ' Render', nextProps);
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
const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(LoginScreen);

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
        bottom: 20,
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
