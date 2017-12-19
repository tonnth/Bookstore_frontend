import React, {Component} from 'react';
import {
    View, Text, Image, Dimensions, StyleSheet, Platform, StatusBar, ImageBackground
} from 'react-native';
import HeaderDetail from '../components/HeaderDetail';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
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
import Globals, {formatCurency} from "../Globals";
import LinearGradient from "react-native-linear-gradient";
import {HButtonBack} from "../components/HButtonBack";
import HImage from "../components/HImage";
import HorizontalList from "../components/HorizontalList";
import HeaderHoriList from "../components/HeaderHoriList";
import HButton from "../components/HButton";
import Toast, {DURATION} from 'react-native-easy-toast';
import {connect} from "react-redux";

import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';

class DetailScreen extends Component
{
    constructor(props)
    {
        console.log("DETAIL SCREEN");
        super(props);
        this.params = this.props.navigation.state.params;
        console.log(this.params);

        this.state = {
            heart: false,
            listPromotionBooks: this.props.reduxState.listPromotionBooks,
            listNewBooks: this.props.reduxState.listNewBooks,
        };
    }

    render()
    {
        let heart = this.state.heart ? "md-heart" : "md-heart-outline";
        let tempUri = Globals.BASE_URL + this.params.HinhAnh;
        let giaKhuyenMai = this.params.GiaBan * (100 - this.params.KhuyenMai) / 100;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'transparent'}
                    translucent
                />

                <ParallaxScrollView
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    headerBackgroundColor="#333"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={20}
                    backgroundColor={'#fff'}
                    contentBackgroundColor={Globals.BACKGROUNDCOLOR}
                    renderBackground={() => (
                        <View key="background" style={{backgroundColor: 'transparent'}}>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT,
                                backgroundColor: '#fff'
                            }}/>
                            <Image
                                source={{
                                    uri: tempUri,
                                    width: window.width,
                                    height: PARALLAX_HEADER_HEIGHT
                                }}
                                resizeMode={"cover"}
                                blurRadius={Platform.OS === 'ios' ? 10 : 8}/>
                            <LinearGradient colors={['#1dcfff', '#000006']}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                opacity: 0.3
                                            }}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <HImage
                                style={{width: 100, height: 150}}
                                uri={tempUri}
                                borderRadius={5}
                            />
                            <View style={{marginLeft: 10, marginRight: 10}}>
                                <Text
                                    numberOfLines={2}
                                    style={styles.bookName}>
                                    {this.params.TenSach}
                                </Text>
                                <Text style={styles.bookTacGia}>
                                    đây là tên tác giả
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={styles.giaban}>{formatCurency(giaKhuyenMai)}</Text>
                                <View
                                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.giaban2}>
                                        {formatCurency(this.params.GiaBan)}{" "}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.khuyenmai}>
                                        -{this.params.KhuyenMai}%
                                    </Text>
                                </View>
                            </View>
                            <Button rounded light large
                                    style={{position: 'absolute', right: 20, bottom: 20,}}
                                    onPress={() =>
                                    {
                                        this.refs.toast.show(!this.state.heart ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích', DURATION.LENGTH_SHORT);
                                        this.setState({heart: !this.state.heart});
                                    }}>
                                <Icon name={heart}
                                      style={{color: 'red', fontSize: 33}}/>
                            </Button>
                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                            <Text
                                numberOfLines={1}
                                style={styles.stickySectionText}>{this.params.TenSach}</Text>
                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.fixedSection}>
                            <HButtonBack
                                navigation={this.props.navigation}
                                color={'#000'}/>
                            <View style={{position: 'absolute', top: 20, right: 20}}>
                                <Button transparent
                                        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                    {/*<Icon name="ios-search"*/}
                                    {/*style={{color: "#000", fontSize: Globals.ICONSIZE}}/>*/}
                                    <IconFeather name="shopping-cart" size={28} color="#000"/>
                                </Button>
                            </View>
                        </View>
                    )}>
                    <View key="background" style={{alignItems: 'center', flex: 1}}>
                        <Card style={{width: window.width - 30, marginTop: 15, borderRadius: 10, overflow: 'hidden'}}>
                            <HeaderHoriList
                                title={'GIỚI THIỆU SÁCH'}/>
                            <Text
                                style={{...Globals.FONT, margin: 10, marginTop: 0, fontSize: 16, textAlign: 'justify'}}>
                                Mọi người đều quan tâm muốn biết làm sao một quốc gia nghèo khó bị chiến tranh tàn phá
                                có thể đạt được mức độ bình đẳng xã hội cao nhất thế giới và trở thành một trong những
                                xã hội có nền công nghệ thông tin phát triển cao nhất với tất cả những mặt tốt và xấu
                                của nó. Cuốn sách này trình bày rất nhiều các khía cạnh của câu truyện thành công này,
                                với các chủ điểm từ quốc hội độc viện đến tủ phơi bát, từ chăm sóc trẻ ban ngày tới cầu
                                giặt công cộng, từ công việc cộng đồng (“đàn ong thợ”) đến chủ nghĩa ba bên, từ bơi lội
                                trong băng đến chính phủ liên hiệp, và từ hệ điều hành Linux đến Ông già Noel. Tất cả
                                những thành tựu này có thể thể hiện cô đọng trong sáu bí quyết của giáo dục miễn phí,
                                chính quyền tự quản, bình đẳng giới, tính xã hội dân sự, ra quyết định dựa trên sự đồng
                                thuận và an sinh xã hội cho tất cả mọi người – và niềm tin cũng như sự bình yên xã hội
                                và những điều này đem lại.
                            </Text>
                        </Card>
                        <Card style={{width: window.width - 30, marginTop: 15, borderRadius: 10}}>
                            <HorizontalList
                                title={"Sách cùng thể loại"}
                                data={this.state.listNewBooks}
                                navigation={this.props.navigation}/>
                        </Card>
                        <Card style={{width: window.width - 30, marginTop: 15, borderRadius: 10, paddingBottom: 10}}>
                            <HorizontalList
                                title={"Sách khuyễn mãi"}
                                data={this.state.listNewBooks}
                                navigation={this.props.navigation}/>
                        </Card>
                    </View>
                </ParallaxScrollView>
                <HButton text={'Thêm vào giỏ hàng'}
                         width={window.width - 10}
                         style={{position: 'absolute', bottom: 5, left: 5}}
                         navigation={this.props.navigation}
                         shadow
                         border={5}
                />
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
            </View>);
    }
}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(DetailScreen);

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const PARALLAX_HEADER_HEIGHT = 280;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        alignItems: 'center',
        justifyContent: 'flex-end',

        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
    stickySectionText: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
    },
    fixedSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        paddingTop: 80,
        marginLeft: 10,
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    bookName: {
        ...Globals.FONT,
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
        marginRight: 80,
    },
    bookTacGia: {
        ...Globals.FONT,
        color: 'white',
        fontSize: 16,
        marginBottom: 15,
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    giaban: {
        ...Globals.FONT,
        color: '#fff',
        fontWeight: '800',
        fontSize: 22,
        textDecorationLine: 'none'
    },
    giaban2: {
        ...Globals.FONT,
        color: '#fff',
        opacity: 0.7,
        fontSize: 14,
        textDecorationLine: 'line-through'
    },
    khuyenmai: {
        ...Globals.FONT,
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
        marginLeft: 15,
        textDecorationLine: 'none'
    },
});
