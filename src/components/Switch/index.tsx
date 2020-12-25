import React, { CSSProperties } from 'react';
import classnames from 'classnames';
interface ISwitchProps {
  active?: boolean; // 开 | 关
  color?: string; //开的颜色
  bgColor?: string; // 关的背景颜色
  disabled?: boolean; // 禁止点击
  onClick?: (
    checked: boolean,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void; // 点击回调方法
}

/**
 * 开关
 * @param props
 */
const Switch: React.FC<ISwitchProps> = (props) => {
  const { active, color, bgColor, disabled, onClick } = props;

  const switchOnColor: CSSProperties = {
    boxShadow: color + ' 0px 0px 0px 16px inset',
    backgroundColor: color,
  };

  const switchOffColor: CSSProperties = {
    boxShadow: bgColor + ' 0px 0px 0px 16px inset',
    backgroundColor: bgColor,
  };

  const styles = active ? switchOnColor : switchOffColor;

  const classes = classnames({
    'switch-on': active,
    'switch-off': !active,
    'switch-disabled': disabled,
  });
  return (
    <div
      className='sw-switch'
      onClick={(event) => {
        if (!disabled && onClick) {
          onClick(!active, event)
        }
      }}
    >
      <span className={classes} style={styles}>
        <span className='slider' />
      </span>
    </div>
  );
};

Switch.defaultProps = {
  color: '#64bd63',
  bgColor: '#95959b',
};
export default Switch;
