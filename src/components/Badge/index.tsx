import React from 'react';
import classnames from 'classnames';
import { isDef, isNumeric } from '../../utils/unit';
/**
 * 颜色类型
 */
export type BadgeType =
  | 'primary'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
interface IBadgeProps {
  dot?: boolean; //通过 dot 来显示小红点。
  max?: number | string;
  text?: number | string;
  color?: string;
  type?: BadgeType; // 按钮 主题色
  children: React.ReactNode;
}
/**
 * 徽标
 * 在右上角展示徽标数字或小红点。
 * @param props
 */
const Badge: React.FC<IBadgeProps> = (props) => {
  const { dot, max, text, type, color, children } = props;
  const classes = classnames('sw-badge-view', {
    'sw-badge-dot': dot,
    [`sw-badge-${type}`]: type,
  });
  const styles = (() => {
    const style: React.CSSProperties = {};
    if (color) {
      style.color = color;
    }
    return style;
  })();
  const maxStr = (() => {
    // 小技巧 +text text转换成 number
    if (isDef(max) && isNumeric(text!) && +text > max) {
      return `${max}+`;
    }
  })();
  return (
    <div className={classes} style={styles}>
      {children}
      <div className='sw-badge'>
        <span>{max ? maxStr : text}</span>
      </div>
    </div>
  );
};
Badge.defaultProps = {};
export default Badge;
