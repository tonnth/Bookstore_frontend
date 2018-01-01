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
import CartScreen from "./app/screens/CartScreen";
import ConfirmScreen from "./app/screens/ConfirmScreen";
import FavoriteScreen from "./app/screens/FavoriteScreen";
import OrderScreen from "./app/screens/OrderScreen";
import OrderDetailScreen from "./app/screens/OrderDetailScreen";
import SearchScreen from "./app/screens/SearchScreen";
import AccountScreen from "./app/screens/AccountScreen";

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
        Login: {screen: LoginScreen},
        SignUp: {screen: SignUpScreen},

        Home: {screen: HomeScreen},
        Account: {screen: AccountScreen},
        Detail: {screen: DetailScreen},
        Search:{screen: SearchScreen},
        Confirm: {screen: ConfirmScreen},
        Order: {screen: OrderScreen},

        OrderDetail:{screen: OrderDetailScreen},

        Favorite: {screen: FavoriteScreen},
        Cart: {screen: CartScreen},



        VerList: {screen: VerListScreen},
        Address: {screen: AddressScreen},
        NoInternet: {screen: NoInternetScreen},
        Cart: {screen: CartScreen},
        Confirm: {screen: ConfirmScreen},

        Forgot: {screen: ForgotScreen},

        ChangeInfo: {screen: ChangeInfoScreen},
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




