const pinyinIndex = 95;
const pinyinMaxIndex = 1854;
const ignoreMinPage = 5;
const ignoreMaxPage = 1895;
const totalImages = 1897; // Total number of images
let currentImageIndex = pinyinIndex; // Initial image index

const BOOKMARKS = [
    { name: "封面", page: 1 },
    { name: "书脊", page: 2 },
    { name: "部首目录", page: 3 },
    { name: "书名题签", page: 4 },
    { name: "扉页", page: 5 },
    { name: "审订委员会", page: 8 },
    { name: "编纂、修订工作人员", page: 9 },
    { name: "第7版说明", page: 11 },
    { name: "第1版前言", page: 12 },
    { name: "第2版说明", page: 14 },
    { name: "第4版说明", page: 15 },
    { name: "第5版说明", page: 16 },
    { name: "第6版说明", page: 18 },
    { name: "目录", page: 21 },
    { name: "凡例", page: 22 },
    { name: "音节表", page: 26 },
    { name: "新旧字形对照表", page: 32 },
    { name: "部首检字表", page: 33 },
    { name: "检字表", page: 35 },
    { name: "难检字笔画索引", page: 76 },
    { name: "A", page: 95 },
    { name: "a", page: 95 },
    { name: "ai", page: 96 },
    { name: "an", page: 100 },
    { name: "ang", page: 106 },
    { name: "ao", page: 107 },
    { name: "B", page: 110 },
    { name: "ba", page: 110 },
    { name: "bai", page: 116 },
    { name: "ban", page: 126 },
    { name: "bang", page: 133 },
    { name: "bao", page: 135 },
    { name: "bei", page: 146 },
    { name: "ben", page: 154 },
    { name: "beng", page: 157 },
    { name: "bi", page: 159 },
    { name: "bian", page: 169 },
    { name: "biao", page: 178 },
    { name: "bie", page: 182 },
    { name: "bin", page: 184 },
    { name: "bing", page: 185 },
    { name: "bo", page: 190 },
    { name: "bu", page: 197 },
    { name: "C", page: 211 },
    { name: "ca", page: 211 },
    { name: "cai", page: 211 },
    { name: "can", page: 216 },
    { name: "cang", page: 220 },
    { name: "cao", page: 222 },
    { name: "ce", page: 225 },
    { name: "cen", page: 226 },
    { name: "ceng", page: 226 },
    { name: "cha", page: 229 },
    { name: "chai", page: 234 },
    { name: "chan", page: 234 },
    { name: "chang", page: 238 },
    { name: "chao", page: 245 },
    { name: "che", page: 249 },
    { name: "chen", page: 252 },
    { name: "cheng", page: 257 },
    { name: "chi", page: 265 },
    { name: "chong", page: 272 },
    { name: "chou", page: 277 },
    { name: "chu", page: 281 },
    { name: "chua", page: 292 },
    { name: "chuai", page: 292 },
    { name: "chuan", page: 293 },
    { name: "chuang", page: 298 },
    { name: "chui", page: 300 },
    { name: "chun", page: 302 },
    { name: "chuo", page: 305 },
    { name: "ci", page: 305 },
    { name: "cong", page: 311 },
    { name: "cou", page: 313 },
    { name: "cu", page: 314 },
    { name: "cuan", page: 316 },
    { name: "cui", page: 317 },
    { name: "cun", page: 319 },
    { name: "cuo", page: 321 },
    { name: "D", page: 324 },
    { name: "da", page: 324 },
    { name: "dai", page: 342 },
    { name: "dan", page: 346 },
    { name: "dang", page: 353 },
    { name: "dao", page: 357 },
    { name: "de", page: 364 },
    { name: "dei", page: 367 },
    { name: "den", page: 367 },
    { name: "deng", page: 367 },
    { name: "di", page: 371 },
    { name: "dia", page: 384 },
    { name: "dian", page: 384 },
    { name: "diao", page: 393 },
    { name: "die", page: 396 },
    { name: "ding", page: 398 },
    { name: "diu", page: 403 },
    { name: "dong", page: 404 },
    { name: "dou", page: 409 },
    { name: "du", page: 413 },
    { name: "duan", page: 419 },
    { name: "dui", page: 422 },
    { name: "dun", page: 426 },
    { name: "duo", page: 428 },
    { name: "E", page: 433 },
    { name: "e", page: 433 },
    { name: "ê", page: 437 },
    { name: "en", page: 437 },
    { name: "eng", page: 437 },
    { name: "er", page: 437 },
    { name: "F", page: 443 },
    { name: "fa", page: 443 },
    { name: "fan", page: 450 },
    { name: "fang", page: 460 },
    { name: "fei", page: 468 },
    { name: "fen", page: 474 },
    { name: "feng", page: 481 },
    { name: "fo", page: 490 },
    { name: "fou", page: 491 },
    { name: "fu", page: 491 },
    { name: "G", page: 509 },
    { name: "ga", page: 509 },
    { name: "gai", page: 510 },
    { name: "gan", page: 513 },
    { name: "gang", page: 520 },
    { name: "gao", page: 524 },
    { name: "ge", page: 531 },
    { name: "gei", page: 537 },
    { name: "gen", page: 538 },
    { name: "geng", page: 539 },
    { name: "gong", page: 541 },
    { name: "gou", page: 553 },
    { name: "gu", page: 557 },
    { name: "gua", page: 567 },
    { name: "guai", page: 571 },
    { name: "guan", page: 571 },
    { name: "guang", page: 578 },
    { name: "gui", page: 583 },
    { name: "gun", page: 588 },
    { name: "guo", page: 589 },
    { name: "H", page: 599 },
    { name: "ha", page: 599 },
    { name: "hai", page: 600 },
    { name: "han", page: 604 },
    { name: "hang", page: 609 },
    { name: "hao", page: 611 },
    { name: "he", page: 617 },
    { name: "hei", page: 625 },
    { name: "hen", page: 628 },
    { name: "heng", page: 629 },
    { name: "hm", page: 631 },
    { name: "hng", page: 631 },
    { name: "hong", page: 667 },
    { name: "hou", page: 637 },
    { name: "hu", page: 641 },
    { name: "hua", page: 649 },
    { name: "huai", page: 659 },
    { name: "huan", page: 660 },
    { name: "huang", page: 665 },
    { name: "hui", page: 671 },
    { name: "hun", page: 681 },
    { name: "huo", page: 683 },
    { name: "J", page: 692 },
    { name: "ji", page: 692 },
    { name: "jia", page: 715 },
    { name: "jian", page: 724 },
    { name: "jiang", page: 738 },
    { name: "jiao", page: 742 },
    { name: "jie", page: 754 },
    { name: "jin", page: 767 },
    { name: "jing", page: 778 },
    { name: "jiong", page: 790 },
    { name: "jiu", page: 790 },
    { name: "ju", page: 796 },
    { name: "juan", page: 803 },
    { name: "jue", page: 805 },
    { name: "jun", page: 810 },
    { name: "K", page: 814 },
    { name: "ka", page: 814 },
    { name: "kai", page: 815 },
    { name: "kan", page: 821 },
    { name: "kang", page: 824 },
    { name: "kao", page: 826 },
    { name: "ke", page: 828 },
    { name: "kei", page: 836 },
    { name: "ken", page: 837 },
    { name: "keng", page: 837 },
    { name: "kong", page: 841 },
    { name: "kou", page: 843 },
    { name: "ku", page: 846 },
    { name: "kua", page: 849 },
    { name: "kuai", page: 850 },
    { name: "kuan", page: 852 },
    { name: "kuang", page: 854 },
    { name: "kui", page: 854 },
    { name: "kun", page: 859 },
    { name: "kuo", page: 860 },
    { name: "L", page: 862 },
    { name: "la", page: 862 },
    { name: "lai", page: 866 },
    { name: "lan", page: 868 },
    { name: "lang", page: 871 },
    { name: "lao", page: 873 },
    { name: "le", page: 881 },
    { name: "lei", page: 883 },
    { name: "leng", page: 886 },
    { name: "li", page: 889 },
    { name: "lia", page: 901 },
    { name: "lian", page: 905 },
    { name: "liang", page: 907 },
    { name: "liao", page: 913 },
    { name: "lie", page: 916 },
    { name: "lin", page: 918 },
    { name: "ling", page: 921 },
    { name: "liu", page: 928 },
    { name: "long", page: 934 },
    { name: "lou", page: 937 },
    { name: "lu", page: 940 },
    { name: "lü", page: 945 },
    { name: "luan", page: 949 },
    { name: "lüe", page: 950 },
    { name: "lun", page: 951 },
    { name: "luo", page: 953 },
    { name: "M", page: 959 },
    { name: "ma", page: 959 },
    { name: "mai", page: 964 },
    { name: "man", page: 967 },
    { name: "mang", page: 971 },
    { name: "mao", page: 973 },
    { name: "me", page: 978 },
    { name: "mei", page: 978 },
    { name: "men", page: 984 },
    { name: "meng", page: 987 },
    { name: "mi", page: 990 },
    { name: "mian", page: 995 },
    { name: "miao", page: 999 },
    { name: "mie", page: 1001 },
    { name: "min", page: 1002 },
    { name: "ming", page: 1005 },
    { name: "miu", page: 1011 },
    { name: "mo", page: 1011 },
    { name: "mou", page: 1018 },
    { name: "mu", page: 1019 },
    { name: "N", page: 1025 },
    { name: "na", page: 1025 },
    { name: "nai", page: 1028 },
    { name: "nan", page: 1029 },
    { name: "nang", page: 1033 },
    { name: "nao", page: 1034 },
    { name: "ne", page: 1037 },
    { name: "nei", page: 1037 },
    { name: "neng", page: 1040 },
    { name: "ni", page: 1041 },
    { name: "nian", page: 1045 },
    { name: "niang", page: 1048 },
    { name: "niao", page: 1049 },
    { name: "nie", page: 1050 },
    { name: "nin", page: 1051 },
    { name: "ning", page: 1051 },
    { name: "niu", page: 1052 },
    { name: "nong", page: 1054 },
    { name: "nou", page: 1056 },
    { name: "nu", page: 1056 },
    { name: "nü", page: 1058 },
    { name: "nuan", page: 1058 },
    { name: "nüe", page: 1059 },
    { name: "nun", page: 1059 },
    { name: "nuo", page: 1059 },
    { name: "O", page: 1061 },
    { name: "o", page: 1061 },
    { name: "ou", page: 1061 },
    { name: "P", page: 1064 },
    { name: "pa", page: 1064 },
    { name: "pai", page: 1059 },
    { name: "pan", page: 1069 },
    { name: "pang", page: 1072 },
    { name: "pao", page: 1074 },
    { name: "pei", page: 1077 },
    { name: "pen", page: 1080 },
    { name: "peng", page: 1081 },
    { name: "pi", page: 1083 },
    { name: "pian", page: 1090 },
    { name: "piao", page: 1092 },
    { name: "pie", page: 1096 },
    { name: "pin", page: 1096 },
    { name: "ping", page: 1099 },
    { name: "po", page: 1105 },
    { name: "pou", page: 1108 },
    { name: "pu", page: 1109 },
    { name: "Q", page: 1114 },
    { name: "qi", page: 1114 },
    { name: "qia", page: 1129 },
    { name: "qian", page: 1130 },
    { name: "qiang", page: 1140 },
    { name: "qiao", page: 1145 },
    { name: "qie", page: 1148 },
    { name: "qin", page: 1150 },
    { name: "qing", page: 1154 },
    { name: "qiong", page: 1165 },
    { name: "qiu", page: 1166 },
    { name: "qu", page: 1169 },
    { name: "quan", page: 1175 },
    { name: "que", page: 1180 },
    { name: "qun", page: 1182 },
    { name: "R", page: 1184 },
    { name: "ran", page: 1184 },
    { name: "rang", page: 1185 },
    { name: "rao", page: 1186 },
    { name: "re", page: 1187 },
    { name: "ren", page: 1190 },
    { name: "ri", page: 1197 },
    { name: "rong", page: 1199 },
    { name: "rou", page: 1202 },
    { name: "ru", page: 1203 },
    { name: "rua", page: 1208 },
    { name: "ruan", page: 1208 },
    { name: "rui", page: 1210 },
    { name: "run", page: 1211 },
    { name: "ruo", page: 1211 },
    { name: "S", page: 1213 },
    { name: "sa", page: 1213 },
    { name: "sai", page: 1214 },
    { name: "san", page: 1215 },
    { name: "sang", page: 1220 },
    { name: "sao", page: 1221 },
    { name: "se", page: 1223 },
    { name: "sen", page: 1224 },
    { name: "seng", page: 1224 },
    { name: "sha", page: 1224 },
    { name: "shai", page: 1228 },
    { name: "shan", page: 1229 },
    { name: "shang", page: 1234 },
    { name: "shao", page: 1242 },
    { name: "she", page: 1245 },
    { name: "shei", page: 1251 },
    { name: "shen", page: 1251 },
    { name: "sheng", page: 1259 },
    { name: "shi", page: 1269 },
    { name: "shou", page: 1293 },
    { name: "shu", page: 1303 },
    { name: "shua", page: 1313 },
    { name: "shuai", page: 1314 },
    { name: "shuan", page: 1316 },
    { name: "shuang", page: 1316 },
    { name: "shui", page: 1318 },
    { name: "shun", page: 1324 },
    { name: "shuo", page: 1326 },
    { name: "si", page: 1328 },
    { name: "song", page: 1336 },
    { name: "sou", page: 1339 },
    { name: "su", page: 1340 },
    { name: "suan", page: 1344 },
    { name: "sui", page: 1346 },
    { name: "sun", page: 1348 },
    { name: "suo", page: 1350 },
    { name: "T", page: 1353 },
    { name: "ta", page: 1353 },
    { name: "tai", page: 1355 },
    { name: "tan", page: 1360 },
    { name: "tang", page: 1366 },
    { name: "tao", page: 1370 },
    { name: "te", page: 1374 },
    { name: "tei", page: 1376 },
    { name: "teng", page: 1377 },
    { name: "ti", page: 1377 },
    { name: "tian", page: 1384 },
    { name: "tiao", page: 1392 },
    { name: "tie", page: 1396 },
    { name: "ting", page: 1399 },
    { name: "tong", page: 1402 },
    { name: "tou", page: 1412 },
    { name: "tu", page: 1417 },
    { name: "tuan", page: 1422 },
    { name: "tui", page: 1424 },
    { name: "tun", page: 1427 },
    { name: "tuo", page: 1428 },
    { name: "W", page: 1434 },
    { name: "wa", page: 1434 },
    { name: "wai", page: 1435 },
    { name: "wan", page: 1440 },
    { name: "wang", page: 1446 },
    { name: "wei", page: 1451 },
    { name: "wen", page: 1463 },
    { name: "weng", page: 1470 },
    { name: "wo", page: 1471 },
    { name: "wu", page: 1472 },
    { name: "X", page: 1490 },
    { name: "xi", page: 1490 },
    { name: "xia", page: 1503 },
    { name: "xian", page: 1513 },
    { name: "xiang", page: 1520 },
    { name: "xiao", page: 1529 },
    { name: "xie", page: 1541 },
    { name: "xin", page: 1547 },
    { name: "xing", page: 1556 },
    { name: "xiong", page: 1564 },
    { name: "xiu", page: 1567 },
    { name: "xu", page: 1571 },
    { name: "xuan", page: 1576 },
    { name: "xue", page: 1581 },
    { name: "xun", page: 1586 },
    { name: "Y", page: 1591 },
    { name: "ya", page: 1591 },
    { name: "yan", page: 1596 },
    { name: "yang", page: 1608 },
    { name: "yao", page: 1614 },
    { name: "ye", page: 1621 },
    { name: "yi", page: 1625 },
    { name: "yin", page: 1652 },
    { name: "ying", page: 1663 },
    { name: "yo", page: 1671 },
    { name: "yong", page: 1671 },
    { name: "you", page: 1674 },
    { name: "yu", page: 1688 },
    { name: "yuan", page: 1701 },
    { name: "yue", page: 1710 },
    { name: "yun", page: 1714 },
    { name: "Z", page: 1720 },
    { name: "za", page: 1720 },
    { name: "zai", page: 1721 },
    { name: "zan", page: 1724 },
    { name: "zang", page: 1726 },
    { name: "zao", page: 1727 },
    { name: "ze", page: 1730 },
    { name: "zei", page: 1732 },
    { name: "zeng", page: 1732 },
    { name: "zha", page: 1734 },
    { name: "zhai", page: 1736 },
    { name: "zhan", page: 1738 },
    { name: "zhang", page: 1743 },
    { name: "zhao", page: 1747 },
    { name: "zhe", page: 1751 },
    { name: "zhei", page: 1755 },
    { name: "zhen", page: 1755 },
    { name: "zheng", page: 1761 },
    { name: "zhi", page: 1769 },
    { name: "zhong", page: 1787 },
    { name: "zhou", page: 1798 },
    { name: "zhu", page: 1801 },
    { name: "zhua", page: 1811 },
    { name: "zhuai", page: 1812 },
    { name: "zhuan", page: 1812 },
    { name: "zhuang", page: 1817 },
    { name: "zhui", page: 1820 },
    { name: "zhun", page: 1822 },
    { name: "zhuo", page: 1823 },
    { name: "zi", page: 1825 },
    { name: "zong", page: 1836 },
    { name: "zou", page: 1840 },
    { name: "zu", page: 1842 },
    { name: "zuan", page: 1845 },
    { name: "zui", page: 1846 },
    { name: "zun", page: 1848 },
    { name: "zuo", page: 1848 },
    { name: "西文字母开头的词语", page: 1855 },
    { name: "附录", page: 1861 },
    { name: "我国历代纪元表", page: 1863 },
    { name: "计量单位表", page: 1880 },
    { name: "汉字偏旁名称表", page: 1888 },
    { name: "汉语拼音方案", page: 1891 },
    { name: "元素周期表", page: 1894 },
    { name: "版权页", page: 1895 },
    { name: "中国地图", page: 1896 },
    { name: "封底", page: 1897 },
];

function sanitizePinyin(str) {
    const str2 = str
        .toLowerCase()                      // 转小写
        .replace(/\s+$/g, '')               // 去除结尾空格
        .replace(/[0-9]+$/g, '')            // 去除结尾数字
    if (str2 == "ei") {
        return "ê";
    }
    return str2.normalize('NFKD')
        .replace(/[\u0300-\u036F]/g, '')  // 移除声调符号
        .replace(/v/g, 'ü')       // 把 v 换成 ü
}

function isNumeric(str) {
    if (typeof str !== 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function pad(num, totalLength) {
    return num.toString().padStart(totalLength, "0");
}

function searchImage() {
    const searchInput = document.getElementById("searchInput").value;
    let pageNumber = 0;
    if (isNumeric(searchInput)) {
        pageNumber = parseInt(searchInput) + pinyinIndex - 1;
        if (pageNumber < pinyinIndex || pageNumber > pinyinMaxIndex) {
            pageNumber = null;
        }
    } else {
        const pinyin = sanitizePinyin(searchInput);
        pageNumber = getPageNumberByName(pinyin);
    }

    if (pageNumber !== null && pageNumber > 0 && pageNumber <= totalImages) {
        document.getElementById("search-result").innerHTML = "";
        currentImageIndex = pageNumber;
        showImage();
    } else {
        document.getElementById("search-result").innerHTML = "检索的拼音或正文页码无效，请重新输入!";
        // alert("请输入一个有效的拼音或正文页码!");
    }
}

function getPageNumberByName(name) {
    const result = BOOKMARKS.find(item => item.name === name);
    return result ? result.page : null;
}

function showImage() {
    const isExtra = currentImageIndex < ignoreMinPage || currentImageIndex >= ignoreMaxPage;
    const imageDir = isExtra ? "images-extra" : "images";
    const imageSuffix = isExtra ? "webp" : "png";
    const imageName = pad(currentImageIndex, 4);
    document.getElementById("main-image").src = `${imageDir}/${imageName}.${imageSuffix}`;
}

function changeImage(offset) {
    currentImageIndex += offset;
    if (currentImageIndex < 1) {
        currentImageIndex = 1;
    } else if (currentImageIndex > totalImages) {
        currentImageIndex = totalImages;
    }
    showImage();
}

// 键盘事件
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchImage();
    }
});

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showButtons() {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
}

function hideButtons() {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
}

// 使用一个容器统一监听 hover，避免多个元素反复触发
const container = document.querySelector(".result-container");
container.addEventListener("mouseenter", showButtons);
container.addEventListener("mouseleave", hideButtons);

document.addEventListener('DOMContentLoaded', function () {
    // 默认页面
    showImage()
});

// 侧边栏导航
document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const bookmarksList = document.getElementById('bookmarksList');

    const groupedBookmarks = {};
    const singleBookmarks = [];
    const showNames = [
        "封面",
        "扉页",
        "第7版说明",
        "目录",
        "音节表",
        "部首检字表",
        "检字表",
        "难检字笔画索引",
        "西文字母开头的词语",
        "附录",
        "汉语拼音方案",
        "封底",
    ]

    BOOKMARKS.forEach(bookmark => {
        // Check if the name is a single character (Chinese character or letter)
        const name = bookmark.name;
        if (showNames.includes(name)) {
            singleBookmarks.push(bookmark)
        }
        else if (/^[a-zA-Züê]+$/.test(name)) {
            const firstChar = name == "ê" ? "e" : name.charAt(0).toLowerCase();
            if (!groupedBookmarks[firstChar]) {
                groupedBookmarks[firstChar] = [];
            }
            groupedBookmarks[firstChar].push(bookmark);
        }
    });

    // Add single character bookmarks
    singleBookmarks.forEach(bookmark => {
        const bookmarkElement = createBookmarkElement(bookmark, false);
        bookmarksList.appendChild(bookmarkElement);
    });
    // Create collapsible groups for multi-character bookmarks
    Object.entries(groupedBookmarks).sort().forEach(([group, bookmarks]) => {
        const groupElement = document.createElement('div');
        groupElement.className = 'bookmark-group';

        const groupHeader = document.createElement('div');
        groupHeader.className = 'bookmark-group-header';
        groupHeader.innerHTML = `<span>${group.toUpperCase()}</span>`;

        const groupContent = document.createElement('div');
        groupContent.className = 'bookmark-group-content';

        bookmarks.forEach(bookmark => {
            const bookmarkElement = createBookmarkElement(bookmark, true);
            groupContent.appendChild(bookmarkElement);
        });

        groupHeader.addEventListener('click', () => {
            groupElement.classList.toggle('expanded');
            const icon = groupHeader.querySelector('i');
            icon.style.transform = groupElement.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0)';
        });

        groupElement.appendChild(groupHeader);
        groupElement.appendChild(groupContent);
        bookmarksList.appendChild(groupElement);
    });

    // Create bookmark element
    function createBookmarkElement(bookmark, isPinyin) {
        const bookmarkElement = document.createElement('div');
        const actualPage = bookmark.page - pinyinIndex + 1;
        bookmarkElement.className = 'bookmark-item';
        bookmarkElement.innerHTML = `<span>${bookmark.name}</span>`;
        if (isPinyin) {
            bookmarkElement.innerHTML += `<span class="page-number">第 ${actualPage} 页</span>`;
        }
        bookmarkElement.onclick = (e) => {
            if (e.target.closest('.bookmark-group-header')) return;
            currentImageIndex = bookmark.page;
            showImage();
            closeSidebarHandler();
        };
        return bookmarkElement;
    }

    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';

        if (!sidebar.classList.contains('active')) {
            document.querySelectorAll('.bookmark-group').forEach(group => {
                group.classList.remove('expanded');
            });
        }
    }

    function closeSidebarHandler() {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
        document.body.style.overflow = '';

        // Close all groups
        document.querySelectorAll('.bookmark-group').forEach(group => {
            group.classList.remove('expanded');
        });
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
});
