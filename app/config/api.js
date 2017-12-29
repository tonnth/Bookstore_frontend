import Globals, {
    FETCHING_PROMOTION_BOOKS,
    FETCHING_PROMOTION_BOOKS_SUCCESS,
    FETCHING_PROMOTION_BOOKS_FAIL, FETCHING_NEW_BOOKS, FETCHING_NEW_BOOKS_SUCCESS, FETCHING_NEW_BOOKS_FAIL,
    FETCHING_USER, FETCHING_USER_FAIL, FETCHING_USER_SUCCESS,
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

exports.Login = function (Email,MatKhau)
{
    console.log('API LOGIN')
    let url = Globals.BASE_URL + 'khachhang/dangnhap';
    return axios.post(url,
        {
            Email: Email,
            MatKhau: MatKhau,
        })
}

exports.getThongTinKhachHang =  function (token)
{
    let url = Globals.BASE_URL + 'khachhang/thongtin';
    console.log("GET Thong tin khach hang: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_USER});
        return axios.get(url,
            {
                headers:
                    {
                        'Authorization': '' + token,
                    }
            }
            )
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_USER_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_USER_FAIL, payload: err})
            });

    })
}

