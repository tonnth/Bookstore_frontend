import React, {Component} from 'react';
import {
    View, Text, Image, Dimensions, StyleSheet, Platform, StatusBar, ImageBackground, ScrollView, TextInput
} from 'react-native';

import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
    Item,
    Input,
    Card,
    Icon,
    CardItem,
} from 'native-base';
import HButton from "../HButton";
import {HInput} from "../HInput";
import Globals, {formatCurency} from "../../Globals";
import {Dropdown} from 'react-native-material-dropdown';
import {tinhthanhpho} from "../../tinhthanhpho";
import {quanhuyen} from "../../quan_huyen";
import {xaphuong} from "../../xa_phuong";
import Line from "../Line";
import HImage from "../HImage";

export default class Step3 extends Component<>
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
            dataSource: [1, 2, 3, 4],
        };
    }

    componentDidMount()
    {
    }

    render()
    {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            margin: 15,
                            marginBottom: 5,
                            fontSize: 20,
                            fontWeight: '600',
                            ...Globals.FONT
                        }}>
                        Xác nhận thông tin
                    </Text>

                    <View style={{
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        marginTop: 20,
                        width: this.props.width - 40
                    }}>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 15,
                            }}>Tổng tiền (gồm VAT)</Text>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 22,
                                fontWeight: '600',
                                color: Globals.COLOR.MAINCOLOR,
                            }}>{formatCurency(700000)}</Text>
                    </View>

                    <View
                        style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10}}>
                        <Line width={(this.props.width - 40) / 2 - 60}/>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 14,
                            }}>Địa chỉ nhận hàng</Text>
                        <Line width={(this.props.width - 40) / 2 - 60}/>
                    </View>
                    <View style={{
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        width: this.props.width - 40
                    }}>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 5,
                            }}>Nguyễn trần hoàng tôn</Text>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 5,
                            }}>974/14 Lo gốm</Text>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 5,
                            }}>01229716386</Text>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 16,
                                fontWeight: '600',
                                marginBottom: 5,
                            }}>hoangton1996@gmail.com</Text>
                    </View>

                    <View
                        style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10}}>
                        <Line width={(this.props.width - 40) / 2 - 40}/>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 14,
                            }}>{this.state.dataSource.length + ' sản phẩm'}</Text>
                        <Line width={(this.props.width - 40) / 2 - 40}/>
                    </View>
                    {this.state.dataSource.map((item, key) =>
                        (
                            this.renderItem(item, key)
                        ))
                    }
                    <Line
                        style={{marginBottom: 70}}
                        width={(this.props.width - 40)}/>
                </ScrollView>
                <HButton
                    style={{position:'absolute', bottom: 15, alignSelf: 'center'}}
                    text={'Xác nhận'}
                    width={this.props.width - 40}
                    navigation={this.props.navigation}
                    shadow
                    border={20}
                    action={this.props.action}
                />
            </View>
        );
    }

    renderItem = (item, key) =>
    {
        //let tempUri = Globals.BASE_URL + item.HinhAnh;
        let tempUri = 'http://sachnoionline.net/upload/book/107.jpg';
        let ten = 'dac nhan tam dfbdfndfndfndndndfndfnfnfnfnfnfnfnfnfnfnfnf';
        let thanhtien = 100000;
        let soluong = 5;
        let dongia = 25000;
        let widthImage = 100;
        let heightImage = widthImage * 3 / 2;
        return (
            <View
                key={key}
                style={{
                    width: this.itemWidth,
                    padding: 10,
                    paddingBottom: 0,
                    height: heightImage + 30,
                    flexDirection: 'row',
                }}>
                <HImage
                    style={{width: widthImage, height: heightImage}}
                    uri={tempUri}
                    borderRadius={5}
                />

                <View style={{flex: 1, marginTop: 10, marginLeft: 10}}>
                    <Text
                        style={styles.tensach}
                        numberOfLines={2}>{ten}</Text>


                    <Text
                        numberOfLines={1}
                        style={[styles.soluong, {marginTop: 3}]}>{formatCurency(dongia) + ' X ' + soluong}</Text>

                    <Text
                        numberOfLines={1}
                        style={styles.giaban}>{formatCurency(thanhtien)}</Text>

                </View>
            </View>
        );
    }
}


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
        fontSize: 18,
    },
    soluong: {
        ...Globals.FONT,
        fontWeight: '600',
        fontSize: 16,
        textDecorationLine: 'none'
    },
    giaban: {
        ...Globals.FONT,
        color: Globals.COLOR.MAINCOLOR,
        fontWeight: '600',
        fontSize: 18,
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