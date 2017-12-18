import Globals, {
    FETCHING_PROMOTION_BOOKS,
    FETCHING_PROMOTION_BOOKS_SUCCESS,
    FETCHING_PROMOTION_BOOKS_FAIL, FETCHING_ACCESS_TOKEN, FETCHING_ACCESS_TOKEN_SUCCESS, FETCHING_ACCESS_TOKEN_FAIL,
    FETCHING_NEW_BOOKS, FETCHING_NEW_BOOKS_SUCCESS, FETCHING_NEW_BOOKS_FAIL,
} from '../Globals';


const initialState = {
    isFetching: false,
    currentBook: 0,

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
    hasError_Token: false,
    errorMessage_Token: null,

};


export const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case FETCHING_PROMOTION_BOOKS:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });


        case FETCHING_PROMOTION_BOOKS_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                listPromotionBooks: action.payload.data,
                hasError_Promotion_Books: false,
                currentBook: 0,
            });

        case FETCHING_PROMOTION_BOOKS_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Promotion_Books: true,
                errorMessage_Promotion_Books: action.payload.response.data,
                currentBook: null,
            });

        case FETCHING_NEW_BOOKS:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });

        case FETCHING_NEW_BOOKS_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                listNewBooks: action.payload.data,
                hasError_New_Books: false,
                currentBook: 0,
            });

        case FETCHING_NEW_BOOKS_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_New_Books: true,
                errorMessage_New_Books: action.payload.response.data,
                currentBook: null,
            });

        case FETCHING_ACCESS_TOKEN:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });


        case FETCHING_ACCESS_TOKEN_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                token: action.payload,
                hasError_Token: false,
            });

        case FETCHING_ACCESS_TOKEN_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError_Token: true,
                errorMessage_Token: action.payload.response.data,
            });

        default:
            return state;
    }
    return state;
}