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
import Globals from "../../Globals";
import {Dropdown} from 'react-native-material-dropdown';
import {tinhthanhpho} from "../../tinhthanhpho";
import {quanhuyen} from "../../quan_huyen";
import {xaphuong} from "../../xa_phuong";

export default class Step1 extends Component<>
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
            dataThanhpho: [],
            dataQuanhuyen: [],
            dataPhuongxa: [],
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
                        <Input placeholder="Họ và tên"/>
                    </Item>

                    <Item regular style={{borderRadius: 10, borderWidth: 1, marginTop: 10}}>
                        <Input placeholder="Số điện thoại"
                               keyboardType="numeric"/>
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
                            this.getTenPhuongXa(this.state.dataQuanhuyen[index].id);
                        }}
                    />

                    <Dropdown
                        containerStyle={{width: this.props.width - 50}}
                        label="Phường, xã"
                        data={this.state.dataPhuongxa}
                        labelHeight={26}
                        pickerStyle={{height: 250}}
                    />

                    <Item regular style={{borderRadius: 10, borderWidth: 1, marginTop: 10, height: 80, marginBottom: 10}}>
                        <Input placeholder='Địa chỉ nhận hàng (tầng, số nhà, đường)'
                               multiline={true}/>
                    </Item>
                    <HButton text={'Tiếp tục'}
                             width={this.props.width - 40}
                             navigation={this.props.navigation}
                             shadow
                             border={20}
                             action={this.props.action}
                    />
                </View>
            </ScrollView>
        );
    }

    getTenTinhthanhpho = () =>
    {
        data = [];
        Object.entries(tinhthanhpho).forEach(([key, val]) =>
        {
            console.log(key, val);          // the name of the current key.
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
                console.log(key, val);          // the name of the current key.
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
                console.log(key, val);          // the name of the current key.
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
