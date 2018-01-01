import {NavigationActions} from "react-navigation";
import store from "./Store";

export default Globals = {
    BASE_URL: 'https://tohiti-bookstore-backend.herokuapp.com/',
    //BASE_URL: '192.168.1.48/',
    COLOR: {
        MAINCOLOR: '#fc4a1a',
        MAINCOLOR2: '#F3F4F6',
    },
    GRADIENT_COLOR: ['#1e3c72', '#2a5298'],
    GRADIENT_OPACITY: 0.8,
    ICONSIZE: 30,
    TITLESIZE_BIG: 40,
    TITLESIZE_MEDIUM: 35,
    APPNAME: 'BookStore',
    FONT: {fontFamily: 'OpenSans-Regular',},
    BACKGROUNDCOLOR: '#CED6DD',
    URIIMAGE: 'https://hdqwalls.com/download/yosemite-mountains-national-park-2560x1440.jpg',
};

export const formatCurency = a =>
{
    if (a === " ") return a;
    return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
};

export const datetoString = date =>
{
   var mm = date.getMonth() +1;
   var dd= date.getDate();
   var strD = (dd>9 ? '' : '0') + dd;
   var strM = (mm>9 ? '' : '0') + mm;
   return strD+"/"+strM+"/"+date.getFullYear();
}
export const formatDate = str =>
{
    var year, month, day;
    year = str.slice(0,4);
    month =str.slice(5,7);
    day = str.slice(8,10);
    return day + "/" + month + "/" + year;
}
export const formatOrderId = str =>
{
    var a ='#';
    for( i =0; i < (8 - str.length);i++)
    {
        a= a+'0';
    }
    return a+ str;
}

export const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Home'})
    ] });

export const validateEmail = email =>
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

export const addToCart = (book, cart) =>
{
    var push = true;
    var tempCart = cart;
    for(i = 0; i < tempCart.length; i++)
    {
        if(book.MaSach === tempCart[i].MaSach)
        {
            tempCart[i].SoLuong +=1;
            store.dispatch({type: UPDATE_CART, payload: tempCart});
            push=false;
            break;
        }
    }
    if(push)
    {
        var tempBook = book;
        tempBook.SoLuong =1;
        tempCart.push(tempBook);
        store.dispatch({type: UPDATE_CART, payload: tempCart});
    }

}

export const removeFromCart = (book, cart) =>
{
    var tempCart = cart;
    for(i = 0; i < tempCart.length; i++)
    {
        if(book.MaSach === tempCart[i].MaSach)
        {
            tempCart.splice(i,1);
            store.dispatch({type: UPDATE_CART, payload: tempCart});
            break;

        }
    }

}

export const updateCartItem = (book, cart) =>
{
    var tempCart = cart;
    for(i = 0; i < tempCart.length; i++)
    {
        if(book.MaSach === tempCart[i].MaSach)
        {
            tempCart[i]=book;
            store.dispatch({type: UPDATE_CART, payload: tempCart});
            break;

        }
    }

}
export const accountingTotal = (dsSanPham) =>
{
    console.log('Tính tổng');
    console.log(dsSanPham);
    var total = 0;
    for (i = 0; i < dsSanPham.length; i++)
    {
        total += dsSanPham[i].GiaBan * (1 - dsSanPham[i].KhuyenMai / 100) * dsSanPham[i].SoLuong;
    }
    console.log('Total là=', total);
    return total;
}

export const TheLoai = [
    {
        MaTheLoai: 1,
        TenTheLoai: "Tiểu sử - hồi ký",
        Hinh: "TieuSu.jpg",
        Color: ['#1A2980','#26D0CE'],
    },
    {
        MaTheLoai: 2,
        TenTheLoai: "Kỹ năng sống",
        Hinh: "selfhelp.jpg",
        Color: ['#C6426E','#642B73'],
    },
    {
        MaTheLoai: 3,
        TenTheLoai: "Khoa học - kỹ thuật",
        Hinh: "khoahoc-kithuat.jpg",
        Color: ['#8E0E00','#1F1C18'],
    },
    {
        MaTheLoai: 4,
        TenTheLoai: "Tiểu thuyết",
        Hinh: "TieuThuyet.jpg",
        Color: ['#4da0b0','#d39d38'],
    },
    {
        MaTheLoai: 5,
        TenTheLoai: "Sách học ngoại ngữ",
        Hinh: "NgoaiNgu.jpg",
        Color: ['#237A57','#093028'],
    },
    {
        MaTheLoai: 6,
        TenTheLoai: "Tâm lý",
        Hinh: "TamLy.jpg",
        Color: ['#C6426E','#C6426E'],
    },
    {
        MaTheLoai: 7,
        TenTheLoai: "Sách giáo khoa",
        Hinh: "SachGiaoKhoa.jpg",
        Color: ['#43cea2','#185a9d'],
    },
    {
        MaTheLoai: 8,
        TenTheLoai: "Lịch sử - Địa lý",
        Hinh: "LichSu.jpg",
        Color: ['#B79891','#94716B'],

    },
    {
        MaTheLoai: 9,
        TenTheLoai: "Truyện ngắn",
        Hinh: "TruyenNgan.jpg",
        Color: ['#D38312','#A83279'],
    },
    {
        MaTheLoai: 10,
        TenTheLoai: "Ngôn tình",
        Hinh: "NgonTinh.jpg",
        Color: ['#cc2b5e','#753a88'],
    },
    {
        MaTheLoai: 11,
        TenTheLoai: "Truyen tranh",
        Hinh: "TruyenTranh.jpg",
        Color: ['#F9D423','#FF4E50'],
    }
]

export const FETCHING_PROMOTION_BOOKS = "FETCHING_PROMOTION_BOOKS";
export const FETCHING_PROMOTION_BOOKS_SUCCESS = "FETCHING_PROMOTION_BOOKS_SUCCESS";
export const FETCHING_PROMOTION_BOOKS_FAIL = "FETCHING_PROMOTION_BOOKS_FAIL";


export const FETCHING_NEW_BOOKS = "FETCHING_NEW_BOOKS";
export const FETCHING_NEW_BOOKS_SUCCESS = "FETCHING_NEW_BOOKS_SUCCESS";
export const FETCHING_NEW_BOOKS_FAIL = "FETCHING_NEW_BOOKS_FAIL";


export const FETCHING_ACCESS_TOKEN = 'FETCHING_ACCESS_TOKEN';
export const FETCHING_ACCESS_TOKEN_SUCCESS = 'FETCHING_ACCESS_TOKEN_SUCCESS';
export const FETCHING_ACCESS_TOKEN_FAIL = 'FETCHING_ACCESS_TOKEN_FAIL';

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAIL = 'FETCHING_USER_FAIL';

export const FETCHING_FAVOURITE = 'FETCHING_FAVOURITE';
export const FETCHING_FAVOURITE_SUCCESS = 'FETCHING_FAVOURITE_SUCCESS';
export const FETCHING_FAVOURITE_FAIL = 'FETCHING_FAVOURITE_FAIL';

export const FETCHING_ORDER_HISTORY = 'FETCHING_ORDER_HISTORY';
export const FETCHING_ORDER_HISTORY_SUCCESS = 'FETCHING_ORDER_HISTORY_SUCCESS';
export const FETCHING_ORDER_HISTORY_FAIL = 'FETCHING_ORDER_HISTORY_FAIL';

export const UPDATE_CURRENT_SCREEN = 'UPDATE_CURRENT_SCREEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_CART = 'UPDATE_CART';
