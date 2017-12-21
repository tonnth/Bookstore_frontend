export default Globals = {
    BASE_URL: 'https://tohiti-bookstore-backend.herokuapp.com/',
    COLOR: {
        MAINCOLOR: '#fc4a1a',
        MAINCOLOR2: '#F3F4F6',
    },
    GRADIENT_COLOR: ['#26D0CE', '#1A2980'],
    GRADIENT_OPACITY: 0.5,
    ICONSIZE: 30,
    TITLESIZE_BIG: 40,
    TITLESIZE_MEDIUM: 35,
    APPNAME: 'BookStore',
    FONT: {fontFamily: 'OpenSans-Regular',},
    BACKGROUNDCOLOR: '#CED6DD',
};

export const formatCurency = a =>
{
    if (a === " ") return a;
    return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
};

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

export const UPDATE_CURRENT_SCREEN = 'UPDATE_CURRENT_SCREEN';