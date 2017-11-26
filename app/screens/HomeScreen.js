import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions
} from 'react-native';
 import Header from '../components/Header';
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';




import HorizontalList from '../components/HorizontalList'

export default class HomeScreen extends Component
{
    render()
    {
        return (
            <View style={{flex: 1, backgroundColor: '#DBDBD8'}}>

                <Header onOpen = { this.props.navigation}/>

                <Text>Home Screen</Text>

                <HorizontalList />

            </View>
        );
    }
}
