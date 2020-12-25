import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
interface ICheckboxProps {
  text?: string | number;
  size?: string | number;
  check?: boolean;
  color?: string;
  slots?: boolean;
  onChange?: (check: boolean) => void;
  labelDisabled?: boolean; //禁用文本点击
}
/**
 * Checkbox 复选框
 * 用于在选中和非选中状态之间进行切换。
 * @param props
 */
const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { text, size, check, color, slots, onChange, labelDisabled } = props;
  const classes = classnames('sw-checkbox', {
    'sw-checkbox-on': check,
  });
  const styles: CSSProperties = {};
  if (color) {
    styles.color = color;
  }
  if (slots) {
    styles.flex = 1;
    styles.display = 'flex';
    styles.justifyContent = 'flex-end';
  }
  return (
    <div
      className={classes}
      onClick={() => onChange && onChange(!check)}
      style={styles}
    >
      <Icon size={size} name={check ? 'checked' : 'circle'} />
      {text && (
        <span
          className='sw-checkbox-label'
          onClick={(e) => labelDisabled && e.stopPropagation()}
        >
          {text}
        </span>
      )}
    </div>
  );
};
Checkbox.defaultProps = {
  check: false,
  slots: false,
  labelDisabled: false,
};
export default Checkbox;
