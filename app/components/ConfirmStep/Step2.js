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
import Globals, {formatCurency, UPDATE_ORDER,rateXu} from "../../Globals";
import {Dropdown} from 'react-native-material-dropdown';
import {tinhthanhpho} from "../../tinhthanhpho";
import {quanhuyen} from "../../quan_huyen";
import {xaphuong} from "../../xa_phuong";
import Toast, {DURATION} from 'react-native-easy-toast';
import Line from "../Line";
import {connect} from "react-redux";
import store from "../../Store";

class Step2 extends Component<>
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
            SoXuSuDung: 0,
            TongTienHoaDon: this.props.reduxState.order.TongTienHoaDon,

        };
        this.soxu = (this.props.reduxState.user) ? this.props.reduxState.user.SoXuTichLuy : 0;
    }

    componentDidMount()
    {
    }

    render()
    {
        var tempUser
        return (
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center', flex: 1,
                }}>
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
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
                        {'Bạn có ' + this.soxu + ' xu, tương đương với ' + formatCurency(this.soxu*Globals.rateXu)}
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
                            <Input
                                placeholder="Số xu"
                                keyboardType="numeric"
                                onChangeText ={(text)=>{
                                    this.setState({
                                        SoXuSuDung: text,
                                        TongTienHoaDon: (text === '') ? this.props.reduxState.order.TongTienHoaDon : (this.props.reduxState.order.TongTienHoaDon - parseInt(text)*Globals.rateXu),
                                    })
                                }}
                            />
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
                        {'Bạn được giảm ' + formatCurency(this.state.SoXuSuDung*Globals.rateXu)}
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
                        }}>{formatCurency(this.props.reduxState.order.TongTienHoaDon)}</Text>
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
                        }}>{formatCurency(0)}</Text>
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
                        }}>{this.state.SoXuSuDung}</Text>
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
                        }}>{formatCurency(this.state.TongTienHoaDon)}</Text>
                </View>
                <HButton
                    style={{position: 'absolute', bottom: 15}}
                    text={'Tiếp tục'}
                    width={this.props.width - 40}
                    navigation={this.props.navigation}
                    shadow
                    border={20}
                    action={() =>
                    {
                        var message = '';
                        if(this.state.SoXuSuDung > this.soxu || this.state.SoXuSuDung > this.props.reduxState.order.TongTienHoaDon || this.state.SoXuSuDung < 0)
                        {

                            message ='Số xu sử dụng không hợp lệ.';
                            this.props.action(message);
                            return;
                        }

                        // if(this.state.SoXuSuDung > this.props.reduxState.order.TongTienHoaDon)
                        // {
                        //     message ='Số xu sử dụng không được vượt quá giá trị đơn hàng';
                        //     this.props.action(message);
                        //     return;
                        // }


                        var tempOrder = this.props.reduxState.order;
                        if(this.state.SoXuSuDung != '')
                        {
                            tempOrder.SoXuSuDung = this.state.SoXuSuDung;
                            tempOrder.TongTienHoaDon=this.state.TongTienHoaDon;
                        }


                        store.dispatch({type: UPDATE_ORDER, payload: tempOrder});
                        this.props.action(message);

                    }}
                />

            </ScrollView>
        );
    }
}
const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(Step2);