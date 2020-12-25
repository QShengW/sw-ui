import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Overlay from '../Overlay';
import { BaseOverlayPopupProps } from '../../Types';
/**
 * 弹出窗
 * @param props
 */
type positionType = 'left' | 'top' | 'right' | 'bottom';
interface IPopupProps {
  style?: CSSProperties; //样式
  onClose?: () => void; //关闭回调
  round?: boolean; // 边角
  position?: positionType; // 弹出位置
  overlayClass?: string; //遮照层样式
  destroyOnClose?: boolean; //关闭时是否销毁
}
export type IBasePopupProps = IPopupProps & BaseOverlayPopupProps;
const Popup: React.FC<IBasePopupProps> = (props) => {
  const {
    show,
    style,
    round,
    zIndex,
    onClose,
    position,
    children,
    lockScroll,
    overlayClass,
    overlayClose,
    destroyOnClose,
  } = props;

  const classes = classnames('sw-popup', `sw-popup-${position}`);
  let styles: CSSProperties = {};
  if (style) {
    styles = style;
  }
  if (zIndex) {
    styles.zIndex = zIndex + 1;
  }
  if (round) {
    switch (position) {
      case 'top':
        styles.borderRadius = '0 0 12px 12px';
        break;
      case 'right':
        styles.borderRadius = '12px 0 0 12px';
        break;
      case 'bottom':
        styles.borderRadius = '12px 12px 0 0';
        break;
      case 'left':
        styles.borderRadius = '0 12px 12px 0';
        break;
    }
  }
  return (
    <Overlay
      show={show}
      onClick={() => show && onClose && onClose()}
      className={overlayClass}
      zIndex={zIndex}
      lockScroll={lockScroll}
      overlayClose={overlayClose}
    >
      <CSSTransition
        in={show}
        timeout={show ? 0 : 300}
        classNames={classes}
        appear
        unmountOnExit={destroyOnClose}
      >
        <div
          className={classes}
          onClick={(e) => {
            e.preventDefault(); // 修复 Android 上点击穿透
            e.stopPropagation();
          }}
          style={styles}
        >
          {children}
        </div>
      </CSSTransition>
    </Overlay>
  );
};
Popup.defaultProps = {
  position: 'right',
  show: false,
  zIndex: 2022,
  lockScroll: true,
  overlayClose: true,
};

export default Popup;
