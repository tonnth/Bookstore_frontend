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
            dataSource: [],
        };
        this.itemWidth = width / 3 - 10;
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
        let goiy = ['vsvsdbsdbsd', 'asvdssbdsbsdbsdbsd', 'dsbsdbdsbdsbsd', 'dvdsbsdbdsbsdb', 'dvsbdvsdbsdbsdb'].slice(0, 4);
        console.log(goiy);
        return (
            <Container style={styles.container}>
                <StatusBar
                    translucent={false}
                />
                <Header style={styles.header}
                        iosStatusbar="light-content"
                        androidStatusBarColor="black"
                        noShadow
                        searchBar rounded>
                    <Button transparent
                            style={{marginLeft: -15}}
                            onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="ios-arrow-back"
                              style={{color: '#000', fontSize: Globals.ICONSIZE}}/>
                    </Button>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search"/>
                    </Item>
                    <Button transparent
                            onPress={() =>
                            {
                            }}>
                        <Text>Tìm kiếm</Text>
                    </Button>
                </Header>
                {this.state.dataSource.length > 0 &&
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
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
                        }}>Lịch sử tìm kiếm</Text>
                    <View style={{
                        width: width - 80,
                        backgroundColor: '#BDBDBD',
                        minHeight: 100,
                        borderRadius: 15,
                        padding: 15,
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
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#d9d9d9',
                    padding: 10,
                }}
                onPress={() =>
                {
                }}>
                <Text
                    style={{color: '#000', fontSize: 20,}}
                    numberOfLines={1}>{item}</Text>
            </TouchableOpacity>
        );
    };
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

