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
        let text = e.toLowerCase();
        let trucks = this.state.initData;
        let filteredName = trucks.filter((item) =>
        {
            return item.TenSach.toString().toLowerCase().match(text)
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
                            onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="ios-arrow-back"
                              style={{color: '#000', fontSize: Globals.ICONSIZE}}/>
                    </Button>

                    <View style={{width: 300, flexDirection: 'row', alignItems: 'center',}}>
                        <Input placeholder="Nhập vào từ khóa" style={{width: 300}}
                               onChangeText ={(text)=>{
                                   this.setState({
                                       keyWord: text,
                                   });
                                   this.search(text);
                               }}/>
                        <Icon name="ios-search"/>
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
                    <Text
                        style={{
                            ...Globals.FONT,
                            fontSize: 17,
                            fontWeight: '600',
                            marginBottom: 5,
                            alignSelf: 'flex-start',
                            marginLeft: 50,
                            opacity: 0.7
                        }}>Lịch sử tìm kiếm</Text>
                    <View style={{
                        width: width - 80,
                        backgroundColor: 'transparent',
                        minHeight: 100,
                        marginTop: 5,
                    }}>
                        {this.renderItem(goiy[0])}
                        {this.renderItem(goiy[1])}
                        {this.renderItem(goiy[2])}
                        {this.renderItem(goiy[3])}
                    </View>
                </View>}

            </Container>
        );
    }

    renderItem = (item) =>
    {
        return (
            <TouchableOpacity
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 5,
                    paddingLeft: 20,
                    paddingRight: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                }}
                onPress={() =>
                {
                }}>
                <Text
                    style={{color: '#000', fontSize: 20,}}
                    numberOfLines={1}>{item}</Text>
                <Button transparent
                        onPress={() => {}}>
                    <Icon name="ios-close-outline" size={25} color="#000" style={{color: '#000'}}/>
                </Button>
            </TouchableOpacity>
        );
    };

    renderItem2 = (item,index) =>
    {
        return (
            <TouchableOpacity
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 5,
                    paddingLeft: 20,
                    paddingRight: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                }}
                onPress={() =>
                {
                }}>
                <Text
                    style={{color: '#000', fontSize: 20,}}
                    numberOfLines={1}>{item.TenSach}</Text>
                <Button transparent
                        onPress={() => {}}>
                    <Icon name="ios-close-outline" size={25} color="#000" style={{color: '#000'}}/>
                </Button>
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

