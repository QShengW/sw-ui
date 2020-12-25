import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { scrollTop } from '../../utils/util';
import useScroll from '../../hooks/useScroll';
interface IBackTopProps {
  height?: number; //页面滚动高度达到该值时才显示BackTop组件
  duration?: number; //滚动动画持续时间，单位 毫秒
  zIndex?: number; //层级
  bottom?: number; //距离底部距离
}

/**
 * 返回顶部
 * @param props
 */
const BackTop: React.FC<IBackTopProps> = (props) => {
  const { height, zIndex, duration, bottom } = props;
  const [show, setShow] = useState(false);
  const { pageYOffset } = useScroll();
  const classes = classnames('sw-back-top', {
    'sw-back-top-show': show,
  });
  const back = () => {
    scrollTop(window, 0, duration);
  };
  useEffect(() => {
    if (height && pageYOffset >= height && !show) {
      setShow(true);
    } else if (height && pageYOffset <= height && show) {
      setShow(false);
    }
  }, [height, pageYOffset, show]);
  return (
    <div
      className={classes}
      style={{
        zIndex,
        bottom,
      }}
      onClick={() => back()}
    />
  );
};
BackTop.defaultProps = {
  height: 400,
  zIndex: 999,
  duration: 1000,
  bottom: 100,
};
export default BackTop;
