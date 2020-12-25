import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";
import Loading, { LoadingType } from "../Loading";
import Icon, { IIconProps } from "../Icon";
/**
 * 大小
 */
export type ButtonSize = "large" | "normal" | "small" | "mini";
/**
 * 类型
 */
export type ButtonType =
  | "primary"
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "link"
  | "info";
/**
 * 方形按钮
 * 圆形按钮
 */
interface BaseButtonProps {
  text?: string | number;
  href?: string;
  size?: ButtonSize;
  icon?: IIconProps;
  plain?: boolean; // 边框按钮
  round?: boolean;
  block?: boolean;
  square?: boolean;
  loading?: boolean;
  btnType?: ButtonType;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  loadingType?: LoadingType;
  loadingText?: string;
}

/**
 * Partial 可以把包裹的值都指定成可选的
 */
export type ButtonProps = BaseButtonProps &
  Partial<
    ButtonHTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLElement>
  >;
/**
 * button组件
 * @param props BaseButtonProps
 */
const Button: React.FC<ButtonProps> = props => {
  const {
    text,
    href,
    size,
    icon,
    plain,
    round,
    block,
    square,
    loading,
    btnType,
    disabled,
    children,
    className,
    loadingType,
    loadingText,
    ...restProps
  } = props;
  const classes = classNames("sw-btn", className, {
    "sw-btn-plain": plain,
    "sw-btn-round": round,
    "sw-btn-block": block,
    "sw-btn-square": square,
    [`sw-btn-${size}`]: size,
    [`sw-btn-${btnType}`]: btnType,
    [`sw-btn-plain-text-${btnType}`]: plain,
    "disabled": btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children ? children : <span>{text}</span>}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {loading && <Loading size={20} type={loadingType} text={loadingText} />}
        {
          icon && <Icon name={icon.name} size={icon.size ? icon.size : 20} color={icon.color} />
        }
        {children && children}
        {text && !loading && (
          <span
            style={{
              marginLeft: loading ? 4 : 0,
            }}
          >
            {text}
          </span>
        )}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: "default",
  size: "normal",
  text: "",
};
export default Button;
