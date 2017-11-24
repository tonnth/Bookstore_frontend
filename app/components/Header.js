import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Dimensions, Text, TextInput, StyleSheet} from 'react-native';
import Globals from "../Globals";
import {Item, Input, Icon} from 'native-base';

const {height} = Dimensions.get('window');

class Header extends Component
{
    render()
    {
        return (
            <View style={styles.wrapper}>
                <View style={styles.row1}>
                    <TouchableOpacity
                        // style={{paddingHorizontal: 20}}
                        onPress={() =>
                        {
                            this.props.onOpen.navigate('DrawerOpen');
                        }}
                    >
                        <Image
                            source={require('../img/bars.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>


                    <Text style={styles.title}>ABC Bookstore</Text>


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

                {/*<TextInput style = {styles.searchbar}*/}
                {/*placeholder = "Bạn đang tìm gì?"*/}
                {/*/>*/}

                <Item style={styles.searchbar}>
                    <Image
                        source={require('../img/search.png')}
                        style={{
                            width: 14,
                            height: 14,
                            margin: 2
                        }}
                    />
                    <Input placeholder="Bạn đang tìm gì?" style={{fontSize: 12}}/>
                </Item>

            </View>
        );
    }
}

export default Header;


const styles = StyleSheet.create({
    wrapper: {height: height / 8, backgroundColor: Globals.COLOR.MAINCOLOR2},
    row1: {flexDirection: 'row', justifyContent: 'space-between', padding: 5},
    searchbar: {
        backgroundColor: 'white',
        height: height / 22,
        marginLeft: 8,
        marginRight: 9.5,
        borderColor: Globals.COLOR.MAINCOLOR,
        borderRadius: 10,
        borderWidth: 1,
    },
    icon: {
        width: 20,
        height: 20,
    },
    title: {
        color: Globals.COLOR.MAINCOLOR,
        fontSize: 20,
    }
})