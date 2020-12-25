/**
 * 数据配置
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 */
class NumberPrecision {
  private _boundaryCheckingState = true
  constructor() { }
  /**
   * 把错误的数据转正
   * strip(0.09999999999999998)=0.1
   * num: number
   * void: number
   */
  strip(num: number, precision = 12) {
    return +parseFloat(num.toPrecision(precision));
  }
  /**
   * Return digits length of a number
   * @param {*number} num Input number
   * num: number
   * void: number
   */
  digitLength(num: number) {
    // Get digit length of e
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
    return len > 0 ? len : 0;
  }
  /**
   * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
   * @param {*number} num 输入数
   * num: number
   * void: number
   */
  float2Fixed(num: number) {
    if (num.toString().indexOf('e') === -1) {
      return Number(num.toString().replace('.', ''));
    }
    const dLen = this.digitLength(num);
    return dLen > 0 ? this.strip(num * Math.pow(10, dLen)) : num;
  }
  /**
   * 检测数字是否越界，如果越界给出提示
   * @param {*number} num 输入数
   * num: number
   */
  checkBoundary(num: number) {
    if (this._boundaryCheckingState) {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
      }
    }
  }
  /**
   * 精确乘法
   * num1: number, num2: number, ...others: number[]
   * void: number
   */
  times(num1: number, num2: number, ...others: number[]): number {
    if (others.length > 0) {
      return this.times(this.times(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = this.float2Fixed(num1);
    const num2Changed = this.float2Fixed(num2);
    const baseNum = this.digitLength(num1) + this.digitLength(num2);
    const leftValue = num1Changed * num2Changed;

    this.checkBoundary(leftValue);

    return leftValue / Math.pow(10, baseNum);
  }
  /**
   * 精确加法
   * num1: number, num2: number, ...others: number[]
   * void: number
   */
  plus(num1: number, num2: number, ...others: number[]): number {
    if (others.length > 0) {
      return this.plus(this.plus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
    return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum;
  }
  /**
   * 精确减法
   * num1: number, num2: number, ...others: number[]
   * void: number
   */
  minus(num1: number, num2: number, ...others: number[]): number {
    if (others.length > 0) {
      return this.minus(this.minus(num1, num2), others[0], ...others.slice(1));
    }
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
    return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
  }
  /**
   * 精确除法
   * num1: number, num2: number, ...others: number[]
   * void: number
   */
  divide(num1: number, num2: number, ...others: number[]): number {
    if (others.length > 0) {
      return this.divide(this.divide(num1, num2), others[0], ...others.slice(1));
    }
    const num1Changed = this.float2Fixed(num1);
    const num2Changed = this.float2Fixed(num2);
    this.checkBoundary(num1Changed);
    this.checkBoundary(num2Changed);
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return this.times((num1Changed / num2Changed), this.strip(Math.pow(10, this.digitLength(num2) - this.digitLength(num1))));
  }
  /**
   * 四舍五入
   * num: number, ratio: number
   * void: number
   */
  round(num: number, ratio: number): number {
    const base = Math.pow(10, ratio);
    return this.divide(Math.round(this.times(num, base)), base);
  }
  /**
   * 是否进行边界检查，默认开启
   * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
   */
  enableBoundaryChecking(flag = true) {
    this._boundaryCheckingState = flag;
  }
}

export default NumberPrecision




