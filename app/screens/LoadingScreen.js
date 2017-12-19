import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import {connect} from "react-redux";
import TextWithSpacing from "../components/LetterSpacing/TextWithSpacing"
import Globals from "../Globals";
import TimerMixin from 'react-timer-mixin';
import * as api from "../config/api";


class LoadingScreen extends Component
{
    constructor(props)
    {
        console.log("LOADING SCREEN");
        super(props);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#fff'}
                    translucent={false}
                />
                <ImageBackground
                    style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff'}}
                    // source={require('../img/loadingbackground.jpg')}
                    blurRadius={Platform.OS === 'ios' ? 7 : 2}
                    resizeMode={'cover'}>

                    <View style={{width: 300, alignItems: 'center', justifyContent: 'center', marginTop:150}}>
                        <Image
                            source={require("../img/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"/>

                        <TextWithSpacing spacing={6} textStyle={styles.title}>
                            {Globals.APPNAME.toUpperCase()}
                        </TextWithSpacing>
                    </View>

                    <Image
                        source={require("../img/loading.gif")}
                        style={styles.loadicon}
                        resizeMode="contain"/>
                </ImageBackground>
            </View>
        );
    }

    async getData()
    {
        let nav = this.props.navigation;
        await api.getSachKhuyenMai();
        await  api.getSachMoi();
        console.log(this.props.reduxState.listPromotionBooks);
        //nav.navigate('Home');

        nav.navigate('Cart');
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
    loadicon:{
        position: 'absolute',
        bottom: -60,
        alignSelf: 'center',
        width: 400,
        height: 300,
    }
});
