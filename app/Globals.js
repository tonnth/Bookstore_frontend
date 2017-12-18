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
    FONT: {fontFamily: 'OpenSans-Regular',}
};

export const FETCHING_BOOK_PROMOTION = "FETCHING_BOOK_PROMOTION";
export const FETCHING_BOOK_PROMOTION_SUCCESS = "FETCHING_BOOK_PROMOTION_SUCCESS";
export const FETCHING_BOOK_PROMOTION_FAIL = "FETCHING_BOOK_PROMOTION_FAIL";

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
        Color: ['#e1eec3','#f05053'],
    },
    {
        MaTheLoai: 2,
        TenTheLoai: "Kỹ năng sống",
        Hinh: "selfhelp.jpg",
        Color: ['#36d1dc','#5b86e5'],
    },
    {
        MaTheLoai: 3,
        TenTheLoai: "Khoa học - kỹ thuật",
        Hinh: "khoahoc-kithuat.jpg",
        Color: ['#f7ff00','#db36a4'],
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
        Color: ['#c02425','#f0cb35'],
    },
    {
        MaTheLoai: 6,
        TenTheLoai: "Tâm lý",
        Hinh: "TamLy.jpg",
        Color: ['#c2e59c','#64b3f4'],
    },
    {
        MaTheLoai: 7,
        TenTheLoai: "Sách giáo khoa",
        Hinh: "SachGiaoKhoa.jpg",
        Color: ['#fc00ff','#00dbde'],
    },
    {
        MaTheLoai: 8,
        TenTheLoai: "Lịch sử - Địa lý",
        Hinh: "LichSu.jpg",
        Color: ['#FFF94C','#004FF9'],

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
        Color: ['#fe8c00','#f83600'],
    },
    {
        MaTheLoai: 11,
        TenTheLoai: "Truyen tranh",
        Hinh: "TruyenTranh.jpg",
        Color: ['#FDFC47','#24FE41'],
    }
]