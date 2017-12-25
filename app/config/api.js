import Globals, {
    FETCHING_PROMOTION_BOOKS,
    FETCHING_PROMOTION_BOOKS_SUCCESS,
    FETCHING_PROMOTION_BOOKS_FAIL, FETCHING_NEW_BOOKS, FETCHING_NEW_BOOKS_SUCCESS, FETCHING_NEW_BOOKS_FAIL,
} from '../Globals';
import axios from 'axios';
import store from '../Store';

exports.getSachKhuyenMai =  function ()
{
    let url = Globals.BASE_URL + 'sach/khuyenmai';
    console.log("GET Sach Khuyen Mai: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_PROMOTION_BOOKS});
        return axios.get(url)
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_PROMOTION_BOOKS_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_PROMOTION_BOOKS_FAIL, payload: err})
            });

    })
}

exports.getSachMoi =  function ()
{
    let url = Globals.BASE_URL + 'sach/moi';
    console.log("GET Sach Moi: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_NEW_BOOKS});
        return axios.get(url)
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_NEW_BOOKS_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_NEW_BOOKS_FAIL, payload: err})
            });

    })
}

exports.Login = function (Email,Password)
{
    console.log('API LOGIN')
    let url = Globals.BASE_URL + 'khachhang/dangnhap';
    return axios.post(url,
        {
            Email: Email,
            MatKhau: Password,
        })
}

