import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions
} from 'react-native';
import { connect } from "react-redux";
import Header from '../components/Header';
// import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';




import HorizontalList from '../components/HorizontalList'

class HomeScreen extends Component
{
    render()
    {
        return (
            <View style={{flex: 1, backgroundColor: '#DBDBD8'}}>

                <Header onOpen = { this.props.navigation}/>

                <Text>Home Screen</Text>

                <HorizontalList title='Sách khuyến mãi' nav={this.props.navigation}/>

            </View>
        );
    }
}
const mapStateToProps = reduxState => {
    return { reduxState };
  };
  
  export default connect(mapStateToProps)(HomeScreen);