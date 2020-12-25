import React, { useEffect, CSSProperties } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Portal from '../Portal';
import { BaseOverlayPopupProps } from '../../Types';

interface IOverlayProps {
  bgOpacity?: number; //遮罩层透明度
  className?: string; //自定义样式class
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; //点击遮罩回调函数
  backgroundColor?: string; //自定义遮罩层 背景 rgb格式
}
export type IBaseOverlayProps = IOverlayProps & BaseOverlayPopupProps;
/**
 * Overlay 组件
 * @param props BaseOverlayProps
 */
const Overlay: React.FC<IBaseOverlayProps> = (props) => {
  const {
    show,
    zIndex,
    onClick,
    children,
    bgOpacity,
    className,
    lockScroll,
    getContainer,
    overlayClose,
    backgroundColor,
  } = props;
  const firstRenderRef = React.useRef(false);
  const classes = classnames('sw-overlay', className);
  const showStyle: CSSProperties = {};
  const duration = 300;
  if (show) {
    showStyle.backgroundColor = backgroundColor
      ? backgroundColor
      : `rgba(0, 0, 0, ${bgOpacity})`;
  }

  useEffect(() => {
    // other code
    let bodyStyle = document.body.style;
    if (show && lockScroll) {
      bodyStyle.overflow = 'hidden';
    } else if (!show && lockScroll) {
      bodyStyle.overflow = '';
    }
    return () => {
      bodyStyle.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  if (!firstRenderRef.current && !show) return null;

  if (!firstRenderRef.current) {
    firstRenderRef.current = true;
  }
  return (
    <Portal getContainer={getContainer}>
      {/* CSSTransiton 标签包裹的div会被加上相应的动画
      in 为控制动画开启关闭的“开关”，true为开启，false为关闭
      classNames 为对应的样式类名，和下面的css内的名字对应
      timeout 为动画执行时间
      unmountOnExit 当动画效果为隐藏时，该标签会从dom树上移除，类似js操作
      appear 是否第一次加载该组件时启用相应的动画渲染，css文件中有含有appear的均和此标签相关
      onEntered 入场动画结束时触发的钩子
      还有一些相应的钩子在此未做展示：onEnter(入场动画第一帧时执行)、onEntering(当入场动画执行到第二帧时执行)、onExit(出场动画第一帧时执行)、onExiting(出场动画第二帧时执行)、onExited(整个动画出场结束时执行) */}
      <CSSTransition
        in={show}
        timeout={duration}
        classNames='sw-overlay'
        appear
      >
        <div
          className={classes}
          style={{
            zIndex,
            ...showStyle,
            transition: `${duration}ms`,
          }}
          onClick={(e) => {
            if (overlayClose) {
              e.stopPropagation();
              show && onClick && onClick(e);
            }
          }}
        >
          {children}
          {/* 
            children-over ...
            解决 子组件多次点击造成一直在显示隐藏 有更好的解决办法吗 谢谢 
          */}
          {!show && <div className='children-over' />}
        </div>
      </CSSTransition>
    </Portal>
  );
};

Overlay.defaultProps = {
  show: false,
  zIndex: 1,
  bgOpacity: 0.7,
  lockScroll: true,
  overlayClose: true,
};
export default Overlay;
