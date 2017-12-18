import React, {Component} from "react";
import {
    View,
    Image,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

const {height} = Dimensions.get("window");
import {connect} from "react-redux";
import Globals from "../Globals";
import * as api from "../config/api";

class HorizontalList extends Component
{
    constructor(props)
    {

        super(props);
        console.log("HORIZONTALLIST", this.props.data);
        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
        };

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
            <View
                style={{
                    backgroundColor: "white",
                    // height: height * 0.3,
                    marginTop: 10,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    <View style={{width: 6, height: 20,backgroundColor: Globals.COLOR.MAINCOLOR, marginRight: 10}}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <TouchableOpacity style={styles.buttonMore}
                        // onPress={() => this.props.navigation.goBack(null)}>
                    >
                        <Image
                            source={require("../img/next.png")}
                            style={styles.icon}
                            resizeMode="contain"/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{padding: 10}}
                    data={this.props.data}
                    renderItem={item => this.renderItem(item)}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    renderItem = ({item}) =>
    {
        var tempUri = Globals.BASE_URL + item.HinhAnh;
        var giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        var tenSachRutGon = " ";
        if (item.TenSach.length > 12)
        {
            tenSachRutGon = item.TenSach.slice(0, 9) + "...";
        } else
        {
            tenSachRutGon = item.TenSach;
        }

        return (
            <TouchableOpacity style={styles.wrapper} onPress={() => this.props.nav.navigate('Detail', item)}>
                <Image
                    style={{width: 90, height: 120}}
                    source={{
                        uri: tempUri
                    }}
                />
                <Text  numberOfLines={1} >{tenSachRutGon}</Text>
                <Text style={styles.giaban}>{item.GiaBan}</Text>
                <Text style={styles.giaKhuyenMai}>{giaKhuyenMai}</Text>
            </TouchableOpacity>
        );
    };


}

const mapStateToProps = reduxState =>
{
    return {reduxState};
};

export default connect(mapStateToProps)(HorizontalList);


const styles = StyleSheet.create({
    title: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    wrapper: {marginHorizontal: 10},
    giaKhuyenMai: {color: Globals.COLOR.MAINCOLOR},
    giaban: {
        textDecorationLine: 'line-through',
        color: '#c8c8c8'
    },
    buttonMore: {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-end'
    },
    icon: {
        opacity: 0.5,
        height: 18,
        width: 20,
    }
});

