import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Globals from "../Globals";

export default class SideMenu extends React.Component {
  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: Globals.COLOR.MAINCOLOR,
            flexDirection: "row",
            padding: 10
          }}
        >
          <Image
            source={require("../img/man.png")}
            style={{
              height: 32,
              width: 32,
              margin: 5
            }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20
              }}
            >
              Hello, Hoàng Tôn
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderBottomColor: "#D6D6D6",
            borderBottomWidth: 1
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/home.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Trang chủ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/box.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Đơn hàng của tôi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/like.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Danh sách yêu thích
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/user.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Thông tin tài khoản
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/setting.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Cài đặt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../img/signout.png")}
              style={{
                height: 24,
                width: 24,
                margin: 16
              }}
            />

            <Text
              style={{
                fontSize: 18,
                marginVertical: 15
              }}
            >
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ margin: 10 }}>CHĂM SÓC KHÁCH HÀNG</Text>
        <TouchableOpacity>
          <Text style={{ margin: 10 }}>
            HOTLINE:{" "}
            <Text style={{ color: Globals.COLOR.MAINCOLOR }}>1900-1009 </Text>(1000đ/phút)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
