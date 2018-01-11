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
import Globals, {formatCurency,formatDate, formatOrderId,TheLoai} from "../Globals";
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

class OrderScreen extends Component
{
    constructor(props)
    {
        console.log("ORDER SCREEN");
        super(props);
        this.params = this.props.navigation.state.params;
        console.log(this.props.reduxState.order_history);
        this.state = {
            page: 1,
            refreshing: false,
            value: 10,
            total_page: 1,
            //dataSource: [1, 2, 3, 4]
            dataSource: this.props.reduxState.order_history,
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
                    <Left >
                        <Button transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="ios-arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body style={{flex:1}}>
                    <Text style={styles.title}>
                        Đơn hàng của tôi
                    </Text>
                    </Body>
                    <Right>

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
        if (index > 0 && item.MaHoaDon === this.state.dataSource[index-1].MaHoaDon) return null;
        if (this.checkItem(item.MaHoaDon, index)) return null;
        //let tempUri = Globals.BASE_URL + item.HinhAnh;
        //let tenSach = 'dac nhan tam';
        //let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = 100;
        let heightImage = widthImage * 3 / 2;

        let tempUri = 'http://sachnoionline.net/upload/book/107.jpg';
        let tenSach = 'dac nhan tam dfbd fndf ndfndndnd fndfnfnfn fnfnfnfnfnfnfnfnf';
        let tongTien = 130000;

        let madon = '#00001233';
        let ngaydat = '08/08/2017';
        let trangthai = ['Xử lý', 'Giao hàng', 'Đã nhận', 'Hủy'];
        let stateColor = ['#E0E0E0', '#FFEB3B', '#0F7F13', '#FF5252'];
        let state = index % 4;
        return (
            <View style={{
                width: this.itemWidth,
                padding: 10,
                paddingBottom: 0,
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <Text>
                        Đơn hàng {" "}
                        <Text
                            style={styles.madon}
                            numberOfLines={1}>{formatOrderId(item.MaHoaDon.toString())}</Text>
                    </Text>

                    <Text
                        style={styles.ngaydat}
                        numberOfLines={1}>{formatDate(item.NgayLapHoaDon.toString())}</Text>
                </View>
                <Card style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                            <HImage
                                style={{width: widthImage, height: heightImage}}
                                uri={Globals.BASE_URL + item.dsSanPham[0].HinhAnh}
                                borderRadius={5}
                            />
                            <View style={{width: widthImage * 2, marginLeft: 10, marginTop: 10}}>
                                <Text
                                    style={styles.tensach}
                                    numberOfLines={2}>{item.dsSanPham[0].TenSach}</Text>

                                <Text
                                    numberOfLines={1}
                                    style={styles.giaban}>{formatCurency(item.TongTienHoaDon)}</Text>

                                {this.renderOrderState(item.TrangThai)}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.props.navigation.navigate('OrderDetail', {item})}>
                            <Text style={styles.text}>
                                QUẢN LÝ ĐƠN HÀNG
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        );
    };

    renderOrderState = (state) =>
    {
        let trangthai = ['Xử lý', 'Giao hàng', 'Đã nhận', 'Hủy'];
        let stateColor = ['#E0E0E0', '#FFEB3B', '#76FF03', '#FF5252'];
        '#E0E0E0'
        '#FFEB3B'

        if (state === "Đã thanh toán")
            return (
                <Text
                    numberOfLines={1}
                    style={[styles.trangthai, {
                        borderColor: '#76FF03',
                        borderWidth: 2,
                        color: '#000'
                    }]}>Đã nhận</Text>
            );
        if (state === "Chưa thanh toán(Không cho nợ)" || state === "Chưa thanh toán")
            return (
                <Text
                    numberOfLines={1}
                    style={[styles.trangthai, {
                        borderColor: '#FFEB3B',
                        borderWidth: 2,
                        color: '#000'
                    }]}>Đang giao</Text>
            );
        else {
            return (
                <Text
                    numberOfLines={1}
                    style={[styles.trangthai, {
                        borderColor: '#76FF03',
                        borderWidth: 2,
                        color: '#000'
                    }]}>Đã nhận</Text>
            );
        }
    }
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

    checkItem = (MaHoaDon, index) =>
    {
        for (let i=0;i< index; i++)
        {
            if (this.state.dataSource[i].MaHoaDon === MaHoaDon) return true;
        }
        return false;
    }
}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(OrderScreen);

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
        width: 200, textAlign: 'center',
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
        fontSize: 17,
        marginTop: 5,
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
    },
    madon: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    },
    ngaydat: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 17,
        fontWeight: '500',
        opacity: 0.8
    },
    trangthai: {
        borderRadius: 17,
        backgroundColor: 'transparent',
        padding: 5,
        textAlign: 'center',
        width: 120,
        position: 'absolute',
        bottom: 10,
        right: 10,

        ...Globals.FONT,
        fontSize: 17,
        fontWeight: '700',
        overflow: 'hidden'

    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: '#d9d9d9',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        height: 50,
    },
    text: {
        ...Globals.FONT,
        color: Globals.COLOR.MAINCOLOR,
        fontSize: 16,
        fontWeight: '600'
    }
});

