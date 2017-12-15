import Globals, {
    FETCHING_BOOK_PROMOTION,
    FETCHING_BOOK_PROMOTION_SUCCESS,
    FETCHING_BOOK_PROMOTION_FAIL
} from '../Globals';
import axios from 'axios';
import store from '../Store';

exports.getSachKhuyenMai =  function ()
{
    let url = Globals.BASE_URL + 'sach/khuyenmai';
    console.log("GET ACCESS TOKEN: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_BOOK_PROMOTION});
        return axios.get(url)
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_BOOK_PROMOTION_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_BOOK_PROMOTION_FAIL, payload: err})
            });

    })
}



