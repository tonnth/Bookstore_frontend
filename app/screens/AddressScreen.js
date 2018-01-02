import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StatusBar, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import Globals from "../Globals";
import TimerMixin from 'react-timer-mixin';
import {HButtonBack} from "../components/HButtonBack";
import FastImage from "react-native-fast-image";

const infoAddress = [
    {
        name: 'Toà nhà Saigon Centre',
        phone: '(84.28) 62.706.333',
        latitude: 10.7737523,
        longitude: 106.6987203,
        image: 'http://alqabdah.com/wp-content/uploads/2017/01/500.jpg'
    },
    {
        name: 'Takashimaya Vietnam',
        phone: '(84.28) 38.277.239',
        latitude: 10.7729934,
        longitude: 106.6998147,
        image: 'https://hips.hearstapps.com/pop.h-cdn.co/assets/cm/15/05/54cb5d94587ec_-_tallest-buildings-05-1214-lgn.jpg'
    },
    {
        name: 'Phố đi bộ Nguyễn Huệ',
        phone: '(84.28) 37.442.313',
        latitude: 10.7712438,
        longitude: 106.6999863,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMY8o5OoSftqg_yNLsA1hBvXLOZ4GbXZUM16aIp2cZafwWK3nb'
    },
];

export default class AddressScreen extends Component
{
    constructor(props)
    {
        console.log("ADDRESS SCREEN");
        super(props);
        this.callout = new Map();
        this.state = {
            index: 0,
        }
    }

    render()
    {
        console.log(this.props.navigation.state.routeName + ' Render');
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#fff'}
                    translucent
                />
                <View style={styles.carousel}>
                    <Carousel
                        ref={(c) =>
                        {
                            this._carousel = c;
                        }}
                        data={infoAddress}
                        renderItem={this.renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        containerCustomStyle={{flex: 1}}
                        onSnapToItem={this.updateView}
                    />
                </View>
                <HButtonBack
                    color={'black'}
                    navigation={this.props.navigation}/>
            </View>);
    }

    renderItem = ({item, index}) =>
    {
        let that = this;
        return (
            <View style={styles.slide}>
                <View style={styles.slideInnerContainer}>
                    <View style={styles.image}>
                        <View style={styles.map}>
                            <View
                                style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}>
                                <MapView
                                    ref="map"
                                    style={{flex: 1}}
                                    initialRegion={{
                                        latitude: infoAddress[index].latitude,
                                        longitude: infoAddress[index].longitude,
                                        latitudeDelta: 0.00022,
                                        longitudeDelta: 0.00421,
                                    }}>

                                    <MapView.Marker
                                        key={index}
                                        coordinate={{
                                            latitude: infoAddress[index].latitude,
                                            longitude: infoAddress[index].longitude,
                                        }}
                                        ref={c =>
                                        {
                                            that.callout.set(index, c)
                                        }}>
                                    </MapView.Marker>

                                </MapView>
                            </View>
                        </View>
                        <Text style={styles.title}>
                            {infoAddress[index].name}
                        </Text>
                        <Text style={styles.decrip}>
                            {infoAddress[index].phone}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount()
    {

    }

    shouldComponentUpdate(nextProps)
    {
        console.log('Address Render', nextProps);
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

const horizontalMargin = 3;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = Dimensions.get('window').height - 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    map: {
        height: itemHeight / 2,
        borderRadius: 20,

        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 5,
    },
    slide: {
        width: itemWidth,
        height: itemHeight,
        paddingHorizontal: horizontalMargin,
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
        // other styles for the inner container
    },
    carousel: {
        height: itemHeight + 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        borderRadius: 25,

        padding: 15,
        flexDirection: 'column',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 5,
    },
    title: {
        ...Globals.FONT,
        marginTop: 20,
        color: '#000',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    decrip: {
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        fontSize: 16
    }
});
