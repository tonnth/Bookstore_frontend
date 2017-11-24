import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image
} from 'react-native';
 import Header from "../components/Header";
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class HomeScreen extends Component
{
    render()
    {
        return (
            <View style={{flex: 1, backgroundColor: '#B4B4'}}>

                {/*<Header >*/}
                    {/*<Left/>*/}
                    {/*<Body>*/}
                    {/*<Title>Header</Title>*/}
                    {/*</Body>*/}
                    {/*<Right />*/}
                {/*</Header>*/}

                <Header onOpen = { this.props.navigation}/>

                <Text>Home Screen</Text>


            </View>
        );
    }
}
