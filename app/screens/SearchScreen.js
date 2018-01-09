import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet, StatusBar, Platform, TextInput
} from "react-native";

import {connect} from "react-redux";
import Globals, {change_alias, formatCurency, TheLoai} from "../Globals";
import * as api from "../config/api";
import HImage from "../components/HImage";
import LinearGradient from "react-native-linear-gradient";
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input} from 'native-base';
import {HButtonBack} from "../components/HButtonBack";

const {height, width} = Dimensions.get("window");

class SearchScreen extends Component
{
    constructor(props)
    {
        console.log("SEARCH LIST");
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
            dataSource: this.props.reduxState.listBooks,
            initData: this.props.reduxState.listBooks,
            noData: false,
            keyWord: '',
        };
        this.itemWidth = width / 3 - 10;
    }

    search = (e) =>
    {
        console.log(e.toLowerCase());
        let text = change_alias(e.toLowerCase());
        let trucks = this.state.initData;
        let filteredName = trucks.filter((item) =>
        {
            return change_alias(item.TenSach.toString().toLowerCase()).match(text);
        })
        if (!text || text === '')
        {
            this.setState({
                dataSource: this.state.initData,
            })
        } else if (!Array.isArray(filteredName) && !filteredName.length)
        {
            // set no data flag to true so as to render flatlist conditionally
            this.setState({
                noData: true
            });
        } else if (Array.isArray(filteredName))
        {
            this.setState({
                noData: false,
                dataSource: filteredName
            })
        }
    };

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
        let goiy = ['vsvsdbsdbsd', 'asvdssbdsbsdbsdbsd', 'dsbsdbdsbdsbsd', 'dvdsbsdbdsbsdb', 'dvsbdvsdbsdbsdb'].slice(0, 4);
        console.log(goiy);
        return (
            <Container style={styles.container}>
                <StatusBar
                    translucent={false}
                />
                <Header style={[styles.header]}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow>
                    <Button transparent
                            style={{width: 40}}
                            onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="arrow-back"
                              style={{color: '#000', fontSize: Globals.ICONSIZE}}/>
                    </Button>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput placeholder="Nhập vào từ khóa"
                                   style={{
                                       flex: 1,
                                       paddingLeft: 10,
                                       borderBottomWidth: 1,
                                       borderBottomColor: '#c2c2c2',
                                       fontSize: 15,
                                       ...Globals.FONT
                                   }}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   onChangeText={(text) =>
                                   {
                                       this.setState({
                                           keyWord: text,
                                       });
                                       this.search(text);
                                   }}/>
                    </View>
                </Header>
                {this.state.dataSource.length > 0 &&
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.dataSource}
                    renderItem={this.renderItem2}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                />}

                {this.state.dataSource.length === 0 &&
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 50,}}>
                    <View style={{
                        width: width - 80,
                        backgroundColor: 'transparent',
                        minHeight: 100,
                        marginTop: 5,
                    }}>
                        <Text style={{
                            ...Globals.FONT,
                            fontSize: 17,
                            fontWeight: '600',
                            marginBottom: 5,
                            alignSelf: 'flex-start',
                            marginLeft: 50,
                            opacity: 0.7
                        }}>Không tìm thấy đầu sách nào</Text>
                    </View>
                </View>}

            </Container>
        );
    }

    renderItem2 = ({item, index}) =>
    {
        let tempUri = Globals.BASE_URL + item.HinhAnh;
        console.log(item);
        let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        let widthImage = this.itemWidth - 10;
        let heightImage = widthImage * 3 / 2;

        return (
            <TouchableOpacity style={{width: this.itemWidth, margin: 5}}
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
                        {item.KhuyenMai > 0 ? '-'+item.KhuyenMai+'%' : ''}
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

export default connect(mapStateToProps)(SearchScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        // shadowOffset: {height: 0, width: 0},
        // shadowOpacity: 0,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        // elevation: 0

        justifyContent: 'space-around',
        flexDirection: 'row',
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
    },
    searchbar: {
        padding: 0,
        borderBottomWidth: 3,
        borderBottomColor: '#eaeaea',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

