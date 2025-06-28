const pinyinIndex = 95;
const pinyinMaxIndex = 1860;
const ignoreMinPage = 5;
const ignoreMaxPage = 1895;
const totalImages = 1897; // Total number of images
let currentImageIndex = pinyinIndex; // Initial image index

// 拼音小写：āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜêê̄ếê̌ềm̄ḿm̀ńňǹẑĉŝŋ
// 拼音大写：ĀÁǍÀŌÓǑÒĒÉĚÈĪÍǏÌŪÚǓÙÜǕǗǙǛÊÊ̄ẾÊ̌ỀM̄ḾM̀ŃŇǸẐĈŜŊ

const PINYIN_MAP = {
    ā: "a", á: "a", ǎ: "a", à: "a",
    ō: "o", ó: "o", ǒ: "o", ò: "o",
    ē: "e", é: "e", ě: "e", è: "e",
    ī: "i", í: "i", ǐ: "i", ì: "i",
    ū: "u", ú: "u", ǔ: "u", ù: "u",
    ǖ: "ü", ǘ: "ü", ǚ: "ü", ǜ: "ü", v: "ü",
    ê̄: "ê", ế: "ê", ê̌: "ê", ề: "ê",
    m̄: "m", ḿ: "m", m̀: "m",
    ń: "n", ň: "n", ǹ: "n",
    ẑ: "zh", ĉ: "zh", ŝ: "zh",
    ŋ: "ng"
}

const fileMapping = {
    TOC: 'data/toc.json',
    PINYIN: 'data/pinyin-full.json',
    CHARS: 'data/chars.json',
    WORDS: 'data/words.json',
};

const dictData = {};
const pinyinKeys = Object.keys(PINYIN_MAP).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const regExp = new RegExp(pinyinKeys, 'gi');

async function loadJSONFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`加载失败: ${filePath} (状态码 ${response.status})`);
        }
        return await response.json();
    } catch (error) {
        console.error(`加载文件出错: ${filePath}`, error);
        return null;
    }
}

async function initializeDictData() {
    for (const key in fileMapping) {
        const filePath = fileMapping[key];
        console.log('loading', key, filePath);
        const data = await loadJSONFile(filePath);
        if (data) {
            dictData[key] = data;
        }
    }
}

function replacePinyin(str) {
    // 删除声调
    return str.replace(regExp, match => PINYIN_MAP[match]);
}

function sanitizePinyin(str, more) {
    const fixStr = str
        .toLowerCase().trim()
        .replace(/v/g, 'ü')
        .replace(/•/g, '·')
    if (more) {
        const out = replacePinyin(fixStr.replace(/[*·]+|[0-9]+$/g, ''))
        return out == "ei" ? "ê" : out;
    }
    return fixStr
}

function isNumeric(str) {
    if (typeof str !== 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function pad(num, totalLength) {
    return num.toString().padStart(totalLength, "0");
}

function searchImage() {
    // 支持拼音，拼音+数字，拼音+声调，关键词（加*区别），页码，单个汉字
    const dictKeys = ['PINYIN', 'CHARS', "WORDS"]; // 优先查询
    const searchInput = document.getElementById("searchInput").value.trim();
    let pageNumber = null;
    let extraPages = null;
    if (isNumeric(searchInput)) {
        pageNumber = parseInt(searchInput) + pinyinIndex - 1;
        if (pageNumber < pinyinIndex || pageNumber > pinyinMaxIndex) {
            pageNumber = null;
        }
    } else {
        const pinyin_tone = sanitizePinyin(searchInput, false);
        // console.log(pinyin_tone)
        for (const key of dictKeys) {
            if (dictData[key] && dictData[key][pinyin_tone]) {
                const result = dictData[key][pinyin_tone];
                // console.log(key, result)
                pageNumber = result
                if (Array.isArray(result)) {
                    pageNumber = result[0];
                    if (result.length > 1) {
                        extraPages = result;
                    }
                }
                pageNumber += pinyinIndex - 1;
                break
            }
        }
        if (!pageNumber) {
            const pinyin = sanitizePinyin(pinyin_tone, true);
            for (const key in fileMapping) {
                if (dictKeys.includes(key) || !dictData[key]) {
                    continue
                }
                const result2 = dictData[key][pinyin];
                // console.log(key, result2)
                if (result2) {
                    pageNumber = result2;
                    break
                }
            }
        }
    }

    if (pageNumber && pageNumber >= 1 && pageNumber <= totalImages) {
        document.getElementById("search-result").innerHTML = "";
        if (extraPages) {
            document.getElementById("search-result").innerHTML = `“${searchInput}”相关页面：${extraPages.join(", ")}`
        }
        currentImageIndex = pageNumber;
        showImage();
    } else {
        document.getElementById("search-result").innerHTML = `检索的拼音（及声调）、正文页码（1～1766）或关键词无效，请重新输入!`;
        // alert("请输入一个有效的拼音或正文页码!");
    }
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
    // currentImageIndex = max(min(currentImageIndex, currentImageIndex), totalImages)
    if (currentImageIndex < 1) {
        currentImageIndex = 1;
    } else if (currentImageIndex > totalImages) {
        currentImageIndex = totalImages;
    }
    showImage();
}

async function setupBookmarks(bookmarksList) {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    // 侧边栏导航
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
    const bookmarkData = []
    const groupedBookmarks = {};
    const singleBookmarks = [];
    const toc = dictData.TOC;

    Object.entries(toc).forEach(([name, page]) => {
        bookmarkData.push({
            name: name,
            page: page
        });
    });

    bookmarksList.innerHTML = "";
    bookmarkData.forEach(bookmark => {
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
    // 侧边栏
    sidebarToggle.addEventListener('click', toggleSidebar);
}

document.addEventListener('DOMContentLoaded', async function () {
    const bookmarksList = document.getElementById('bookmarksList');
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const container = document.querySelector(".result-container");

    function showButtons() {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }

    function hideButtons() {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    // 默认页面
    showImage();

    bookmarksList.innerHTML = '加载目录中……';

    // 鼠标点击翻页
    container.addEventListener("mouseenter", showButtons);
    container.addEventListener("mouseleave", hideButtons);

    // 键盘点击查询
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchImage();
        }
    });

    try {
        // Load data and initialize bookmarks
        await initializeDictData();
        await setupBookmarks(bookmarksList);
    } catch (error) {
        console.error('Error initializing bookmarks:', error);
        bookmarksList.innerHTML = '加载目录失败，请刷新重试';
    }
});
