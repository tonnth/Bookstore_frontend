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
        console.log("VERTICAL LIST");
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
            dataSource: this.params.data,
        };
        this.itemWidth = width / this.params.colNumber - 10;
        console.log(this.state.dataSource);
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
        console.log(this.props.navigation.state.routeName + ' Render');
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
                            <Icon name="ios-arrow-back"
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
                              onPress={() =>
                              {
                                  let listBooks = this.props.reduxState.listBooks;
                                  let data = []
                                  for (let i = 0; i < listBooks.length; i++)
                                  {
                                      if (listBooks[i].MaTheLoai === item.MaTheLoai)
                                      {
                                          data.push(listBooks[i]);
                                      }
                                  }
                                  this.props.navigation.navigate('VerList', {
                                      data: data,
                                      colNumber: 3,
                                      title: item.TenTheLoai,
                                  })
                              }}>
                <HImage
                    style={{width: widthImage, height: heightImage, zIndex: 5, elevation: 1}}
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
                        elevation: 6,
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 5,
                        marginRight: 5,
                        opacity: 0.75,
                        borderRadius: 10,
                    }}>
                    <Text
                        style={styles.tentheloai}>{item.TenTheLoai}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    renderItem = ({item, index}) =>
    {
        let tempUri = Globals.BASE_URL + item.HinhAnh;
        console.log(tempUri);
        let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = this.itemWidth - 10;
        let heightImage = widthImage * 3 / 2;
        console.log(widthImage);
        console.log(heightImage);

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
                        {item.KhuyenMai > 0 ? formatCurency(item.GiaBan) : ''}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[styles.giaban, {fontWeight: '700'}]}>
                        {item.KhuyenMai > 0 ? '-' + item.KhuyenMai + '%' : ''}
                    </Text>
                </View>

            </TouchableOpacity>
        );
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

