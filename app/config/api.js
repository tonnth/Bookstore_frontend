import Globals, {
    FETCHING_PROMOTION_BOOKS,
    FETCHING_PROMOTION_BOOKS_SUCCESS,
    FETCHING_PROMOTION_BOOKS_FAIL, FETCHING_NEW_BOOKS, FETCHING_NEW_BOOKS_SUCCESS, FETCHING_NEW_BOOKS_FAIL,
    FETCHING_USER, FETCHING_USER_FAIL, FETCHING_USER_SUCCESS, FETCHING_FAVOURITE, FETCHING_FAVOURITE_SUCCESS,
    FETCHING_ORDER_HISTORY, FETCHING_ORDER_HISTORY_SUCCESS, FETCHING_BOOKS, FETCHING_BOOKS_SUCCESS, FETCHING_BOOKS_FAIL,
    UPDATE_FAVOURITE_BOOKS, FETCHING_CART, FETCHING_CART_SUCCESS, FETCHING_CART_FAIL, FETCHING_BANNER,FETCHING_BANNER_FAIL,FETCHING_BANNER_SUCCESS
} from '../Globals';
import axios from 'axios';
import store from '../Store';

exports.getAllBooks = function ()
{
    let url = Globals.BASE_URL + 'sach/';
    console.log("GET all SACH: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_BOOKS});

        return axios.get(url)
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_BOOKS_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_BOOKS_FAIL, payload: err})
            });

    })
}

exports.putLike = function (token, MaSach, like)
{
    let url = Globals.BASE_URL + 'khachhang/thich';
    console.log("api putLike: " + url);
    return axios.put(url, {
            MaSach: MaSach,
            like: like,
        },
        {
            headers:
                {
                    'Authorization': '' + token,
                }
        });

}

exports.getPromotionBooks = function ()
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


exports.getNewBooks = function ()
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
// exports.getBookByGenre = function (MaTheLoai)
// {
//     let url = Globals.BASE_URL + 'sach/theloai/' + MaTheLoai;
//     console.log("GET Sach Theo The Loai: " + url);
//     return axios.get(url);
// }
exports.Login = function (Email, MatKhau)
{
    console.log('API LOGIN')
    let url = Globals.BASE_URL + 'khachhang/dangnhap';
    return axios.post(url,
        {
            Email: Email,
            MatKhau: MatKhau,
        })
}

exports.SignUp = function (Email, MatKhau, HoTen)
{
    console.log('API SIGNUP')
    let url = Globals.BASE_URL + 'khachhang/dangky';
    return axios.post(url,
        {
            Email: Email,
            MatKhau: MatKhau,
            HoTenKhachHang: HoTen,
        })
}
exports.ForgotPassword = function (Email)
{
    let url = Globals.BASE_URL + 'khachhang/quenmatkhau';
    return axios.post(url, {
      Email: Email,
    });
}
exports.Order = function (token, order)
{
    console.log('API Order')
    let url = Globals.BASE_URL + 'khachhang/dathang';
    return axios.post(url, order, {
        headers:
            {
                'Authorization': '' + token,
            }
    });
}

exports.getUserInfo = function (token)
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

exports.getFavouriteBooks = function (token)
{
    let url = Globals.BASE_URL + 'khachhang/dsyeuthich';
    console.log("GET Danh sach yeu thich: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_FAVOURITE});
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
                dispatch({type: FETCHING_FAVOURITE_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_FAVOURITE, payload: err})
            });

    })
}
exports.getOrderHistory = function (token)
{
    let url = Globals.BASE_URL + 'khachhang/lichsumuahang';
    console.log("GET lich su mua hang: " + url);
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_ORDER_HISTORY});
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
                dispatch({type: FETCHING_ORDER_HISTORY_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_NEW_BOOKS_FAIL, payload: err})
            });

    })
}

exports.getCart = function (token)
{
    console.log('API GETCART');
    let url = Globals.BASE_URL + 'giohang/';
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_CART});
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
                dispatch({type: FETCHING_CART_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_CART_FAIL, payload: err})
            });

    })
}
exports.putUpdateCart = function (token,cart)
{
    console.log('API UPDATE CART:',cart);
    console.log(token);
    let url = Globals.BASE_URL + 'giohang/capnhat';
    return axios.put(url, cart, {
        headers:
            {
                'Authorization': '' + token,
            }
    });
}

exports.getBanner = function ()
{
    let url = Globals.BASE_URL + 'sach/banner';
    return store.dispatch(dispatch =>
    {
        dispatch({type: FETCHING_BANNER});
        return axios.get(url)
            .then(res =>
            {
                console.log(res.data);
                dispatch({type: FETCHING_BANNER_SUCCESS, payload: res});
            })
            .catch(err =>
            {
                console.log(err.response.data);
                dispatch({type: FETCHING_BANNER_FAIL, payload: err})
            });

    })
}