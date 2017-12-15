import Globals, {
    FETCHING_BOOK_PROMOTION,
    FETCHING_BOOK_PROMOTION_SUCCESS,
    FETCHING_BOOK_PROMOTION_FAIL
} from '../Globals';


const initialState = {
    isFetching: false,
    books: null,

    hasError: false,
    errorMessage: null,

    currentBook: 0,
};


export const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case FETCHING_BOOK_PROMOTION:
            return Object.assign(state, {
                ...state,
                isFetching: true,
            });




        case FETCHING_BOOK_PROMOTION_SUCCESS:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                books: action.payload,
                hasError: false,
                currentBook: 0,
            });

        case FETCHING_BOOK_PROMOTION_FAIL:
            return Object.assign(state, {
                ...state,
                isFetching: false,
                hasError: true,
                errorMessage: action.payload.response.data,
                currentBook: null,
            });
        default:
            return state;
    }
    return state;
}