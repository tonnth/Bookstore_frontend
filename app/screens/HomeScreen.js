import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions, StatusBar, StyleSheet, ScrollView,Platform
} from 'react-native';
import {connect} from "react-redux";

import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input} from 'native-base';
import HorizontalList from '../components/HorizontalList'
import Carousel from 'react-native-snap-carousel';

const cards = [
    {
        name: 'Toà nhà Saigon Centre',
        phone: '(84.28) 62.706.333',
        time: '9:30 - 22:00',
        image: 'http://alqabdah.com/wp-content/uploads/2017/01/500.jpg'
    },
    {
        name: 'Takashimaya Vietnam',
        phone: '(84.28) 38.277.239',
        time: '9:30 - 21:30',
        image: 'https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb5d94587ec_-_tallest-buildings-05-1214-lgn.jpg'
    },
    {
        name: 'Phố đi bộ Nguyễn Huệ',
        phone: '(84.28) 37.442.313',
        time: '9:30 - 21:30',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMY8o5OoSftqg_yNLsA1hBvXLOZ4GbXZUM16aIp2cZafwWK3nb'
    },
    {
        name: 'Buzza Pizza',
        phone: '(84.28) 35.511.568',
        time: '9:00-22:30',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGg6XCdw5PQx3wY9yAtBFvYpUfwdT04QChn8Y6_ODQWPj8H7GboQ'
    },
    {
        name: 'HALO',
        phone: '(84.28) 38.301.822',
        time: '9:00 - 22:00',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnvYeoHwLHazqphO9ufhxALgsqA1SfTVO4gLiWv7EMn4jA2mzv'
    },
];

class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            index: 0,
            name: cards[0].name,
            decrip: cards[0].phone,
            searching: false,
        };
        that = this;
    }

    render()
    {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}
                        iosStatusbar="light-content"
                        androidStatusBarColor="#000"
                        noShadow>
                    <Left style={{flex: 1}}>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Image
                                source={require("../img/menu.png")}
                                style={styles.icon}/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                    <Title
                        style={{color: 'black', letterSpacing: 1.5, fontFamily: 'OpenSans-Regular'}}>BOOKSTORE</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}>
                        <Item style={styles.searchbar}>
                            <Icon name="ios-search"/>
                            <Input placeholder="Search"
                                   autoCapitalize="none"
                                   ref={'search'}
                                   onChangeText={(text) =>
                                   {
                                       console.log(text);
                                       this.setState({
                                           searching: text.length > 0 ? true : false,
                                       });
                                   }}
                                   onSubmitEditing={(event) =>
                                   {
                                       console.log("submit");
                                   }}/>
                            {(this.state.searching) &&
                            <Button transparent
                                    onPress={() =>
                                    {
                                        this.refs.search.setNativeProps({text: ""});
                                        this.setState({
                                            searching: false,
                                        });
                                    }}>
                                <Icon name="ios-close-outline" style={{color: '#000'}}/>
                            </Button>}
                        </Item>
                    </View>

                    <View style={{height: 180,}}>
                        <Carousel
                            ref={(c) =>
                            {
                                this._carousel = c;
                            }}
                            data={cards}
                            renderItem={this.renderItem
                            }
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            containerCustomStyle={
                                {
                                    flex: 1
                                }
                            }
                            onSnapToItem={this.updateView}
                            autoplay={true}
                            loop={true}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: -10,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'OpenSans-Regular',
                                color: "black",
                                backgroundColor: 'transparent',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                            {this.state.name}
                        </Text>
                    </View>

                </ScrollView>
            </Container>
        );
    }

    updateView = (index) =>
    {
        console.log(index);
        this.setState({
            index: index,
            name: cards[index].name,
            decrip: cards[index].phone,
        })
    };

    renderItem = ({item, index}) =>
    {
        return (
            <View style={styles.slide}>
                <View style={styles.slideInnerContainer}>
                    <Image
                        source={{uri: item.image}}
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                            borderRadius: 10,
                        }}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(HomeScreen);

const horizontalMargin = 5;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 150;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })
    },
    header: {
        paddingRight: 15,
        paddingLeft: 15,
        // shadowOffset: {height: 0, width: 0},
        // shadowOpacity: 0,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        // elevation: 0
    },
    searchbar: {
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
    },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        padding: 15
    },
    icon: {
        height: 27,
        width: 27,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 20,
    },

    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin,
        // other styles for the item container
        marginTop: 10,
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
        // other styles for the inner container
        backgroundColor: 'white',
        borderRadius: 10,

        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,

        // android (Android +5.0)
        elevation: 10,
    },
});