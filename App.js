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
                    <StatusBar
                        backgroundColor={Globals.COLOR.MAINCOLOR}
                        barStyle="light-content"
                    />
                    <Drawer/>
                </View>
            </Provider>

        );
    }
}

export const Stack = StackNavigator(
    {
        Home: {screen: HomeScreen},
        ChangeInfo: {screen: ChangeInfoScreen},
        Login: {screen: LoginScreen},
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




