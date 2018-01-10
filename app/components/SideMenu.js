import React from "react";
import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import Globals, {UPDATE_CART, UPDATE_FAVOURITE_BOOKS, UPDATE_ORDER, UPDATE_ORDER_HISTORY,UPDATE_TOKEN, UPDATE_USER} from "../Globals";
import {Container} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import IconFeather from 'react-native-vector-icons/Feather';
import store from "../Store";
import {setToLocal} from "../config/storage";
import * as api from "../config/api";

class SideMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log('###SIDE MENU');
        console.log(this.props.reduxState.user);

        this.state = {
            slidemenuWidth: 0,

        };
        console.log('SLIDE MENU ', this.props)
    }

    render()
    {
        console.log('Render slidemenu');
        let that = this;
        let token = this.props.reduxState.token;
        // https://oblador.github.io/react-native-vector-icons/
        return (
            <Container style={styles.container}
                       onLayout={e =>
                       {
                           console.log(e.nativeEvent.layout);
                           that.setState({
                               slidemenuWidth: e.nativeEvent.layout.width,
                               slidemenuHeight: e.nativeEvent.layout.height
                           })
                       }}>

                <LinearGradient colors={this.props.reduxState.user ? ['#f7b733', '#fc4a1a'] : ['#00F260', '#0575E6']}
                                style={{
                                    backgroundColor: Globals.COLOR.MAINCOLOR,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: this.props.reduxState.user ? 300 : this.state.slidemenuHeight / 2 + 100,
                                }}>
                    <Image
                        source={require("../img/linecolor.png")}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 270,
                            width: that.state.slidemenuWidth,
                        }}
                    />
                    <View
                        style={{
                            width: that.state.slidemenuWidth,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {this.props.reduxState.user &&
                        <View
                            style={{
                                marginBottom: 130,
                                width: that.state.slidemenuWidth,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <Text
                                style={{
                                    fontFamily: 'OpenSans-Regular',
                                    color: "white",
                                    backgroundColor: 'transparent',
                                    fontSize: 15,
                                }}>
                                Xin chào
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'OpenSans-Regular',
                                    color: "white",
                                    backgroundColor: 'transparent',
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                }}>
                                {this.props.reduxState.user.HoTenKhachHang}
                            </Text>
                        </View>}

                        {!this.props.reduxState.user &&
                        <View>
                            <Image
                                source={require("../img/logo.png")}
                                style={styles.logo}
                                resizeMode="contain"/>
                        </View>}
                    </View>
                </LinearGradient>
                <View
                    style={{
                        backgroundColor: "#000",
                        paddingLeft: 30,
                        paddingRight: 15,
                        flex: 1,
                        marginBottom: 50,
                        maxHeight: this.props.reduxState.user ? 500 : 250,
                        justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity style={styles.item}
                                      onPress={() =>
                                      {
                                          this.props.navigation.navigate('Home')
                                      }}>

                        <IconFeather name="home" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Trang chủ
                        </Text>
                    </TouchableOpacity>
                    {this.props.reduxState.user &&
                    <TouchableOpacity style={styles.item}
                                      onPress={ async () =>
                                      {
                                          await api.getOrderHistory(token);
                                          this.props.navigation.navigate('Order')
                                      }}>

                        <IconFeather name="shopping-cart" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Đơn hàng của tôi
                        </Text>
                    </TouchableOpacity>}

                    {this.props.reduxState.user &&
                    <TouchableOpacity style={styles.item}
                                      onPress={ async () =>
                                      {
                                          await api.getFavouriteBooks(token);
                                          this.props.navigation.navigate('Favorite')
                                      }}>

                        <IconFeather name="heart" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Danh sách yêu thích
                        </Text>
                    </TouchableOpacity>}

                    {this.props.reduxState.user &&
                    <TouchableOpacity style={styles.item}
                                      onPress={() =>
                                      {
                                          this.props.navigation.navigate('Account')
                                      }}>

                        <IconFeather name="info" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Thông tin tài khoản
                        </Text>
                    </TouchableOpacity>}

                    {this.props.reduxState.user &&
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                        {
                            setToLocal('token', null);
                            store.dispatch({type: UPDATE_USER, payload: null});
                            store.dispatch({type: UPDATE_TOKEN, payload: null});
                            store.dispatch({type: UPDATE_CART, payload: []});
                            store.dispatch({type: UPDATE_ORDER, payload: null});
                            store.dispatch({type: UPDATE_FAVOURITE_BOOKS, payload: []});
                            store.dispatch({type: UPDATE_ORDER_HISTORY, payload: []});
                            this.props.navigation.navigate('Home');
                        }}>

                        <IconFeather name="log-out" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>}

                    {!this.props.reduxState.user &&
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                        {
                            this.props.navigation.navigate('Login');
                        }}>

                        <IconFeather name="log-in" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>}
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 40,
                        position: 'absolute',
                        bottom: 0,
                        width: this.state.slidemenuWidth,

                    }}
                    onPress={() =>
                    {
                        this.props.navigation.navigate('Address');
                    }}>
                    <Text style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: 'OpenSans-Regular',
                        color: '#fff',
                    }}>
                        HOTLINE:{" "}
                        <Text style={{color: '#f7b733', fontWeight: 'bold'}}>1900-1009</Text> (1000đ/phút)
                    </Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(SideMenu);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    },
    header: {
        paddingRight: 15,
        paddingLeft: 15,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0
    },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        padding: 15
    },
    item: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginRight: 30,
        fontFamily: 'OpenSans-Regular',
        color: '#fff',

    },
    image: {
        height: 27,
        width: 27,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 20,
    },
    logo: {
        height: 130,
        width: 100,
        marginBottom: 200,
    },
});
