import React from 'react';
import classnames from 'classnames';
import { name as nameProps } from './name';
export interface IIconProps {
  name?: nameProps;
  size?: number | string;
  color?: string;
  onClick?: () => void
  classNames?: string,
}
/**
 * Icon 组件
 * @param props
 */
const Icon: React.FC<IIconProps> = (props) => {
  const { name, size, color, onClick, classNames } = props;
  const classes = classnames('iconfont', classNames, {
    [`icon-${name}`]: name,
  });
  return (
    <i
      onClick={() => onClick && onClick()}
      className={classes}
      style={{
        fontSize: size,
        color,
      }}
    />
  );
};
Icon.defaultProps = {
  name: 'smile-o',
};
export default Icon;
