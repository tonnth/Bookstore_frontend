import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet, StatusBar, Platform
} from "react-native";

import {connect} from "react-redux";
import Globals, {formatCurency, TheLoai} from "../Globals";
import * as api from "../config/api";
import HImage from "../components/HImage";
import LinearGradient from "react-native-linear-gradient";
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input} from 'native-base';
import {HButtonBack} from "../components/HButtonBack";

const {height, width} = Dimensions.get("window");

class VerListScreen extends Component
{
    constructor(props)
    {
        console.log("HORIZONTALLIST");
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
            dataSource: this.params.data,
        };
        this.itemWidth = width / this.params.colNumber - 10;
    }

    async getData()
    {
        await api.getSachKhuyenMai();
        console.log(this.props.reduxState.books.data);
        this.setState({
            dataSource: [
                ...this.state.dataSource,
                ...this.props.reduxState.books.data
            ],
            refreshing: false
        });
    }

    componentDidMount()
    {

    }


    handleRefresh = () =>
    {
        // this.setState(
        //     {
        //         refreshing: true,
        //         page: 1,
        //         dataSource: [],
        //     },
        // );
        // // Toast.show(this.state.page + " / " + this.state.total_page);
        // this.getData();
    };

    handleLoadMore = () =>
    {
        // this.setState(
        //     {
        //         page: this.state.page + 1,
        //     }
        // );
        // if (this.state.page > this.state.total_page) return;
        // // Toast.show(this.state.page + " / " + this.state.total_page);
        // this.getData();
    };

    render()
    {
        return (
            <Container style={styles.container}>
                <StatusBar
                    translucent={false}
                />
                <Header style={styles.header}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>
                        {this.params.title}
                    </Title>
                    </Body>
                    <Right>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="ios-search"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Right>
                </Header>

                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.dataSource}
                    renderItem={this.params.theloai ? this.renderTheloai : this.renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                    numColumns={this.params.colNumber}
                    showsHorizontalScrollIndicator={false}
                />

            </Container>
        );
    }

    renderTheloai = ({item, index}) =>
    {
        let widthImage = this.itemWidth - 10;
        let heightImage = widthImage * 2 / 3;
        let tempUri = Globals.BASE_URL + item.Hinh;
        return (
            <TouchableOpacity style={{margin: 5, width: this.itemWidth, alignItems: 'center'}}
                              onPress={() => this.props.nav.navigate('Detail', item)}>
                <HImage
                    style={{width: widthImage, height: heightImage, zIndex: 5}}
                    uri={tempUri}
                    borderRadius={10}
                />
                <LinearGradient
                    colors={item.Color}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        zIndex: 10,
                        elevation: 4,
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 5,
                        marginRight: 5,
                        opacity: 0.75,
                        borderRadius: 10,
                    }}/>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        zIndex: 10,
                        elevation: 4,
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 5,
                        marginRight: 5,
                    }}>
                    <Text
                        style={styles.tentheloai}>{item.TenTheLoai}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderItem = ({item, index}) =>
    {
        let tempUri = Globals.BASE_URL + item.HinhAnh;
        let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = this.itemWidth - 10;
        let heightImage = widthImage * 3 / 2;

        return (
            <TouchableOpacity style={{width: this.itemWidth, justifyContent: 'center', margin: 5}}
                              onPress={() => this.props.navigation.navigate('Detail', item)}>
                <HImage
                    style={{width: widthImage, height: heightImage}}
                    uri={tempUri}
                    borderRadius={10}
                />
                <Text
                    style={styles.tensach}
                    numberOfLines={1}>{item.TenSach}</Text>
                <Text
                    numberOfLines={1}
                    style={styles.giaban}>{formatCurency(giaKhuyenMai)}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text
                        numberOfLines={1}
                        style={styles.giaban2}>
                        {formatCurency(item.GiaBan)}{" "}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[styles.giaban, {fontWeight: '700'}]}>
                        -{item.KhuyenMai}%
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };
}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(VerListScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        fontSize: 18,
        fontWeight: '600',
        ...Platform.select({
            ios: {
                width: 300,
            },
        }),
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
        fontSize: 17,
    },
    giaban: {
        ...Globals.FONT,
        color: Globals.COLOR.MAINCOLOR,
        fontWeight: '600',
        fontSize: 16,
        textDecorationLine: 'none'
    },
    giaban2: {
        ...Globals.FONT,
        color: '#000',
        opacity: 0.7,
        fontSize: 12,
        textDecorationLine: 'line-through'
    },
    tentheloai: {
        ...Globals.FONT,
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        opacity: 1,
    }
});

