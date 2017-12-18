import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StatusBar, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import Globals from "../Globals";
import TimerMixin from 'react-timer-mixin';
import {HButtonBack} from "../components/HButtonBack";

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

    updateView = (index) =>
    {
        console.log(index, this.callout.get(index));
        this.refs.map.animateToRegion({
            latitude: infoAddress[index].latitude,
            longitude: infoAddress[index].longitude,
            latitudeDelta: 0.00022,
            longitudeDelta: 0.00421,
        }, 1000);
        const refCallout = this.callout.get(index);
        TimerMixin.setTimeout(() =>
        {
            refCallout.showCallout();
        }, 1100);
    };

    render()
    {
        let that = this;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'#fff'}
                    translucent
                />
                <MapView
                    ref="map"
                    style={styles.map}
                    initialRegion={{
                        latitude: infoAddress[0].latitude,
                        longitude: infoAddress[0].longitude,
                        latitudeDelta: 0.00022,
                        longitudeDelta: 0.00421,
                    }}>
                    {infoAddress.map((marker, index) => (
                        <MapView.Marker
                            key={index}
                            coordinate={{latitude: marker.latitude, longitude: marker.longitude,}}
                            ref={c =>
                            {
                                that.callout.set(index, c)
                            }}>
                            <Image
                                source={require('../img/location.png')}
                                style={{
                                    width: 40, height: 40,
                                }}/>
                            <MapView.Callout>
                                <View style={{width: Dimensions.get('window').width - 100}}>
                                    <Text style={styles.title}>
                                        {marker.name}
                                    </Text>
                                    <Text style={styles.decrip}>
                                        {marker.phone}
                                    </Text>

                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
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
                        loop
                        autoplay={true}
                        autoplayInterval={4000}
                    />
                </View>
                <HButtonBack
                    color={'black'}
                    navigation={this.props.navigation}/>
            </View>);
    }

    renderItem = ({item, index}) =>
    {
        return (
            <View style={styles.slide}>
                <View style={styles.slideInnerContainer}>
                    <View style={styles.image}>
                        <Image
                            source={{uri: item.image}}
                            style={{
                                flex: 1,
                                overflow: 'hidden',
                                borderRadius: 10,
                            }}/>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount()
    {

    }
}

const horizontalMargin = 3;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    map: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        ...StyleSheet.absoluteFillObject,
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
        position: 'absolute',
        height: itemHeight + 10,
        bottom: 10,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        borderRadius: 10,

        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 5,
    },
    title: {
        ...Globals.FONT,
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
