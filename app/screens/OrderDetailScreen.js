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
import {formatCurency} from "../Globals";
import Line from "../components/Line";
import Globals from "../Globals";
import {connect} from "react-redux";
import HImage from "../components/HImage";
import Toast from "react-native-easy-toast";
import StepIndicator from "react-native-step-indicator";
import moment from "moment";

const window = Dimensions.get('window');
const label = ['Xử lý', 'Giao hàng', 'Đã đóng'];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: '#fe7013',
    stepIndicatorLabelUnFinishedColor: '#fff',
    labelColor: '#999999',
    labelSize: 14,
    currentStepLabelColor: '#fe7013'
};

class OrderDetailScreen extends Component<>
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
        console.log(this.props.navigation.state.routeName +  ' Render');
        let soxu = 10;
        let madon = '#00001233';
        let ngaydat = '08/08/2017';
        let state = 2; //trạng thái đơn hàng 0, 1 , 2, xu ly, giao hang, da dong
        let ngaygiao = '12/12/2017';
        let ngaygiaodukien = [moment(ngaydat, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY"), moment(ngaydat, "DD/MM/YYYY").add(5, 'days').format("DD/MM/YYYY")];
        return (
            <Container>
                <StatusBar
                    translucent={false}
                />
                <Header style={[styles.header, {backgroundColor: '#fff'}]}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="ios-arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>
                        Chi tiết đơn hàng
                    </Title>
                    </Body>
                    <Right style={{flex: 1}}>

                    </Right>
                </Header>
                <ScrollView contentContainer={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Card style={{
                            padding: 15,
                            width: window.width - 20,
                            justifyContent: 'space-around'
                        }}>
                            <Text
                                style={[styles.madon, {
                                    ...Globals.FONT,
                                    fontSize: 20,
                                    marginBottom: 10,
                                }]}>Thông tin đơn hàng</Text>
                            <Text style={{marginBottom: 5}}>
                                Đơn hàng: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>{madon}</Text>
                            </Text>

                            <Text style={{marginBottom: 5}}>
                                Tổng cộng: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>{formatCurency(700000)}</Text>
                            </Text>

                            <Text style={{marginBottom: 5}}>
                                Đặt ngày: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>{ngaydat}</Text>
                            </Text>
                        </Card>

                        <Card style={{
                            padding: 15,
                            width: window.width - 20,
                            justifyContent: 'space-around'
                        }}>
                            <Text
                                style={[styles.madon, {
                                    ...Globals.FONT,
                                    fontSize: 20,
                                    marginBottom: 10,
                                }]}>Địa chỉ nhận hàng</Text>

                            <Text style={{marginBottom: 5}}>
                                Họ tên: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>Nguyễn trần hoàng tôn</Text>
                            </Text>
                            <Text style={{marginBottom: 5}}>
                                Email: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>hoangton1996@gmail.com</Text>
                            </Text>
                            <Text style={{marginBottom: 5}}>
                                Số điện thoại: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>01229716386</Text>
                            </Text>
                            <Text style={{marginBottom: 5}}>
                                Địa chỉ: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>974/14 Lo gốm</Text>
                            </Text>
                        </Card>

                        <Card style={{
                            padding: 15,
                            width: window.width - 20,
                            justifyContent: 'space-around'
                        }}>
                            <Text
                                style={[styles.madon, {
                                    ...Globals.FONT,
                                    fontSize: 20,
                                    marginBottom: 15,
                                }]}>Trạng thái</Text>

                            <View style={styles.step}>
                                <StepIndicator
                                    customStyles={customStyles}
                                    stepCount={3}
                                    currentPosition={state}
                                    labels={label}
                                />
                            </View>

                            {state === 2 &&
                            <Text style={{marginBottom: 5}}>
                                Đã giao: {" "}
                                <Text
                                    style={styles.madon}
                                    numberOfLines={1}>{ngaygiao}</Text>
                            </Text>}

                            {state < 2 &&
                            <View>
                                <Text>
                                    Thời gian giao hàng: {" "}
                                </Text>
                                <Text
                                    style={[styles.madon, {marginBottom: 5}]}
                                    numberOfLines={1}>{ngaygiaodukien[0] + ' đến ' + ngaygiaodukien[1]}</Text>
                            </View>}
                        </Card>

                        <Card style={{
                            padding: 15,
                            width: window.width - 20,
                            justifyContent: 'space-around',
                        }}>
                            <Text
                                style={[styles.madon, {
                                    ...Globals.FONT,
                                    fontSize: 20,
                                    marginBottom: 15,
                                    width: window.width - 40,
                                }]}>Sản phẩm</Text>

                            {this.state.dataSource.map((item, key) =>
                                (
                                    this.renderItem(item, key)
                                ))
                            }
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
                                    }}>{formatCurency(0)}</Text>
                            </View>
                            {soxu > 0 &&
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
                                    }}>{soxu} ({' ' + formatCurency(-soxu*1000)})</Text>
                            </View>}
                            <Line width={(window.width - 20 - 30)}
                                  style={{alignSelf: 'center', marginBottom: 20}}/>
                            <View style={{
                                marginBottom: 10,
                                flexDirection: 'row',
                                width: this.props.width - 40,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <Text
                                    style={{
                                        ...Globals.FONT,
                                        alignSelf: 'baseline',
                                        fontSize: 15,
                                        fontWeight: '700',
                                    }}>Tổng tiền (gồm VAT)</Text>
                                <Text
                                    style={{
                                        ...Globals.FONT,
                                        fontSize: 17,
                                        fontWeight: '700',
                                        color: Globals.COLOR.MAINCOLOR
                                    }}>{formatCurency(700000)}</Text>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
            </Container>
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
                    paddingBottom: 0,
                    height: heightImage + 30,
                    flexDirection: 'row',
                }}>
                <HImage
                    style={{width: widthImage, height: heightImage}}
                    uri={tempUri}
                    borderRadius={5}
                />

                <View style={{marginTop: 10, marginLeft: 10, width: widthImage*2}}>
                    <Text
                        style={styles.tensach}
                        numberOfLines={2}>{ten}</Text>


                    <Text
                        numberOfLines={1}
                        style={[styles.soluong, {marginTop: 10}]}>{formatCurency(dongia) + ' X ' + soluong}</Text>

                    <Text
                        numberOfLines={1}
                        style={[styles.giaban]}>{formatCurency(thanhtien)}</Text>

                </View>
            </View>

        );
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

export default connect(mapStateToProps)(OrderDetailScreen);

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
        fontSize: 20,
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
    },
    madon: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    step: {
        marginBottom: 10,
        justifyContent: 'center',
    },
});