import React from 'react';

import classnames from 'classnames';
interface ILoadMoreProps {}
/**
 * Circle 环形进度条
 * 圆环形的进度条组件，支持进度渐变动画。
 * @param props
 */
const Circle: React.FC<ILoadMoreProps> = (props) => {
  const {} = props;
  const classes = classnames('sw-load-more', {});
  return <div className={classes}></div>;
};
Circle.defaultProps = {};
export default Circle;
