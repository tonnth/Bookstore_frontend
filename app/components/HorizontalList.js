import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
const { height }  = Dimensions.get('window')
import {connect} from "react-redux";
export default class HorizontalList extends Component
{

    constructor(props)
    {
        console.log("SLIDE MENU");
        super(props);

        this.state = {
            page: 1,
            refreshing: false,
            total_page: 1,
            book: this.props.reduxState.books.data[this.props.reduxState.currentBook],
        };
    }

    render()
    {
        return(
            <View style = {{
                backgroundColor: 'white',
                height: height * 0.3,
                margin: 5,
                shadowColor: '#2E272B',
                shadowOffset: { height: 3, width: 0},
                shadowOpacity: 0.2
            }}>
                <Text>Sách khuyến mãi</Text>

            </View>
        );
    }
}


const mapStateToProps = (reduxState) =>
{
    return {reduxState};
};

export default connect(mapStateToProps)();