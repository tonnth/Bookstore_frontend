import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import HeaderDetail from '../components/HeaderDetail';
import Globals from "../Globals";
import {HButton} from "../components/HButton";
import {connect} from "react-redux";
import {HButtonBack} from "../components/HButtonBack";
import LinearGradient from "react-native-linear-gradient";

class LoadingScreen extends Component
{
    constructor(props)
    {
        console.log("NO INTERNET SCREEN");
        super(props);
        this.params = this.props.navigation.state.params;
        console.log(this.params);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'transparent'}
                    translucent
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

                        <Text
                            style={styles.title}>BOOKSTORE</Text>
                    </View>

                    <Image
                        source={require("../img/loading.gif")}
                        style={styles.loadicon}
                        resizeMode="contain"/>
                </ImageBackground>
            </View>
        );
    }

    componentDidMount()
    {
        //Loaindg data
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
        letterSpacing: 6,
        fontFamily: 'OpenSans-Regular',
        backgroundColor:'transparent',
        fontSize: 30,
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