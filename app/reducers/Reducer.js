import Globals, {
    FETCHING_BOOKS,
    FETCHING_BOOKS_SUCCESS,
    FETCHING_BOOKS_FAIL,
    FETCHING_PROMOTION_BOOKS,
    FETCHING_PROMOTION_BOOKS_SUCCESS,
    FETCHING_PROMOTION_BOOKS_FAIL,
    FETCHING_NEW_BOOKS, FETCHING_NEW_BOOKS_SUCCESS, FETCHING_NEW_BOOKS_FAIL, UPDATE_CURRENT_SCREEN, UPDATE_CART, UPDATE_USER,
    FETCHING_CART, FETCHING_CART_FAIL, FETCHING_CART_SUCCESS,
    UPDATE_ORDER,
    UPDATE_TOKEN, FETCHING_USER, FETCHING_USER_FAIL, FETCHING_USER_SUCCESS,
    FETCHING_FAVOURITE, FETCHING_FAVOURITE_SUCCESS, FETCHING_FAVOURITE_FAIL,
    FETCHING_ORDER_HISTORY, FETCHING_ORDER_HISTORY_FAIL, FETCHING_ORDER_HISTORY_SUCCESS, UPDATE_PROMOTION_BOOKS,
    UPDATE_NEW_BOOKS, UPDATE_FAVOURITE_BOOKS, FETCHING_BANNER, FETCHING_BANNER_FAIL, FETCHING_BANNER_SUCCESS,
    UPDATE_ORDER_HISTORY
} from '../Globals';
import * as api from "../config/api";

const initialState = {
    isFetching: false,
    currentBook: 0,

    //all books
    listBooks: null,
    hasError_Books: false,
    errorMessage_Books: null,

    //Promotion Books
    listPromotionBooks: null,
    hasError_Promotion_Books: false,
    errorMessage_Promotion_Books: null,

    //New Books
    listNewBooks: null,
    hasError_New_Books: false,
    errorMessage_New_Books: null,

    //Token
    token: null,

    //User
    user: null,
    hasError_User: false,
    errorMessage_User: null,

    //Favourite
    favourite_books: null,
    hasError_Favourite_Books: false,
    errorMessage_Favourite_Books: null,

    //Order History
    order_history: null,
    hasError_Order_History: false,
    errorMessage_Order_History:null,

    //Cart
    cart: [],
    hasError_Cart: false,
    errorMessage_cart: null,

    //Order
    order: null,


    //Banner
    banner:[],
    hasError_Banner: false,
    errorMessage_Banner:null,

    screen: '',
};


export const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case FETCHING_BOOKS:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });


        case FETCHING_BOOKS_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                listBooks: action.payload.data,
                hasError_Books: false,
                currentBook: 0,
            });

        case FETCHING_BOOKS_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Books: true,
                errorMessage_Books: action.payload.response.data,
                currentBook: null,
            });
        case FETCHING_BANNER:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });


        case FETCHING_BANNER_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                banner: action.payload.data,
                hasError_Banner: false,
            });

        case FETCHING_BANNER_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Banner: true,
                errorMessage_Banner: action.payload.response.data,
            });
        // case FETCHING_PROMOTION_BOOKS:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: true,
        //     });
        //
        //
        // case FETCHING_PROMOTION_BOOKS_SUCCESS:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: false,
        //         listPromotionBooks: action.payload.data,
        //         hasError_Promotion_Books: false,
        //         currentBook: 0,
        //     });
        //
        // case FETCHING_PROMOTION_BOOKS_FAIL:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: false,
        //         hasError_Promotion_Books: true,
        //         errorMessage_Promotion_Books: action.payload.response.data,
        //         currentBook: null,
        //     });

        // case FETCHING_NEW_BOOKS:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: true,
        //     });
        //
        // case FETCHING_NEW_BOOKS_SUCCESS:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: false,
        //         listNewBooks: action.payload.data,
        //         hasError_New_Books: false,
        //         currentBook: 0,
        //     });
        //
        // case FETCHING_NEW_BOOKS_FAIL:
        //     return Object.assign(state, {
        //         ...state,
        //         isFetching: false,
        //         hasError_New_Books: true,
        //         errorMessage_New_Books: action.payload.response.data,
        //         currentBook: null,
        //     });

        case FETCHING_USER:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });

        case FETCHING_USER_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                user: action.payload.data,
                hasError_User: false,
            });

        case FETCHING_USER_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_User: true,
                errorMessage_User: action.payload.response.data,
            });

        case FETCHING_FAVOURITE:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });

        case FETCHING_FAVOURITE_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                favourite_books: action.payload.data,
                hasError_Favourite: false,
            });

        case FETCHING_FAVOURITE_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Favourite_Books: true,
                errorMessage_Favourite: action.payload.response.data,
            });

        case FETCHING_ORDER_HISTORY:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });

        case FETCHING_ORDER_HISTORY_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                order_history: action.payload.data.reverse(),
                hasError_Order_History: false,
            });

        case FETCHING_ORDER_HISTORY_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Order_History: true,
                errorMessage_Order_History: action.payload.response.data,
            });

        case UPDATE_PROMOTION_BOOKS:
            return Object.assign(state, {
                ...state,
                listPromotionBooks: action.payload,
            });

        case UPDATE_NEW_BOOKS:
            return Object.assign(state, {
                ...state,
                listNewBooks: action.payload,
            });

        case UPDATE_CURRENT_SCREEN:
        return Object.assign(state, {
            ...state,
            screen: action.payload,
        });

        case FETCHING_CART:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });

        case FETCHING_CART_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                cart: action.payload.data,
                hasError_Cart: false,
            });

        case FETCHING_CART_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Cart: true,
                errorMessage_Cart: action.payload.response.data,
            });
        case UPDATE_CART:
            return Object.assign(state, {
                ...state,
                cart: action.payload,
            });

        case UPDATE_TOKEN:
            return Object.assign(state, {
                ...state,
                token: action.payload,
            });

        case UPDATE_ORDER:
            return Object.assign(state, {
                ...state,
                order: action.payload,
            });

        case UPDATE_FAVOURITE_BOOKS:
            return Object.assign(state, {
                ...state,
                favourite_books: action.payload,
            });
        case UPDATE_ORDER_HISTORY:
            return Object.assign(state, {
                ...state,
                order_history: action.payload,
            });
        case UPDATE_USER:
            return Object.assign(state, {
                ...state,
                user: action.payload,
            });
        default:
            return state;
    }
    return state;
}