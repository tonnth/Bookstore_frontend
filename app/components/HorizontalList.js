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
import Globals, {formatCurency, TheLoai} from "../Globals";
import * as api from "../config/api";
import HImage from "./HImage";
import LinearGradient from "react-native-linear-gradient";

class HorizontalList extends Component
{
    constructor(props)
    {
        super(props);
        // console.log("HORIZONTALLIST", this.props.data);
        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
            dataSource: this.props.theloai ? TheLoai : this.props.data,
        };
    }

    componentDidMount()
    {

    }


    formatCurency = a =>
    {
        return a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
    };


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
        if (this.state.dataSource.length === 0) return null;
        return (
            <View
                style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: 6, height: 20, backgroundColor: Globals.COLOR.MAINCOLOR, marginRight: 10}}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <TouchableOpacity
                        style={styles.buttonMore}
                        onPress={() =>
                        {
                            if (this.props.favorite)
                            {
                                this.props.navigation.navigate('Favorite');
                            }
                            else
                                this.props.navigation.navigate('VerList', {
                                    data: this.state.dataSource,
                                    title: this.props.title,
                                    colNumber: this.props.theloai ? 2 : 3,
                                    theloai: this.props.theloai,
                                })
                        }}
                    >
                        <Image
                            source={require("../img/next.png")}
                            style={styles.icon}
                            resizeMode="contain"/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.dataSource}
                    renderItem={this.props.theloai ? this.renderTheloai : this.renderItem}

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

    renderTheloai = ({item, index}) =>
    {
        let marginLeft = 0;
        if (index === 0) marginLeft = 20;
        let tempUri = Globals.BASE_URL + item.Hinh;
        return (
            <TouchableOpacity style={{marginRight: 10, width: 160, alignItems: 'center', marginLeft: marginLeft}}
                              onPress={async () =>
                              {
                                  //Lấy các sách thuộc thể loại này
                                  var listBooks = this.props.reduxState.listBooks;
                                  var data = []
                                  for (i = 0; i < listBooks.length; i++)
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
                                  });
                              }}>
                <HImage
                    style={{width: 150, height: 100, zIndex: 5, elevation: 1}}
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
        let marginLeft = 0;
        if (index === 0) marginLeft = 20;
        let tempUri = Globals.BASE_URL + item.HinhAnh;
        let giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
        return (
            <TouchableOpacity
                style={{marginRight: 10, width: 130, height: 260, justifyContent: 'center', marginLeft: marginLeft}}
                onPress={() => this.props.navigation.navigate('Detail', item)}>
                <HImage
                    style={{width: 120, height: 160}}
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
                        style={[styles.giaban, {fontWeight: '700', marginRight: 10}]}>
                        {item.KhuyenMai > 0 ? '-' + item.KhuyenMai + '%' : ''}
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

export default connect(mapStateToProps)(HorizontalList);


const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    title: {
        ...Globals.FONT,
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonMore: {
        position: 'absolute',
        alignSelf: 'center',
        right: 0,
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
        textAlign: 'center',
    }
});

