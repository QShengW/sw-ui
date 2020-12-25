import React, { useContext, CSSProperties } from 'react';
import classnames from 'classnames';

import { TextContext } from './textAlign';
import { isChinese } from '../../utils/unit';

export interface IItemPorps {
  text: string;
  className?: string;
}
/**
 * 文字对齐 样式
 * 如果需要y个字两端对齐，则为(x-y)/(y-1)
 * @param props
 */
const Item: React.FC<IItemPorps> = (props) => {
  const { text, className } = props;
  const context = useContext(TextContext);
  const styles: CSSProperties = {};
  if (isChinese(text)) {
    const xLen = +context.length; //X字对齐
    const tLen = text.length; //文案长度
    const cResults = (xLen - tLen) / (tLen - 1); //计算结果
    styles.letterSpacing = `${cResults}em`; //样式复制
    styles.marginRight = `-${cResults}em`; //样式复制
  }
  const classes = classnames('sw-text-item', className);
  return (
    <div className={classes} style={styles}>
      {isChinese(text) ? text : '中文才可对齐'}
    </div>
  );
};
Item.displayName = 'TextAlignItem';
export default Item;
