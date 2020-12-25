import React, { CSSProperties, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
interface IProps {
  title?: string | number; //	左侧标题
  value?: string; //右侧内容
  input?: (value: string) => void; //右侧内容为input
  slots?: React.ReactNode; //整个右侧内容自定义 不扩展当前内容
  mrZero?: boolean; // marginRight 右侧不要边距 让 border 延伸出去
  isLink?: boolean; //是否展示右侧箭头并开启点击反馈
  onClick?: () => void; // 点击回调
  linkColor?: string; //是否展示右侧箭头颜色
  linkDirection?: 'arrow' | 'arrow-down' | 'arrow-up';
}
/**
 * Partial 可以把包裹的值都指定成可选的
 */
export type CellProps = IProps & Partial<InputHTMLAttributes<HTMLElement>>;
/**
 * 单元格为列表中的单个展示项。
 * @param props
 */
const Cell: React.FC<CellProps> = (props) => {
  const {
    title,
    value,
    input,
    slots,
    mrZero,
    isLink,
    onClick,
    linkColor,
    linkDirection,
    ...restProps
  } = props;
  const classes = classnames('sw-cell', {
    'sw-cell-active': isLink,
  });
  const styles: CSSProperties = {};
  if (mrZero) {
    styles.paddingRight = 15;
  }
  return (
    <div className={classes} onClick={() => onClick && onClick()}>
      <div className='p-l-15' />
      <div className='cell-view border-bottom' style={styles}>
        <div className='cell-title'>{title}</div>
        {slots && <div className='cell-value'>{slots}</div>}
        {!slots && (
          <div className='cell-value'>
            {input && (
              <input
                className='cell-value-input'
                value={value}
                onChange={(e) => input(e.target.value)}
                {...restProps}
              />
            )}
            {!input && <span className='cell-value-span'>{value}</span>}
            {isLink && (
              <Icon name={linkDirection} size={16} color={linkColor} />
            )}
          </div>
        )}
      </div>
      {!mrZero && <div className='p-r-15' />}
    </div>
  );
};
Cell.defaultProps = {
  isLink: false,
  linkColor: '#969799',
  linkDirection: 'arrow',
};
export default Cell;
