import React, {Component} from 'react';
import {
    View, Text, Image, Platform, StatusBar, Dimensions, StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Globals from "../Globals";
import TimerMixin from 'react-timer-mixin';
import {HButtonBack} from "../components/HButtonBack";
import StepIndicator from 'react-native-step-indicator';
import {Body, Button, Container, Header, Icon, Left, Right, Title} from "native-base";
import HButton from "../components/HButton";
import Step1 from "../components/ConfirmStep/Step1";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Step0 from "../components/ConfirmStep/Step0";
import Step2 from "../components/ConfirmStep/Step2";
import Step3 from "../components/ConfirmStep/Step3";

const labels1 = ["Địa chỉ", "Thanh toán", "Xác nhận"];
const labels2 = ["Tài khoản", "Địa chỉ", "Thanh toán", "Xác nhận"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 35,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 14,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#fff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 14,
    currentStepLabelColor: '#fe7013'
};

export default class ConfirmScreen extends Component
{
    constructor(props)
    {
        console.log("ADDRESS SCREEN");
        super(props);
        this.callout = new Map();
        this.state = {
            index: 0,
            checkAccount: true, //kiem tra xem da dang nhap hay chua
        }
    }

    updateView = (index) =>
    {
        if (index > this.state.index) this.carousel.snapToPrev();
        if (index < this.state.index) this.setState({index});
    };

    render()
    {
        return (
            <KeyboardAwareScrollView
                innerRef={ref =>
                {
                    this.scroll = ref
                }}
                enableOnAndroid={false}
                contentContainerStyle={styles.container}>
                <StatusBar
                    translucent={false}
                />
                <Header
                    iosStatusbar="light-content"
                    androidStatusBarColor="black"
                    noShadow>
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Icon name="arrow-back"
                                  style={{color: "#000", fontSize: Globals.ICONSIZE}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>
                        Bảo mật thanh toán
                    </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View style={{flex: 1}}>
                    <View style={styles.step}>
                        <StepIndicator
                            customStyles={customStyles}
                            stepCount={this.state.checkAccount ? 3 : 4}
                            currentPosition={this.state.index}
                            labels={this.state.checkAccount ? labels1 : labels2}
                        />
                    </View>
                    <View style={styles.carousel}>
                        <Carousel
                            ref={(c) =>
                            {
                                this.carousel = c;
                            }}
                            data={this.state.checkAccount ? [1, 2, 3] : [1, 2, 3, 4]}
                            renderItem={this.state.checkAccount ? this.renderItem1 : this.renderItem2}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            containerCustomStyle={{flex: 1}}
                            onSnapToItem={this.updateView}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>);
    }

    renderItem1 = ({item, index}) =>
    {
        let that = this;
        switch (index)
        {
            case 0:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step1
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 1});
                                        that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step2
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 2});
                                        that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step3
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 2});
                                        that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    renderItem2 = ({item, index}) =>
    {
        let that = this;
        switch (index)
        {
            case 0:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step0
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 1});
                                        that.carousel.snapToNext();
                                    }}
                                    navigation={this.props.navigation}/>}
                            </View>
                        </View>
                    </View>
                );

            case 1:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step1
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 2});
                                        that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step2
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        that.setState({index: 3});
                                        that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.slide}>
                        <View style={styles.slideInnerContainer}>
                            <View style={styles.image}>
                                {this.state.index === index &&
                                <Step3
                                    width={itemWidth}
                                    action={() =>
                                    {
                                        // that.setState({index: 3});
                                        // that.carousel.snapToNext();
                                    }}/>}
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    componentDidMount()
    {

    }
}

const horizontalMargin = 3;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = Dimensions.get('window').height - 160;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: itemHeight,
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
    step: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
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
});