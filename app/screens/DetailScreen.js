import React, { Component } from 'react';
import {
  View, Text, Image,
} from 'react-native';
import HeaderDetail from '../components/HeaderDetail';

export default class ProfileScreen extends Component {
  constructor(props) {
    console.log("DETAIL SCREEN");
    super(props);
    this.params = this.props.navigation.state.params;
    console.log(this.params);
  }
  
    render() {
      var tempUri = Globals.BASE_URL + this.params.HinhAnh;
      var giaKhuyenMai = this.params.GiaBan * (100 - this.params.KhuyenMai) / 100;
      return (
       <View>
         <HeaderDetail style ={{marginTop:10}} onOpen= {this.props.navigation}/>
         <Image  
          style={{ width: 150, height:  200 }}
          source={{
            uri: tempUri
          }}
        />
           <Text>{this.params.TenSach}</Text>
           <Text>{this.params.GiaBan}</Text>
        <Text>{giaKhuyenMai}</Text>
       </View>  
      );
    }
  }
