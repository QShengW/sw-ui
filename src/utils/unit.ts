// const RegPh = /^1[3|4|5|7|8|9][0-9]{9}$/;// 手机号码验证
// const RegNa = /^[a-zA-Z\u4e00-\u9fa5]+$/;// 姓名验证不能带有数字
// const RegNum = /^[0-9]*$/;               // 验证只能输入数字
// const RegNumFl = /^\d+(?=\.{0,1}\d+$|$)/;// 验证只能输入数字 和 浮点数
// const RegChinese = /^[\x01-\x7f]*$/;     // 不能输入中文
const ChineseReg = /^[u4e00-u9fa5]+$/;   // 只能输入中文
// const RegPassWord = /^[_0-9a-z]{6,16}$/; // 密码长度
// const RegEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //验证邮箱d
/**
 * copy vant unit
 * @param val 
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}
export function isNumeric(val: string | number): val is string {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
}

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }
  return isNumeric(value) ? `${value}px` : String(value);
}
/**
 * 判断当前字符串必须是中文
 * @param value 
 * true  是中文
 * false 不是中文
 */
export function isChinese(value: string): boolean {
  return !ChineseReg.test(value);
}

/*** 当前操作的系统平台 ***/
const u = navigator.userAgent;
const nav = window.navigator
const ua = nav.userAgent.toLowerCase();
export const os = {
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  pc: typeof window.orientation === "undefined",
  android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
  wx: () => {
    let ua = nav.userAgent.toLowerCase();
    if (/MicroMessenger/i.test(ua)) return true;
    return false;
  },
  iosx: () => {
    if (typeof window !== 'undefined' && window) {
      return /iphone/gi.test(nav.userAgent) && window.screen.height >= 812;
    }
    return false;
  },
  isMobileQQ: ua.indexOf(' qq') > -1 // true 手机QQ false 不是
};
// var ua = '' + window.navigator.userAgent.toLowerCase()
// var isWeixin = /MicroMessenger/i.test(ua)
// var isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua)
// var myFunction
// var isWXAndIos = (isWeixin && isIos);
// if (isWXAndIos) {
//   document.body.addEventListener('focusin', () => {
//     clearTimeout(myFunction)
//   })
//   document.body.addEventListener('focusout', () => {
//     clearTimeout(myFunction)
//     myFunction = setTimeout(function () {
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'smooth'
//       })
//     }, 200)
//   });
// }
/*** 字符串的金额转换成大写金额 ***/
export const menoyToUppercase = (money: string) => {
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];	 //汉字的数字
  let cnIntRadice = ['', '拾', '佰', '仟']; //基本单位
  let cnIntUnits = ['', '万', '亿', '兆'];  //对应整数部分扩展单位
  let cnDecUnits = ['角', '分', '毫', '厘']; //对应小数部分单位
  let cnInteger = '整';	//整数金额时后面跟的字符			
  let cnIntLast = '元';	//整数完以后的单位
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  let integerNum;	 //金额整数部分
  let decimalNum;	 //金额小数部分
  //输出的中文金额字符串
  let chineseStr = '';
  // let parts;		//分离金额后用的数组，预定义
  if (money === '') { return ''; }
  let newMoney: string | number = parseFloat(money);
  if (newMoney >= maxNum) {
    //超出最大处理数字
    return '超出最大处理数字';
  }
  if (newMoney === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //四舍五入保留两位小数,转换为字符串
  newMoney = Math.round(newMoney * 100).toString();
  integerNum = newMoney.substr(0, newMoney.length - 2);
  decimalNum = newMoney.substr(newMoney.length - 2);
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === '' || /^0*$/.test(decimalNum)) {
    chineseStr += cnInteger;
  }
  return chineseStr;
}
/**
 * 分割二维数组
 * @param arr 
 * @param partitioningNum 
 */
export const ArrayPartitioning = (arr: any[], partitioningNum: number) => {
  const pages: any[] = []
  arr.forEach((item, index) => {
    const page = Math.floor(index / partitioningNum)
    if (!pages[page]) {
      pages[page] = []
    }
    console.log(pages, index)
    pages[page].push(item)
  })
  return pages
}

