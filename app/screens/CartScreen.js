import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet, StatusBar, Platform, DeviceEventEmitter
} from "react-native";

import {connect} from "react-redux";
import Globals, {
    FETCHING_NEW_BOOKS_FAIL, formatCurency, removeFromCart, TheLoai, UPDATE_CURRENT_SCREEN,
    updateCartItem, accountingTotal
} from "../Globals";
import * as api from "../config/api";
import HImage from "../components/HImage";
import LinearGradient from "react-native-linear-gradient";
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Card} from 'native-base';
import {HButtonBack} from "../components/HButtonBack";
import HButton from "../components/HButton";
import UIStepper from 'react-native-ui-stepper';
import store from "../Store";
import Feather from "react-native-vector-icons/Feather";

const {height, width} = Dimensions.get("window");

class CartScreen extends Component
{
    constructor(props)
    {
        console.log("Cart Screen");
        super(props);
        this.params = this.props.navigation.state.params;
        this.total = accountingTotal(this.props.reduxState.cart);
        this.state = {
            page: 1,
            refreshing: false,
            value: 10,
            total_page: 1,
            dataSource: this.props.reduxState.cart,
            total: this.total,
        };
        this.itemWidth = width;
    }

    handleRefresh = () =>
    {
        // this.setState(
        //     {
        //         refreshing: true,
        //         page: 1,
        //         dataSource: [],
        //     },
        // );
        // // Toast.show(this.state.page + " / " + this.state.total_page);
        // this.getData();
    };

    handleLoadMore = () =>
    {
        // this.setState(
        //     {
        //         page: this.state.page + 1,
        //     }
        // );
        // if (this.state.page > this.state.total_page) return;
        // // Toast.show(this.state.page + " / " + this.state.total_page);
        // this.getData();
    };

    render()
    {
        let {params} = this.props.navigation.state;
        console.log(this.props.navigation.state.routeName + ' Render');
        this.heightFooter = 80;
        let empty = this.state.dataSource.length === 0;
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                />
                <Header style={styles.header}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow>
                    <Left>
                        <Button transparent
                                onPress={() =>
                                {
                                    if (params.updateSp)
                                    {
                                        params.updateSp();
                                    }

                                    this.props.navigation.goBack(null)
                                }}>
                            <Icon name="arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>
                        Giỏ hàng
                    </Title>
                    </Body>
                    <Right>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="ios-search"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Right>
                </Header>
                {this.renderBody()}
                {!empty &&
                <View style={[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    height: this.heightFooter,
                    zIndex: 100,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderWidth: 0,
                    borderColor: '#fff'
                }, styles.shadow]}>
                    <View>
                        <Text
                            numberOfLines={1}
                            style={{opacity: 0.8, fontSize: 15, fontWeight: '600', marginBottom: 5}}>Tổng cộng</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontWeight: '800', fontSize: 22, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                textShadowOffset: {width: -1, height: 1},
                                textShadowRadius: 2
                            }}>{formatCurency(this.state.total)}</Text>

                    </View>

                    <HButton text={'Xác nhận'}
                             width={140}
                             navigation={this.props.navigation}
                             shadow
                             border={20}
                             action={() => this.props.navigation.navigate('Confirm')}
                    />
                </View>}
            </View>
        );
    }

    renderItem = ({item, index}) =>
    {
        console.log(item);
        let tempUri = Globals.BASE_URL + item.HinhAnh;
        let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = 100;
        let heightImage = widthImage * 3 / 2;
        let marginBottom = index === this.state.dataSource.length - 1 ? this.heightFooter + 10 : 0;

        return (
            <View style={{
                width: this.itemWidth,
                padding: 30,
                paddingBottom: 0,
                paddingRight: 10,
                height: heightImage + 50,
                marginBottom: marginBottom
            }}>
                <Card style={{flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 30}}>
                    <View style={{flex: 1, marginLeft: widthImage, marginTop: 10, marginRight: 40}}>
                        <Text
                            style={styles.tensach}
                            numberOfLines={2}>{item.TenSach}</Text>

                        <Text
                            numberOfLines={1}
                            style={styles.giaban}>{formatCurency(giaKhuyenMai)}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text
                                numberOfLines={1}
                                style={styles.giaban2}>
                                {item.KhuyenMai > 0 ? formatCurency(item.GiaBan) : ''}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={styles.khuyenmai}>
                                {item.KhuyenMai > 0 ? '-' + item.KhuyenMai + '%' : ''}
                            </Text>
                        </View>
                        <View style={{position: 'absolute', bottom: 20, right: -20}}>
                            <UIStepper
                                initialValue={item.SoLuongBan}
                                minimumValue={1}
                                maximumValue={item.SoLuongTon}
                                displayValue={true}
                                borderRadius={20}
                                borderWidth={2}
                                fontSize={20}
                                borderColor={'#9E9E9E'}
                                tintColor={'#9E9E9E'}
                                textColor={'#616161'}
                                onValueChange={async (value) =>
                                {
                                    if (value > item.SoLuongBan)
                                    {
                                        this.total += item.GiaBan * (1 - item.KhuyenMai / 100);
                                    }
                                    if (value < item.SoLuongBan)
                                    {
                                        this.total -= item.GiaBan * (1 - item.KhuyenMai / 100);
                                    }

                                    this.setState({
                                        total: this.total,
                                    })
                                    item.SoLuongBan = value;
                                    await updateCartItem(item, this.props.reduxState.cart);
                                }}
                            />
                        </View>
                    </View>
                    <Button transparent
                            style={{position: 'absolute', top: 0, right: 0}}
                            onPress={async () =>
                            {
                                console.log(item);
                                this.total -= item.GiaBan * (1 - item.KhuyenMai / 100) * item.SoLuongBan;
                                await this.setState({
                                    total: this.total,
                                })


                                this.state.dataSource.splice(index, 1);
                                removeFromCart(item, this.props.reduxState.cart);
                                this.setState({
                                    dataSource: this.state.dataSource,
                                });
                            }}>
                        <Feather name="x"
                                 style={{color: '#000', fontSize: Globals.ICONSIZE - 10, opacity: 0.7}}/>
                    </Button>

                </Card>

                <HImage
                    style={{width: widthImage, height: heightImage, position: 'absolute', top: 10, left: 10}}
                    uri={tempUri}
                    borderRadius={5}
                />
            </View>
        );
    };

    renderBody = () =>
    {
        if (this.state.dataSource.length > 0)
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        //refreshing={this.state.refreshing}
                        //onRefresh={this.handleRefresh}
                        //onEndReached={this.handleLoadMore}
                        //onEndThreshold={0}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>);

        else
            return (
                <View style={{flex: 1}}>
                    <Image
                        source={require('../img/emptyCart.jpg')}
                        style={{width: window.width, height: 400, backgroundColor: '#000'}}
                    />
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
                        <Text style={styles.textTitle}>
                            Giỏ hàng của bạn đang trống
                        </Text>

                        <HButton text={'Tiếp tục mua sắm'}
                                 width={200}
                                 style={{marginTop: 20}}
                                 border={20}
                                 navigation={this.props.navigation}
                                 action={() => this.props.navigation.goBack()}
                                 shadow/>
                    </View>
                </View>);
    }

    componentDidMount()
    {
        store.dispatch({type: UPDATE_CURRENT_SCREEN, payload: 'Cart'})
    }

    shouldComponentUpdate(nextProps)
    {
        console.log('Cart Render', nextProps);
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

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 22,
        fontWeight: '600',
        ...Platform.select({
            ios: {
                width: 300,
            },
        }),
    },
    icon: {
        opacity: 0.5,
        height: 18,
        width: 20,
    },
    tensach: {
        ...Globals.FONT,
        color: '#000',
        fontWeight: '600',
        fontSize: 17,
    },
    giaban: {
        ...Globals.FONT,
        color: Globals.COLOR.MAINCOLOR,
        fontWeight: '600',
        fontSize: 16,
        textDecorationLine: 'none'
    },
    giaban2: {
        ...Globals.FONT,
        color: '#000',
        opacity: 0.7,
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    tentheloai: {
        ...Globals.FONT,
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        opacity: 1,
    },
    khuyenmai: {
        ...Globals.FONT,
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 15,
        textDecorationLine: 'none'
    },
    textTitle: {
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        fontSize: 22,
        backgroundColor: 'transparent',
        fontWeight: "600",
        marginBottom: 30,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -0.5},
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
    }
});

