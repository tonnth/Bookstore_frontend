import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const { height } = Dimensions.get("window");
import { connect } from "react-redux";
import Globals from "../Globals";
import * as api from "../config/api";

class HorizontalList extends Component {
  constructor(props) {
    console.log("HORIZONTALLIST");
    super(props);
    this.state = {
      page: 1,
      refreshing: false,
      total_page: 1,
      dataSource: [],
    };
   
  }

  // getData = () => {
  //   api.getSachKhuyenMai().then(() => {
  //     console.log(this.props.reduxState.books.data);
  //     this.setState({
  //       dataSource: [
  //         ...this.state.dataSource,
  //         ...this.props.reduxState.books.data
  //       ],
  //       refreshing: false
  //     });
  //   });
  // };

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

  componentDidMount() {
    this.getData();
  }


  handleRefresh = () => {
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

  handleLoadMore = () => {
    // this.setState(
    //     {
    //         page: this.state.page + 1,
    //     }
    // );
    // if (this.state.page > this.state.total_page) return;
    // // Toast.show(this.state.page + " / " + this.state.total_page);
    // this.getData();
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          // height: height * 0.3,
          margin: 5,
          shadowColor: "#2E272B",
          shadowOffset: { height: 3, width: 0 },
          shadowOpacity: 0.2
        }}
      >
        <Text style = { styles.title}>Sách khuyến mãi</Text>
        <FlatList
          style={{ padding: 10 }}
          data={this.state.dataSource}
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

  renderItem = ({ item }) => {
    var tempUri = Globals.BASE_URL + item.HinhAnh;
    var giaKhuyenMai = item.GiaBan * (100 - item.KhuyenMai) / 100;
    var tenSachRutGon = " ";
    if (item.TenSach.length > 12) {
      tenSachRutGon = item.TenSach.slice(0, 9) + "...";
    } else {
      tenSachRutGon = item.TenSach;
    }

    return (
      <TouchableOpacity style={styles.wrapper} onPress= {()=> this.props.nav.navigate('Detail',item)}>
        <Image  
          style={{ width: 90, height: 120 }}
          source={{
            uri: tempUri
          }}
        />
        <Text>{tenSachRutGon}</Text>
        <Text>{item.GiaBan}</Text>
        <Text style={styles.giaban}>{giaKhuyenMai}</Text>
      </TouchableOpacity>
    );
  };

  
}

const mapStateToProps = reduxState => {
  return { reduxState };
};

export default connect(mapStateToProps)(HorizontalList);


const styles = StyleSheet.create({
title:{color: Globals.COLOR.MAINCOLOR, fontSize: 16, margin : 4},
  wrapper: { marginHorizontal: 10 },
  giaban: { color: Globals.COLOR.MAINCOLOR }
});

