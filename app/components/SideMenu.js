import React from "react";
import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import Globals from "../Globals";
import {Container} from "native-base";
import LinearGradient from "react-native-linear-gradient";

export default class SideMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {slidemenuWidth: 0};
        console.log('SLIDE MENU ', this.props)
    }

    render()
    {
        let that = this;
        // https://oblador.github.io/react-native-vector-icons/
        return (
            <Container style={styles.container}
                       onLayout={e =>
                       {
                           that.setState({slidemenuWidth: e.nativeEvent.layout.width})
                       }}>

                <LinearGradient colors={['#f7b733', '#fc4a1a']}
                                style={{
                                    backgroundColor: Globals.COLOR.MAINCOLOR,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 300,
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

                        <View
                            style={{
                                marginBottom: 130,
                                width: that.state.slidemenuWidth,
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require("../img/man.png")}
                                style={{
                                    height: 60,
                                    width: 60,
                                    marginRight: 10,
                                }}/>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: 'OpenSans-Regular',
                                        color: "white",
                                        backgroundColor: 'transparent',
                                        fontSize: 15,
                                        opacity: 0.8,
                                    }}>
                                    Xin chào
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'OpenSans-Regular',
                                        color: "white",
                                        backgroundColor: 'transparent',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}>
                                    Hoàng Tôn
                                </Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
                <View
                    style={{
                        backgroundColor: "#000",
                        paddingLeft: 30,
                        paddingRight: 15,
                        flex: 1,
                        justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity style={styles.item}
                                      onPress={() => {this.props.navigation.navigate('Home')}}>
                        <Image
                            source={require("../img/home.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Trang chủ
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}
                                      onPress={() => {this.props.navigation.navigate('Order')}}>
                        <Image
                            source={require("../img/box.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Đơn hàng của tôi
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}
                                      onPress={() => {this.props.navigation.navigate('Favorite')}}>
                        <Image
                            source={require("../img/like.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Danh sách yêu thích
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}
                                      onPress={() => {this.props.navigation.navigate('Account')}}>
                        <Image
                            source={require("../img/user.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Thông tin tài khoản
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}
                                      onPress={() => {this.props.navigation.navigate('Setting')}}>
                        <Image
                            source={require("../img/setting.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Cài đặt
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                        {
                            this.props.navigation.navigate('Login');
                        }}>
                        <Image
                            source={require("../img/signout.png")}
                            style={styles.image}/>

                        <Text style={styles.text}>
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 50,
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
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
});
