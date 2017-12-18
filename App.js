/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    StatusBar,
    Text,
} from 'react-native';


import {StackNavigator, DrawerNavigator} from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import DetailScreen from './app/screens/DetailScreen'
import ChangeInfoScreen from './app/screens/ChangeInfoScreen';
import SideMenu from './app/components/SideMenu';
import MenuButton from './app/components/MenuButton';
import Store from './app/Store.js';
import {Provider} from 'react-redux';
import Globals from "./app/Globals";
import SignUpScreen from "./app/screens/SignUpScreen";
import ForgotScreen from "./app/screens/ForgotScreen";
import NoInternetScreen from "./app/screens/NoInternetScreen";
import LoadingScreen from "./app/screens/LoadingScreen";
import AddressScreen from "./app/screens/AddressScreen";
import VerListScreen from "./app/screens/VerListScreen";

export default class App extends Component
{

    static navigationOptions = {
        header: {
            visible: false,
        }
    }

    render()
    {
        return (
            <Provider store={Store}>
                <View style={{flex: 1}}>
                    <Drawer/>
                </View>
            </Provider>
        );
    }
}

export const Stack = StackNavigator(
    {
        Loading: {screen: LoadingScreen},
        Home: {screen: HomeScreen},

        VerList: {screen: VerListScreen},
        Address: {screen: AddressScreen},
        NoInternet: {screen: NoInternetScreen},

        Login: {screen: LoginScreen},
        Forgot: {screen: ForgotScreen},
        SignUp: {screen: SignUpScreen},

        ChangeInfo: {screen: ChangeInfoScreen},
        Detail: {screen: DetailScreen},
    },

    {
        headerMode: 'none',
    }
);
export const Drawer = DrawerNavigator({
        Stack: {screen: Stack},
    },
    {
        drawerWidth: 288,
        drawerPosition: 'left',
        contentComponent: props => <SideMenu {...props} />,
        drawerBackgroundColor: 'white'
    }
);




