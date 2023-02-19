var iconv = require('iconv-lite');
const regexLowwer = /^[a-z]+$/;

const searchRange2 = [
    ['989F', '98FC'], // 対象文字：弌 ～ 傲
    ['9940', '997E'], // 対象文字：僉 ～ 凭
    ['9980', '99FC'], // 対象文字：凰 ～ 咨
    ['9A40', '9A7E'], // 対象文字：咫 ～ 嘸
    ['9A80', '9AFC'], // 対象文字：噫 ～ 奩
    ['9B40', '9B7E'], // 対象文字：奸 ～ 宀
    ['9B80', '9BFC'], // 対象文字：它 ～ 廏
    ['9C40', '9C7E'], // 対象文字：廖 ～ 恠
    ['9C80', '9CFC'], // 対象文字：怙 ～ 戛
    ['9D40', '9D7E'], // 対象文字：戞 ～ 捫
    ['9D80', '9DFC'], // 対象文字：捩 ～ 暼
    ['9E40', '9E7E'], // 対象文字：曄 ～ 桎
    ['9E80', '9EFC'], // 対象文字：梳 ～ 檣
    ['9F40', '9F7E'], // 対象文字：檗 ～ 毯
    ['9F80', '9FFC'], // 対象文字：麾 ～ 滌
    ['E040', 'E07E'], // 対象文字：漾 ～ 烝
    ['E080', 'E0FC'], // 対象文字：烙 ～ 珱
    ['E140', 'E17E'], // 対象文字：瓠 ～ 痿
    ['E180', 'E1FC'], // 対象文字：痼 ～ 磬
    ['E240', 'E27E'], // 対象文字：磧 ～ 窰
    ['E280', 'E2FC'], // 対象文字：窶 ～ 紆
    ['E340', 'E37E'], // 対象文字：紂 ～ 縷
    ['E380', 'E3FC'], // 対象文字：縲 ～ 腋
    ['E440', 'E47E'], // 対象文字：隋 ～ 艤
    ['E480', 'E4FC'], // 対象文字：艢 ～ 蕈
    ['E540', 'E57E'], // 対象文字：蕁 ～ 蛬
    ['E580', 'E5FC'], // 対象文字：蛟 ～ 襞
    ['E640', 'E67E'], // 対象文字：襦 ～ 諧
    ['E680', 'E6FC'], // 対象文字：諤 ～ 蹊
    ['E740', 'E77E'], // 対象文字：蹇 ～ 轜
    ['E780', 'E7FC'], // 対象文字：轢 ～ 錮
    ['E840', 'E87E'], // 対象文字：錙 ～ 閙
    ['E880', 'E8FC'], // 対象文字：閠 ～ 顰
    ['E940', 'E97E'], // 対象文字：顱 ～ 驃
    ['E980', 'E9FC'], // 対象文字：騾 ～ 鵈
    ['EA40', 'EA7E'], // 対象文字：鵝 ～ 黯
    ['EA80', 'EAA4'], // 対象文字：黴 ～ 熙
];
const searchRange1 = [
    ['889F', '88FC'], // 対象文字：亜 ～ 蔭
    ['8940', '897E'], // 対象文字：院 ～ 円
    ['8980', '89FC'], // 対象文字：園 ～ 改
    ['8A40', '8A7E'], // 対象文字：魁 ～ 樫
    ['8A80', '8AFC'], // 対象文字：橿 ～ 棄
    ['8B40', '8B7E'], // 対象文字：機 ～ 救
    ['8B80', '8BFC'], // 対象文字：朽 ～ 屈
    ['8C40', '8C7E'], // 対象文字：掘 ～ 鯨

    ['8C80', '8CFC'], // 対象文字：劇 ～ 向
    ['8D40', '8D7E'], // 対象文字：后 ～ 降
    ['8D80', '8DFC'], // 対象文字：項 ～ 刷
    ['8E40', '8E7E'], // 対象文字：察 ～ 止
    ['8E80', '8EFC'], // 対象文字：死 ～ 周
    ['8F40', '8F7E'], // 対象文字：宗 ～ 淳
    ['8F80', '8FFC'], // 対象文字：準 ～ 飾
    ['9040', '907E'], // 対象文字：拭 ～ 厨

    ['9080', '90FC'], // 対象文字：逗 ～ 線
    ['9140', '917E'], // 対象文字：繊 ～ 掻
    ['9180', '91FC'], // 対象文字：操 ～ 只
    ['9240', '927E'], // 対象文字：叩 ～ 蓄
    ['9280', '92FC'], // 対象文字：逐 ～ 逓
    ['9340', '937E'], // 対象文字：邸 ～ 冬
    ['9380', '93FC'], // 対象文字：凍 ～ 入
    ['9440', '947E'], // 対象文字：如 ～ 梅

    ['9480', '94FC'], // 対象文字：楳 ～ 美
    ['9540', '957E'], // 対象文字：鼻 ～ 敷
    ['9580', '95FC'], // 対象文字：斧 ～ 朋
    ['9640', '967E'], // 対象文字：法 ～ 盆
    ['9680', '96FC'], // 対象文字：摩 ～ 癒
    ['9740', '977E'], // 対象文字：諭 ～ 欲
    ['9780', '97FC'], // 対象文字：沃 ～ 聯
    ['9840', '9872'], // 対象文字：蓮 ～ 腕
];
let codeText = ''

// 转大写数组
function ToShift_JIS (val) {
    const jisArr = [];
    val.split('').map(item => {
        if (regexLowwer.test(item)) {
            jisArr.push(item.toUpperCase());
        } else {
            jisArr.push(item);
        }
    });
    return jisArr;
}

function compare (val1, val2) {
    const len1 = val1.length;
    const len2 = val2.length;
    const lim = Math.min(len1, len2);
    let k = 0;
    while (k < lim) {
        const c1 = val1[k];
        const c2 = val2[k];
        if (c1 !== c2) {
            return c1.charCodeAt(0) - c2.charCodeAt(0);
        }
        k++;
    }
    return len1 - len2;
}
function isKanjisRange (val, allowArray) {
    const rangeItem = allowArray && allowArray.length > 0 ? allowArray : [...searchRange2, ...searchRange1];
    const upVal = ToShift_JIS(val);
    for (let i = 0; i < rangeItem.length; i++) {
        const arr = rangeItem[i];
        if (arr.length === 2) {
            if (
                (compare(upVal, arr[0]) >= 0) &&
                (compare(upVal, arr[1]) <= 0)
            ) {
                return true;
            }
        } else {
            if (arr.includes(upVal)) {
                return true;
            }
        }
    }
    console.log(`error character:${codeText}: ${upVal}`);
    return false;
}

// val 是输入值
// allowArray 校验范围
// bool: 判断是否开启罗马数字校验，默认false
function ToShiftJISRight (val, allowArray) {
    if (val && typeof val === 'string' && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
            const code = iconv.encode(val[i], 'shiftjis').toString('hex');
            codeText = val[i]
            if (isKanjisRange(code, allowArray)) continue;
            return false;
        }
        return true;
    }
    return false;
}

export default ToShiftJISRight;
