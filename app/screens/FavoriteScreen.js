import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet, StatusBar, Platform
} from "react-native";

import {connect} from "react-redux";
import Globals, {formatCurency, TheLoai} from "../Globals";
import * as api from "../config/api";
import HImage from "../components/HImage";
import LinearGradient from "react-native-linear-gradient";
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Card, Badge} from 'native-base';
import {HButtonBack} from "../components/HButtonBack";
import HButton from "../components/HButton";
import UIStepper from 'react-native-ui-stepper';
import {DURATION} from "react-native-easy-toast";
import Toast from "react-native-easy-toast";
import IconFeather from 'react-native-vector-icons/Feather';

const {height, width} = Dimensions.get("window");

class FavoriteScreen extends Component
{
    constructor(props)
    {
        console.log("FAVORITE SCREEN");
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            page: 1,
            refreshing: false,
            value: 10,
            total_page: 1,
            dataSource: [1, 2]
        };
        this.itemWidth = width;
    }

    componentDidMount()
    {

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
        console.log(this.props.navigation.state.routeName +  ' Render');
        let empty = this.state.dataSource.length === 0;
        let sanpham = 0;
        this.heightFooter = 80;
        return (
            <View style={[styles.container, {backgroundColor: empty ? '#FFF6D7' : '#fff'}]}>
                <StatusBar
                    translucent={false}
                />
                <Header style={[styles.header, {backgroundColor: empty ? '#FFF6D7' : '#fff'}]}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>
                        Sách yêu thích
                    </Title>
                    </Body>
                    <Right style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                        <Button transparent
                                style={{marginRight: sanpham > 0 ? -25: 0,}}
                                onPress={() => this.props.navigation.navigate("Cart")}>
                            <IconFeather name="shopping-cart" size={25} color="#000"/>
                        </Button>
                        {sanpham > 0 &&
                        <Badge warning style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{sanpham}</Text>
                        </Badge>}
                    </Right>
                </Header>
                {this.renderBody()}
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
            </View>
        );
    }

    renderItem = ({item, index}) =>
    {
        //let tempUri = Globals.BASE_URL + item.HinhAnh;
        //let tenSach = 'dac nhan tam';
        //let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = 100;
        let heightImage = widthImage * 3 / 2;

        let tempUri = 'http://sachnoionline.net/upload/book/107.jpg';
        let tenSach = 'dac nhan tam dfbdfndfndfndndndfndfnfnfnfnfnfnfnfnfnfnfnf';
        let giaKhuyenMai = 100000;
        let giaBan = 130000;
        let khuyenMai = 40;

        return (
            <View style={{
                width: this.itemWidth,
                padding: 30,
                paddingBottom: 0,
                paddingRight: 10,
                height: heightImage + 40,
            }}>
                <Card style={{flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 30}}>
                    <View style={{flex: 1, marginLeft: widthImage, marginTop: 10, marginRight: 40}}>
                        <Text
                            style={styles.tensach}
                            numberOfLines={2}>{tenSach}</Text>

                        <Text
                            numberOfLines={1}
                            style={styles.giaban}>{formatCurency(giaKhuyenMai)}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text
                                numberOfLines={1}
                                style={styles.giaban2}>
                                {formatCurency(giaBan)}{" "}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={styles.khuyenmai}>
                                -{khuyenMai}%
                            </Text>
                        </View>
                    </View>
                    <Button transparent
                            style={{position: 'absolute', top: 0, right: 0}}
                            onPress={() =>
                            {
                                this.state.dataSource.splice(index, 1);
                                this.setState({
                                    dataSource: this.state.dataSource,
                                });
                            }}>
                        <Icon name="ios-close-outline"
                              style={{color: '#000', fontSize: Globals.ICONSIZE + 5, opacity: 0.8}}/>
                    </Button>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: Globals.COLOR.MAINCOLOR,
                            height: heightImage / 2,
                            width: heightImage / 2,
                            borderTopLeftRadius: heightImage / 2,
                            borderTopRightRadius: 5,
                            borderBottomLeftRadius: 5,
                        }}
                        onPress={() =>
                        {
                            this.refs.toast.show('Đã thêm ' + tenSach + ' vào giỏ hàng', DURATION.LENGTH_SHORT);
                        }}
                    >
                        <IconFeather name="shopping-cart" size={30} color="#fff"
                                     style={{
                                         position: 'absolute',
                                         bottom: 15,
                                         right: 15,
                                     }}/>
                    </TouchableOpacity>
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
                        source={{uri: 'https://i.pinimg.com/originals/3c/4f/07/3c4f076f93342366fedd27e087260fda.gif'}}
                        style={{width: window.width, height: 300, backgroundColor: '#FFF6D7'}}
                    />
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFF6D7'}}>
                        <Text style={styles.textTitle}>
                            Bạn chưa có quyển sách yêu thích nào
                        </Text>

                        <HButton text={'Tiếp tục mua sắm'}
                                 width={240}
                                 style={{marginTop: 20}}
                                 border={20}
                                 navigation={this.props.navigation}
                                 action={() => this.props.navigation.goBack()}
                                 shadow/>
                    </View>
                </View>);
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

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(FavoriteScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingRight: 15,
        paddingLeft: 15,
        // shadowOffset: {height: 0, width: 0},
        // shadowOpacity: 0,
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
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        textAlign: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -0.5},
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
    }
});

