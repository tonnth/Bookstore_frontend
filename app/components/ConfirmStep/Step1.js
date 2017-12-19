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
                    flex: 1, alignItems: 'center'
                }}>
                <Text
                    style={{
                        alignSelf: 'flex-start',
                        margin: 15,
                        marginBottom: 0,
                        fontSize: 25,
                        fontWeight: '600', ...Globals.FONT
                    }}>
                    Gửi tới
                </Text>
                <View style={{
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                    marginTop: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                    width: this.props.width - 40, height: 40,
                    padding: 5,
                }}>
                    <TextInput
                        style={{flex: 1}}
                        numberOfLines={1}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={'Họ và tên'}
                    />
                </View>

                <View style={{
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                    marginTop: 10,
                    marginBottom: 5,
                    borderRadius: 5,
                    width: this.props.width - 40, height: 40,
                    padding: 5,
                }}>
                    <TextInput
                        style={{flex: 1}}
                        numberOfLines={1}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        keyboardType="numeric"
                        placeholder={'Số điện thoại'}
                    />
                </View>

                <Dropdown
                    containerStyle={{
                        width: this.props.width - 40,
                        marginTop: -10,
                    }}
                    label="Tỉnh/Thành phố"
                    data={this.state.dataThanhpho}
                    labelHeight={26}
                    pickerStyle={{height: 350}}
                    onChangeText={(value, index, data) => {
                        this.getTenQuanhuyen(this.state.dataThanhpho[index].id);
                    }}
                />

                <Dropdown
                    containerStyle={{width: this.props.width - 40}}
                    label="Quận/huyện"
                    data={this.state.dataQuanhuyen}
                    labelHeight={26}
                    pickerStyle={{height: 300}}
                    onChangeText={(value, index, data) => {
                        this.getTenPhuongXa(this.state.dataQuanhuyen[index].id);
                    }}
                />

                <Dropdown
                    containerStyle={{width: this.props.width - 40}}
                    label="Phường, xã"
                    data={this.state.dataPhuongxa}
                    labelHeight={26}
                    pickerStyle={{height: 250}}
                />

                <View style={{
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                    marginTop: 10,
                    marginBottom: 15,
                    borderRadius: 5,
                    width: this.props.width - 40, height: 80,
                    padding: 5,
                }}>
                    <TextInput
                        style={{flex: 1}}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={'Địa chỉ nhận hàng (tầng, số nhà, đường)'}
                    />
                </View>
                <HButton text={'Tiếp tục'}
                         width={this.props.width - 40}
                         navigation={this.props.navigation}
                         shadow
                         border={20}
                         action={this.props.action}
                />
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
