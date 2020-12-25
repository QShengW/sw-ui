import React from 'react';
import classnames from 'classnames';
interface IProps {
  border?: boolean; //	是否显示外边框
}
/**
 * CellGroup 可以为 Cell 提供上下外边框。
 * @param props
 */
const CellGroup: React.FC<IProps> = (props) => {
  const { border, children } = props;
  const classes = classnames('sw-cell-group', {
    'border-top': border,
    'border-topbottom': border,
  });
  return <div className={classes}>{children}</div>;
};
CellGroup.defaultProps = {
  border: true,
};
export default CellGroup;
