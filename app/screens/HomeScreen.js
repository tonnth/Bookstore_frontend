import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions, StatusBar, StyleSheet, ScrollView, Platform
} from 'react-native';
import {connect} from "react-redux";

import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Badge} from 'native-base';
import HorizontalList from '../components/HorizontalList'
import Carousel from 'react-native-snap-carousel';
import Globals, {FETCHING_NEW_BOOKS_FAIL, UPDATE_CURRENT_SCREEN} from "../Globals";
import TextWithSpacing from "../components/LetterSpacing/TextWithSpacing";
import IconFeather from 'react-native-vector-icons/Feather';
import store from '../Store';
import {DeviceEventEmitter} from 'react-native'

const cards = [
    {
        name: 'Không bao giờ là đủ',
        image: Globals.BASE_URL + 'a1.jpg',
        sach: {}
    },
    {
        name: 'Cứ mơ và cứ đi',
        image: Globals.BASE_URL + 'a2.jpg'
    },
    {
        name: 'Bitcoin và tiền kĩ thuật số',
        image: Globals.BASE_URL + 'a3.jpg'
    },
    {
        name: 'Con sẻ vàng',
        image: Globals.BASE_URL + 'a4.jpg'
    },
    {
        name: 'Pikalong và những người bạn',
        image: Globals.BASE_URL + 'a5.jpg',
    },
];

import {NavigationActions} from 'react-navigation';
import PopupDialog from "react-native-popup-dialog";

class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);
        console.log("HOME SCREEN");
        this.state = {
            index: 0,
            name: cards[0].name,
            decrip: cards[0].phone,
            searching: false,
            listPromotionBooks: this.props.reduxState.listPromotionBooks,
            listNewBooks: this.props.reduxState.listNewBooks,
            show: false,
            sanpham: 0,
        };
        that = this;
    }

    update_CartNumber = () => {
        this.setState({
            sanpham: 0,
        })
    }

    render()
    {
        console.log(this.props.navigation.state.routeName + ' Render');
        let sanpham = this.state.sanpham;
        return (
            <Container style={styles.container}>
                <StatusBar
                    translucent={false}
                />

                <Header style={styles.header}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
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
                    <TextWithSpacing spacing={4} textStyle={styles.title}>
                        {Globals.APPNAME.toUpperCase()}
                    </TextWithSpacing>
                    </Body>
                    <Right style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate("Cart", {screenhhh: 'Cart', updateSp: this.update_CartNumber()})}>
                            <IconFeather name="shopping-cart" size={25} color="#000"/>
                            {sanpham > 0 &&
                            <Badge style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 22,
                                height: 22,
                                backgroundColor: 'red',
                                position:'absolute',
                                top:0,
                                right:0,
                            }}>
                                <Text style={{color: '#fff'}}>{sanpham}</Text>
                            </Badge>}
                        </Button>
                    </Right>
                </Header>
                <ScrollView>
                    <TouchableOpacity style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}
                                      onPress={() =>
                                      {
                                          this.props.navigation.navigate('Search');
                                      }}>
                        <View style={styles.searchbar}>
                            <IconFeather name="search" style={{fontSize: 25}}/>
                            <Text style={{marginLeft: 13, fontSize: 17, ...Globals.FONT}}>Search</Text>
                        </View>
                    </TouchableOpacity>

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

                    <HorizontalList
                        title={"Thể loại"}
                        navigation={this.props.navigation}
                        theloai/>

                    <HorizontalList
                        title={"Sách khuyến mãi"}
                        data={this.state.listPromotionBooks}
                        navigation={this.props.navigation}/>

                    <HorizontalList
                        title={"Sách mới cập nhật"}
                        data={this.state.listNewBooks}
                        navigation={this.props.navigation}/>

                </ScrollView>
            </Container>
        );
    }

    updateView = (index) =>
    {
        //console.log(index);
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

    componentDidMount()
    {
        store.dispatch({type: UPDATE_CURRENT_SCREEN, payload: 'Home'})
    }

    shouldComponentUpdate(nextProps)
    {
        console.log('Home Render', nextProps);
        return true;
    }

    renderDialog = () =>
    {
        return (
            <PopupDialog
                ref={(popupDialog) =>
                {
                    this.popupDialog = popupDialog;
                }}
                width={0.9}
                show={this.state.show}
                dialogStyle={{elevation: 10}}>
                <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: 'space-around'}}>
                    <Image
                        style={{width: 150, height: 150, marginTop: -20, marginBottom: -10}}
                        source={require("../img/finger.gif")}/>

                    <Text style={{...Globals.FONT, fontSize: 20, fontWeight: '600'}}>Vui lòng xác thực để tiếp
                                                                                     tục</Text>
                    <Text style={{
                        ...Globals.FONT,
                        fontSize: 16,
                        textAlign: 'center',
                    }}>
                        Vui lòng đặt ngón tay của bạn lên máy quét vân tay của thiết bị để xác thực
                    </Text>

                    <TouchableOpacity
                        onPress={() => this.handleFingerprintDismissed(false)}>
                        <Text style={{...Globals.FONT, fontSize: 20, fontWeight: '600', color: 'red'}}>
                            Hủy bỏ
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupDialog>
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
        borderBottomColor: '#212121',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        opacity: 0.5
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
        transform: [{rotateY: '180deg'}]
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
    title: {
        color: '#000',
        fontWeight: '600'
    }
});