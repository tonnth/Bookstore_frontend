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
import Globals, {accountingTotal, UPDATE_ORDER} from "../../Globals";
import {Dropdown} from 'react-native-material-dropdown';
import {tinhthanhpho} from "../../tinhthanhpho";
import {quanhuyen} from "../../quan_huyen";
import {xaphuong} from "../../xa_phuong";
import {connect} from "react-redux";
import store from "../../Store";
import Toast, {DURATION} from 'react-native-easy-toast';
class Step1 extends Component<>
{
    constructor(props)
    {
        super(props);
        console.log("STEP 1: ")
        console.log(this.props);
        this.state = {
            dataThanhpho: [],
            dataQuanhuyen: [],
            dataPhuongxa: [],
            hoTen: '',
            soDienThoai: '',
            tinhThanhPho: '',
            quanHuyen: '',
            phuongXa: '',
            diaChi: '',
        };
    }

    componentDidMount()
    {
        this.getTenTinhthanhpho();
    }

    render()
    {
        return (
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center'
                }}>
                <View style={{margin: 15, alignItems: 'center', marginTop: 5,}}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            marginBottom: 0,
                            fontSize: 25,
                            fontWeight: '600', ...Globals.FONT
                        }}>
                        Gửi tới
                    </Text>

                    <Item regular style={{borderRadius: 10, borderWidth: 1, marginTop: 10}}>
                        <Input
                            placeholder="Họ và tên"
                            onChangeText ={(text)=>{
                                this.setState({
                                    hoTen: text,
                                })
                            }}
                        />
                    </Item>

                    <Item regular style={{borderRadius: 10, borderWidth: 1, marginTop: 10}}>
                        <Input
                            placeholder="Số điện thoại"
                            keyboardType="numeric"
                            onChangeText ={(text)=>{
                                this.setState({
                                    soDienThoai: text,
                                })
                            }}
                        />
                    </Item>

                    <Dropdown
                        containerStyle={{
                            width: this.props.width - 50,
                            marginTop: -10,
                        }}
                        label="Tỉnh/Thành phố"
                        data={this.state.dataThanhpho}
                        labelHeight={26}
                        pickerStyle={{height: 350}}
                        onChangeText={(value, index, data) =>
                        {
                            this.setState({
                                tinhThanhPho: value,
                            })
                            this.getTenQuanhuyen(this.state.dataThanhpho[index].id);
                        }}
                    />

                    <Dropdown
                        containerStyle={{width: this.props.width - 50}}
                        label="Quận/huyện"
                        data={this.state.dataQuanhuyen}
                        labelHeight={26}
                        pickerStyle={{height: 300}}
                        onChangeText={(value, index, data) =>
                        {
                            this.setState({
                                quanHuyen: value,
                            })
                            this.getTenPhuongXa(this.state.dataQuanhuyen[index].id);
                        }}
                    />

                    <Dropdown
                        containerStyle={{width: this.props.width - 50}}
                        label="Phường, xã"
                        data={this.state.dataPhuongxa}
                        labelHeight={26}
                        pickerStyle={{height: 250}}
                        onChangeText={(value, index, data) =>
                        {
                            this.setState({
                                phuongXa: value,
                            })

                        }}
                    />

                    <Item regular style={{borderRadius: 10, borderWidth: 1, marginTop: 10, height: 80, marginBottom: 10}}>
                        <Input
                            placeholder='Địa chỉ nhận hàng'
                            multiline={true}
                            onChangeText ={(text)=>{
                                this.setState({
                                    diaChi: text,
                                })
                            }}
                        />
                    </Item>
                    <HButton text={'Tiếp tục'}
                             width={this.props.width - 40}
                             navigation={this.props.navigation}
                             shadow
                             border={20}
                             action={()=>{
                                 console.log('STATE', this.state.tinhThanhPho);
                                 if(this.state.tinhThanhPho === '' || this.state.hoTen === ''|| this.state.quanHuyen === '' || this.state.phuongXa==='' || this.state.SoDienThoai==='' || this.state.diaChi==='')
                                 {
                                     this.refs.toast.show('Thông tin không hợp lệ.',1200);
                                     return;
                                 }
                                 var GioHang = [];
                                 var tempCart =this.props.reduxState.cart;
                                for(i = 0; i < tempCart.length; i++ )
                                {
                                   var tempBook = {
                                        MaSach: tempCart[i].MaSach,
                                        SoLuongBan: tempCart[i].SoLuongBan,
                                        GiaBan: tempCart[i].GiaBan*(1-tempCart[i].KhuyenMai/100),
                                    };
                                   GioHang.push(tempBook);
                                }


                                 var diachi = this.state.diaChi+', '+this.state.phuongXa+', '+this.state.quanHuyen+', '+this.state.tinhThanhPho;
                                 var tempOrder ={
                                     token:this.props.reduxState.token,
                                     MaKhuVucGiaoHang: 3,
                                     DiaChiGiaoHang: diachi,
                                     TenNguoiNhan: this.state.hoTen,
                                     SoDienThoai: this.state.soDienThoai,
                                     TongTienHoaDon: accountingTotal( this.props.reduxState.cart),
                                     GioHang: GioHang,
                                 }
                                 store.dispatch({type: UPDATE_ORDER, payload: tempOrder});
                                 this.props.action(tempOrder);
                             }}
                    />
                    <Toast ref="toast"
                           textStyle={{fontSize: 17, color: '#fff'}}/>
                </View>
            </ScrollView>
        );
    }

    getTenTinhthanhpho = () =>
    {
        data = [];
        Object.entries(tinhthanhpho).forEach(([key, val]) =>
        {
            // console.log(key, val);          // the name of the current key.
            data.push({value: val.name_with_type, id: val.code})
        });

        this.setState({
            dataThanhpho: data.sort(function (a, b)
            {
                return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
            })
        });
    };

    getTenQuanhuyen = (code) =>
    {
        data = [];
        Object.entries(quanhuyen).forEach(([key, val]) =>
        {
            if (val.parent_code === code)
            {
                 // console.log(key, val);          // the name of the current key.
                data.push({value: val.name_with_type, id: val.code})
            }
        });
        this.setState({
            dataQuanhuyen: data.sort(function (a, b)
            {
                return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
            })
        });
    }

    getTenPhuongXa = (code) =>
    {
        data = [];
        Object.entries(xaphuong).forEach(([key, val]) =>
        {
            if (val.parent_code === code)
            {
                //console.log(key, val);          // the name of the current key.
                data.push({value: val.name_with_type, id: val.code})
            }
        });

        this.setState({
            dataPhuongxa: data.sort(function (a, b)
            {
                return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
            })
        });
    };
}
const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(Step1);