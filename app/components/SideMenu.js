import React from "react";
import {Image, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import Globals from "../Globals";
import {Container} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import IconFeather from 'react-native-vector-icons/Feather';

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
                                    minHeight: 300,
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
                                {this.props.reduxState.user ? this.props.reduxState.user.HoTenKhachHang : ''}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <View
                    style={{
                        backgroundColor: "#000",
                        paddingLeft: 30,
                        paddingRight: 15,
                        flex: 1,
                        maxHeight: 500,
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

                    <TouchableOpacity style={styles.item}
                                      onPress={() =>
                                      {
                                          this.props.navigation.navigate('Order')
                                      }}>

                        <IconFeather name="shopping-cart" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Đơn hàng của tôi
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item}
                                      onPress={() =>
                                      {
                                          this.props.navigation.navigate('Favorite')
                                      }}>

                        <IconFeather name="heart" size={25} color="#fff"
                                     style={styles.image}/>

                        <Text style={styles.text}>
                            Danh sách yêu thích
                        </Text>
                    </TouchableOpacity>

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
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() =>
                        {
                            this.props.navigation.navigate('Login');
                        }}>

                        <IconFeather name="log-out" size={25} color="#fff"
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

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(SideMenu);

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
