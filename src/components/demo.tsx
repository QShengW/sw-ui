import React from 'react';

import classnames from 'classnames';
interface IProps {}

const Demo: React.FC<IProps> = (props) => {
  const {} = props;
  const classes = classnames('sw-load-more', {});
  return <div className={classes}></div>;
};
Demo.defaultProps = {};
export default Demo;
