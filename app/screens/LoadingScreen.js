import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import {connect} from "react-redux";
import TextWithSpacing from "../components/LetterSpacing/TextWithSpacing"
import Globals from "../Globals";
import TimerMixin from 'react-timer-mixin';
import * as api from "../config/api";
import FastImage from "react-native-fast-image";


class LoadingScreen extends Component
{
    constructor(props)
    {
        console.log("LOADING SCREEN");
        super(props);
    }

    render()
    {
        console.log(this.props.navigation.state.routeName +  ' Render');
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
                        style={styles.loadicon}
                        source={require("../img/loading.gif")}/>
                </View>
            </View>
        );
    }

    async getData()
    {
        let nav = this.props.navigation;
        await api.getSachKhuyenMai();
        await  api.getSachMoi();
        console.log(this.props.reduxState.listPromotionBooks);
        nav.navigate('Home', {screen: 'Home'});


        nav.navigate('Home');

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
