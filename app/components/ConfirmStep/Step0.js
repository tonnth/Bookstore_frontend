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
import Globals from "../../Globals";
import {tinhthanhpho} from "../../tinhthanhpho";
import Line from "../Line";

export default class Step0 extends Component<>
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
        };
    }

    componentDidMount()
    {
    }

    render()
    {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1, alignItems: 'center'
                }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            fontSize: 16,
                            fontWeight: '600', ...Globals.FONT,
                            alignSelf: 'flex-start',
                            marginBottom: 20,
                        }}>
                        Nếu bạn đã có tài khoản
                    </Text>
                    <Button
                        rounded
                        style={{
                            borderColor: Globals.COLOR.MAINCOLOR,
                            borderWidth: 2,
                            backgroundColor: 'transparent',
                            height: 40,
                            width: this.props.width - 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => this.props.navigation.navigate("Login")}>
                        <Text
                            style={{
                                ...Globals.FONT,
                                fontSize: 16,
                                fontWeight: '600',
                                color: Globals.COLOR.MAINCOLOR
                            }}>{'Đăng nhập'.toUpperCase()}</Text>
                    </Button>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                    <Line width={(this.props.width - 40) / 2 - 20}/>
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 14,
                        }}>hoặc</Text>
                    <Line width={(this.props.width - 40) / 2 - 20}/>
                </View>

                <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', margin: 15}}>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            fontSize: 25,
                            fontWeight: '600', ...Globals.FONT
                        }}>
                        Thông tin
                    </Text>
                    <View style={{
                        borderColor: '#BDBDBD',
                        borderWidth: 1,
                        borderRadius: 5,
                        width: this.props.width - 40, height: 40,
                        padding: 5,
                    }}>
                        <TextInput
                            style={{flex: 1}}
                            numberOfLines={1}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            placeholder={'Email'}
                        />
                    </View>

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
}
