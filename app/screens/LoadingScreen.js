import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import {connect} from "react-redux";
import TextWithSpacing from "../components/LetterSpacing/TextWithSpacing"

import Globals, {
    UPDATE_CURRENT_SCREEN, UPDATE_TOKEN, resetAction, UPDATE_CART, UPDATE_NEW_BOOKS,
    UPDATE_PROMOTION_BOOKS, getBookById
} from "../Globals";
import TimerMixin from 'react-timer-mixin';
import * as api from "../config/api";
import FastImage from "react-native-fast-image";
import {getFromLocal} from "../config/storage";
import store from "../Store";
import {NavigationActions} from "react-navigation";

export const getUserData = (token,cart) =>
{

}
class LoadingScreen extends Component
{
    constructor(props)
    {
        console.log("LOADING SCREEN");
        super(props);
        console.log('LOADING SCREEN',props);
    }

    render()
    {
        console.log(this.props.navigation.state.routeName + ' Render');
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#fff'}
                    translucent={false}
                />
                <View
                    style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff'}}

                    blurRadius={Platform.OS === 'ios' ? 7 : 2}
                    resizeMode={'cover'}>

                    <View style={{width: 300, alignItems: 'center', justifyContent: 'center', marginTop: 150}}>
                        <Image
                            source={require("../img/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"/>

                        <TextWithSpacing spacing={6} textStyle={styles.title}>
                            {Globals.APPNAME.toUpperCase()}
                        </TextWithSpacing>
                    </View>

                    <Image
                        style={styles.loadicon}
                        source={require("../img/loading.gif")}/>
                </View>
            </View>
        );
    }

    async getData()
    {
        await api.getAllBooks();
        await api.getBanner();
        var listBooks =this.props.reduxState.listBooks;
        // await api.getPromotionBooks();
        // await api.getNewBooks();
        var listNewBooks = [];
        var listPromotionBooks = [];

        for(i=0; i < listBooks.length; i++)
        {
            if(listBooks[i].TrangThai === 1)
            {
                listNewBooks.push(listBooks[i]);
            }
            if(listBooks[i].TrangThai != -1 && listBooks[i].KhuyenMai != 0)
            {
                listPromotionBooks.push(listBooks[i]);
            }
        }

        store.dispatch({type: UPDATE_NEW_BOOKS, payload: listNewBooks});
        store.dispatch({type: UPDATE_PROMOTION_BOOKS, payload: listPromotionBooks});

        var token = await getFromLocal('token');
        if (token != null && token != undefined)
        {
            store.dispatch({type: UPDATE_TOKEN, payload: token});
            await api.getUserInfo(token).then(() => this.props.navigation.navigate('Home', {screen: 'Home'}));
            await api.getOrderHistory(token);
            await api.getFavouriteBooks(token);

                await api.getCart(token);
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

        }
        else this.props.navigation.navigate('Home', {screen: 'Home'});

        //this.props.navigation.dispatch(resetAction);

    }

    componentDidMount()
    {
        let that = this;
        //Loaindg data
        // TimerMixin.setTimeout(() =>
        // {
        //     that.props.navigation.navigate('Home');
        // }, 1000);

        this.getData();
    }

    shouldComponentUpdate(nextProps)
    {
        console.log(this.props.navigation.state.routeName + ' Render', nextProps);
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

const mapStateToProps = (reduxState) =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(LoadingScreen);

const styles = StyleSheet.create({
    container: {flex: 1},
    buttonForgot: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-end'
    },
    logo: {
        height: 130,
        width: 100,
        marginBottom: 40,
    },
    title: {
        color: '#000',
        fontSize: 40,
        fontWeight: '700'
    },
    loadicon: {
        position: 'absolute',
        bottom: -60,
        alignSelf: 'center',
        width: 400,
        height: 300,
    }
});
