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

export default class Step2 extends Component<>
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
        };
        this.soxu = 10;
    }

    componentDidMount()
    {
    }

    render()
    {
        return (
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center', flex: 1,
                }}>
                <Text
                    style={{
                        alignSelf: 'flex-start',
                        fontSize: 20,
                        marginTop: 10,
                        marginLeft: 20,
                        fontWeight: '600',
                        ...Globals.FONT
                    }}>
                    Thanh toán khi nhận hàng
                </Text>

                {this.soxu > 0 &&
                <View style={{width: this.props.width - 40, marginTop: 10}}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            marginBottom: 0,
                            fontWeight: '500',
                            fontSize: 13,
                            ...Globals.FONT
                        }}>
                        {'Bạn có ' + this.soxu + ' xu, tương đương với ' + formatCurency(10000)}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10,}}>
                        <Text
                            style={{
                                fontSize: 15,
                                ...Globals.FONT,
                                marginRight: 15,
                            }}>
                            {'Dùng '}
                        </Text>
                        <Item regular style={{borderRadius: 10, borderWidth: 1,width: 100, height: 40}}>
                            <Input placeholder="Số xu"/>
                        </Item>
                        <Text
                            style={{
                                fontSize: 15,
                                ...Globals.FONT,

                                marginLeft: 15,
                            }}>
                            {' Xu'}
                        </Text>
                    </View>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            marginTop: 0,
                            marginBottom: 15,
                            fontWeight: '500',
                            fontSize: 13,
                            ...Globals.FONT
                        }}>
                        {'Bạn được giảm ' + formatCurency(10000)}
                    </Text>
                </View>}
                <View
                    style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10}}>
                    <Line width={(this.props.width - 40) / 2 - 70}/>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 14,
                        }}>Thông tin hóa đơn</Text>
                    <Line width={(this.props.width - 40) / 2 - 70}/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    width: this.props.width - 40
                }}>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 17,
                            fontWeight: '600',
                        }}>Tạm tính</Text>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '600',
                            alignSelf: 'flex-end'
                        }}>{formatCurency(700000)}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    width: this.props.width - 40
                }}>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Phí vận chuyển</Text>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '600',
                            alignSelf: 'flex-end'
                        }}>{formatCurency(700000)}</Text>
                </View>
                {this.soxu > 0 &&
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    width: this.props.width - 40
                }}>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '600',
                        }}>Số xu sử dụng</Text>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '600',
                            alignSelf: 'flex-end'
                        }}>10</Text>
                </View>}
                <Line width={(this.props.width - 40)}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    width: this.props.width - 40
                }}>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '700',
                        }}>Tổng tiền (gồm VAT)</Text>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 15,
                            fontWeight: '700',
                            alignSelf: 'flex-end'
                        }}>{formatCurency(700000)}</Text>
                </View>
                <HButton
                    style={{position: 'absolute', bottom: 15}}
                    text={'Tiếp tục'}
                    width={this.props.width - 40}
                    navigation={this.props.navigation}
                    shadow
                    border={20}
                    action={() => {
                        this.props.action(5)
                    }}
                />
            </ScrollView>
        );
    }
}
