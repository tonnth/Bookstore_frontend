import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StyleSheet, StatusBar,
} from 'react-native';
import HeaderDetail from '../components/HeaderDetail';
import Globals from "../Globals";
import HButton from "../components/HButton";

export default class NoInternetScreen extends Component
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
        console.log(this.props.navigation.state.routeName +  ' Render');
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#fff'}
                    translucent
                />
                <Image
                    source={require("../img/nointernet.gif")}
                    style={styles.image}
                    resizeMode="contain"/>

                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={styles.textTitle}>
                        OOPS
                    </Text>

                    <Text style={{
                        fontFamily: 'OpenSans-Regular',
                        color: '#000',
                        backgroundColor: 'transparent',
                        width: 250,
                        margin: 20,
                        fontSize: 18
                    }}>
                        Vui kiểm tra lại kết nối mạng của thiết bị
                    </Text>

                    <HButton text={'Trở lại trang chủ'}
                             width={200}
                             style={{marginTop: 20}}
                             border={20}
                             navigation={this.props.navigation}
                             action={() => this.props.navigation.navigate("Home")}
                             shadow/>
                </View>
            </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        flex: 1
    },
    textTitle: {
        marginTop: -50,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        fontSize: Globals.TITLESIZE_MEDIUM,
        backgroundColor: 'transparent',
        fontWeight: "600",
    },
});