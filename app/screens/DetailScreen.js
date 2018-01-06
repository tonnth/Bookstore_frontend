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
import Globals, {
    addToCart, formatCurency, UPDATE_CART, UPDATE_CURRENT_SCREEN,
    UPDATE_FAVOURITE_BOOKS
} from "../Globals";
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
import * as api from "../config/api";
import store from "../Store";

class DetailScreen extends Component
{
    constructor(props)
    {
        console.log("DETAIL SCREEN");
        super(props);
        this.params = this.props.navigation.state.params;
        console.log(this.params);

        this.state = {
            heart: this.props.reduxState.token ? this.checkLiked(this.params, this.props.reduxState.favourite_books) :false,
            listPromotionBooks: this.props.reduxState.listPromotionBooks,
            listNewBooks: this.props.reduxState.listNewBooks,
        };
    }

    checkLiked = (book, list) =>
    {
        for (i = 0; i < list.length; i++)
        {
            if (book.MaSach === list[i].MaSach)
            {
                return true;
            }
        }
        return false;
    }

    componentDidmount()
    {

    }

    render()
    {
        console.log(this.props.navigation.state.routeName + ' Render');
        let heart = this.state.heart ? "md-heart" : "md-heart-outline";
        let tempUri = Globals.BASE_URL + this.params.HinhAnh;
        let giaKhuyenMai = this.params.GiaBan * (100 - this.params.KhuyenMai) / 100;
        let that = this;
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
                                    {this.params.TacGia}
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={styles.giaban}>{formatCurency(giaKhuyenMai)}</Text>
                                <View
                                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.giaban2}>
                                        {this.params.KhuyenMai > 0 ? formatCurency(this.params.GiaBan) : ''}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.khuyenmai}>
                                        {this.params.KhuyenMai > 0 ? '-' + this.params.KhuyenMai + '%' : ''}
                                    </Text>
                                </View>
                            </View>
                            <Button rounded light large
                                    style={{position: 'absolute', right: 20, bottom: 20,}}
                                    onPress={async () =>
                                    {
                                       if(this.props.reduxState.token)
                                       {
                                           var res;
                                           var tempBooks = this.params;
                                           var favourite_books = this.props.reduxState.favourite_books;
                                           if (!this.state.heart)
                                           {
                                               //Like
                                               try
                                               {
                                                   res = await api.putLike(this.props.reduxState.token, this.params.MaSach, 1);
                                               } catch (err)
                                               {
                                                   console.log('Lỗi đăng nhập: ', err);
                                               }
                                               //Thêm vào danh sách yêu thích
                                               favourite_books.push(tempBooks);
                                               console.log('Params: ',that.params);
                                               if (that.params.update) {
                                                   console.log('run update')
                                                   that.params.update();
                                               }
                                           }
                                           else
                                           {
                                               try
                                               {
                                                   res = await api.putLike(this.props.reduxState.token, this.params.MaSach, 0);
                                               } catch (err)
                                               {
                                                   console.log('Lỗi đăng nhập: ', err);
                                               }
                                               //Xóa khỏi danh sách yêu thích
                                               for (i = 0; i < favourite_books.length; i++)
                                               {
                                                   if (favourite_books[i].MaSach === this.params.MaSach)
                                                   {
                                                       favourite_books.splice(i, 1);
                                                       break;
                                                   }
                                               }

                                               console.log('Params: ',that.params);
                                               if (that.params.update) {
                                                   console.log('run update')
                                                   that.params.update();
                                               }
                                           }
                                           store.dispatch({type: UPDATE_FAVOURITE_BOOKS, payload: favourite_books});
                                           this.refs.toast.show(!this.state.heart ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích', DURATION.LENGTH_SHORT);
                                           this.setState({heart: !this.state.heart});

                                       }
                                       else
                                       {
                                           this.refs.toast.show('Vui lòng đăng nhập', DURATION.LENGTH_SHORT);
                                       }

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
                                        onPress={() => this.props.navigation.navigate("Cart", {screenhhh: 'Cart'})}>
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
                                {this.params.MoTa}
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
                         action={() =>
                         {
                             console.log(this.params);
                             addToCart(this.params, this.props.reduxState.cart,this.props.reduxState.token);
                             this.refs.toast.show('Đã thêm ' + this.params.TenSach + ' vào giỏ hàng', DURATION.LENGTH_SHORT);
                         }}
                />
                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
            </View>);
    }

    shouldComponentUpdate(nextProps)
    {
        console.log(this.props.navigation.state.routeName + ' Render', nextProps);
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
