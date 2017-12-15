import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import Globals from "../Globals";
import { Item, Input, Icon } from "native-base";

const { height } = Dimensions.get("window");

class HeaderDetail extends Component {
  render() {
    return (
    <View style={styles.wrapper}>
         <TouchableOpacity
                        // style={{paddingHorizontal: 20}}
                        onPress={() =>
                        goBack()}
                    >
                        <Image
                            source={require('../img/cart.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

             <TouchableOpacity
                        // style={{paddingHorizontal: 20}}
                        onPress={() =>
                        {
                            this.props.onOpen.navigate('DrawerOpen');
                        }}
                    >
                        <Image
                            source={require('../img/cart.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

    </View>
     
    );
  }
}

export default HeaderDetail;

const styles = StyleSheet.create({
  wrapper: { height: height / 8, backgroundColor: "white" },
  row1: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
  searchbar: {
    backgroundColor: "white",
    height: height / 22,
    marginLeft: 8,
    marginRight: 9.5,
    borderColor: Globals.COLOR.MAINCOLOR,
    borderRadius: height / 44,
    borderWidth: 1
  },
  icon: {
    width: 20,
    height: 20
  },
  title: {
    color: Globals.COLOR.MAINCOLOR,
    fontSize: 20
  }
});
