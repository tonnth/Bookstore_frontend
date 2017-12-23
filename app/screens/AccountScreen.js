import React, {Component} from 'react';
import {
    View, Text, Image, Dimensions, StyleSheet, Platform, StatusBar, ImageBackground, Switch, TouchableOpacity
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
    CardItem, H2, H3, ListItem,
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
import Line from "../components/Line";
import FingerprintPopup from "../components/FingerprintPopup/FingerprintPopup";

class AccountScreen extends Component
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
            toggled: false,
            errorMessage: undefined,
            popupShowed: false
        };
    }

    render()
    {
        if (this.state.errorMessage) alert(this.state.errorMessage);
        console.log(this.props.navigation.state.routeName + ' Render');
        let heart = this.state.heart ? "md-heart" : "md-heart-outline";
        let tempUri = 'https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg';
        // hinh anh co the dung letter image trong doopage cung dc
        let name = 'huynh huy hiep';
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
                        <View key="background" style={{flex: 1, height: PARALLAX_HEADER_HEIGHT}}>
                            <LinearGradient colors={['#ff00cc', '#333399']}
                                            style={{
                                                height: PARALLAX_HEADER_HEIGHT,
                                                width: window.width
                                            }}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <HImage
                                style={{width: 130, height: 130}}
                                uri={tempUri}
                                borderRadius={65}
                            />
                            <Text
                                numberOfLines={2}
                                style={styles.bookName}>
                                {name}
                            </Text>
                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                            <Text
                                numberOfLines={1}
                                style={styles.stickySectionText}>{name}</Text>
                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="fixed-header" style={styles.fixedSection}>
                            <HButtonBack
                                navigation={this.props.navigation}
                                color={'#fff'}/>
                        </View>
                    )}>
                    <View key="background" style={{alignItems: 'center', flex: 1}}>

                        <Card style={{width: window.width - 30, marginTop: 15, borderRadius: 10}}>
                            <HorizontalList
                                title={"Sách bạn yêu thích"}
                                data={this.state.listNewBooks}
                                navigation={this.props.navigation}/>
                        </Card>

                        <Card style={{
                            width: window.width - 30,
                            marginTop: 15,
                            borderRadius: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            <TouchableOpacity
                                style={{paddingLeft: 20, paddingRight: 20, flexDirection: 'column'}}
                                onPress={() =>
                                {
                                    this.handleFingerprintShowed();
                                }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{...Globals.FONT, fontSize: 18, fontWeight: '600',}}>Xác thực vân
                                                                                                      tay</Text>
                                    <Right>
                                        <Switch
                                            onValueChange={(value) => this.setState({toggled: value})}
                                            value={this.state.toggled}/>
                                    </Right>
                                </View>
                                <Text style={{...Globals.FONT, marginTop: 3}}>Bạn có thể dùng vân tay dể xác nhận đơn
                                                                              hàng</Text>
                            </TouchableOpacity>

                            <Line/>

                            <Button transparent dark full small
                                    style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'flex-start'}}
                                    onPress={() => this.props.navigation.navigate('Order')}>
                                <Text style={{...Globals.FONT, fontSize: 18, fontWeight: '600'}}>Đơn hàng của tôi</Text>
                            </Button>

                            <Line/>

                            <Button transparent dark full small
                                    style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'flex-start'}}>
                                <Text style={{...Globals.FONT, fontSize: 18, fontWeight: '600'}}>Đổi mật khẩu</Text>
                            </Button>

                            <Line/>

                            <Button transparent dark full small
                                    style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'flex-start'}}>
                                <Text style={{...Globals.FONT, fontSize: 18, fontWeight: '600'}}>Đăng xuất</Text>
                            </Button>
                        </Card>

                        {this.state.popupShowed && (
                            <FingerprintPopup
                                style={styles.popup}
                                handlePopupDismissed={this.handleFingerprintDismissed}
                            />
                        )}
                    </View>
                </ParallaxScrollView>

                <Toast ref="toast"
                       textStyle={{fontSize: 17, color: '#fff'}}/>
            </View>
        );
    }

    handleFingerprintShowed = () =>
    {
        this.setState({popupShowed: true});
    };

    handleFingerprintDismissed = (done = false) =>
    {
        this.setState({popupShowed: false});
        if (done) this.setState({toggled: !this.state.toggled})
    };

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

export default connect(mapStateToProps)(AccountScreen);

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
        alignItems: 'center',
        flex: 1,
        paddingTop: PARALLAX_HEADER_HEIGHT / 2 - 80,
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    bookName: {
        ...Globals.FONT,
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
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
