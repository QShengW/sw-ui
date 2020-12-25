/**
 * string
 * number
 */
export type StrNum = string | number
/**
 * Array
 * string
 * number
 */
export type ArrSN = Array<StrNum>
/**
 * Overlay
 * Popup
 * 提取相同的Props
 */
export type BaseOverlayPopupProps = {
  show?: boolean; //显示组件
  zIndex?: number; //z-index 层级
  lockScroll?: boolean; //是否锁定背景滚动，给body加上overflow:hidden。锁定时蒙层里的内容也将无法滚动 基础样式请勿给 html，body 设置 overflow-x: hidden 否则 页面内容会滚动到顶部上
  getContainer?: string; //  Portal挂载点
  overlayClose?: boolean; //是否需要遮罩层点击关闭
}
/**
 * Cascader
 * help.ts
 * 提取相同的Props
 */
export type BaseOptionProps = {
  value: StrNum;
  label: StrNum;
  children: BaseOptionProps[]
  [key: string]: any
}