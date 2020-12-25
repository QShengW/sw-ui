import React, { useState, useRef } from 'react';
import classnames from 'classnames';

interface ITabProps {
  data?: Array<number | string>;
  scrollable?: boolean;
}

/**
 * Tab 组件
 * @param props
 */
const Tab: React.FC<ITabProps> = (props) => {
  const { data, scrollable } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [tyLeft, setTyLeft] = useState(0);
  const classes = classnames('sw-tab-nav', {
    'sw-tab-scrollable': scrollable,
  });
  const node = useRef<HTMLDivElement>(null);
  const nodeView = useRef<HTMLDivElement>(null);
  /**
   * 拖动开始
   * @param e
   */
  function scrollTouchstart(event: React.TouchEvent<HTMLDivElement>) {
    var touch1 = event.targetTouches[0];
    setX1(touch1.pageX);
    setY1(touch1.pageY);
    if (node.current) {
      const { style } = node?.current as HTMLDivElement;
      const numLeft = style.left.replace('px', '');
      setTyLeft(Number(numLeft));
    }
    console.log('touchstart');
  }
  /**
   * 拖动触摸
   * @param e
   */
  function scrollTouchmove(event: React.TouchEvent) {
    var touch2 = event.targetTouches[0];
    var x2 = touch2.pageX;
    var y2 = touch2.pageY;

    if (node.current && nodeView.current) {
      const { offsetWidth: fl_w } = node.current as HTMLDivElement;
      const { offsetWidth: flb_w } = nodeView.current as HTMLDivElement;

      console.log(fl_w, flb_w);
      if (tyLeft + x2 - x1 >= 0) {
        console.log(1);
        node.current.style.left = '0';
      } else if (tyLeft + x2 - x1 <= flb_w - fl_w) {
        console.log(2);
        node.current.style.left = flb_w - fl_w + 'px';
      } else {
        console.log(3, tyLeft + x2 - x1);
        node.current.style.left = tyLeft + x2 - x1 + 'px';
      }
      if (Math.abs(y2 - y1) > 0) {
        event.preventDefault();
      }
    }
  }
  function scrollLeft(
    from: number,
    to: number,
    duration = 500,
    endCallback?: () => void
  ) {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil((difference / duration) * 50);

    /*
     window.requestAnimationFrame() 
    告诉浏览器——你希望执行一个动画，
    并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
    该方法需要传入一个回调函数作为参数，
    该回调函数会在浏览器下一次重绘之前执行
    */
    function scroll(start: number, end: number, step: number) {
      if (start === end) {
        endCallback && endCallback();
        return;
      }
      let d = start + step > end ? end : start + step;
      if (start > end) {
        d = start - step < end ? end : start - step;
      }

      if (node.current) {
        setCurrentOffset(d);
        node.current.scrollLeft = d;
      }

      window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
  }
  return (
    <div className='sw-tab-view' ref={nodeView}>
      <div
        className={classes}
        ref={node}
        onTouchStart={scrollTouchstart}
        onTouchMove={scrollTouchmove}
      >
        {data?.map((item, i) => (
          <div
            className='sw-tab'
            key={i}
            onClick={(event) => {
              const {
                offsetLeft,
                offsetWidth: itemOffsetWidth,
              } = event.target as HTMLElement; // 当前tab item 的 ref
              if (node.current) {
                const { offsetWidth } = node.current; // 当前tab 的 ref
                const navWidth = offsetWidth / 2;
                const scrollOffset =
                  offsetLeft - navWidth + itemOffsetWidth / 2;
                scrollLeft(currentOffset, scrollOffset, 1500, () => {});
              }
            }}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
Tab.defaultProps = {
  scrollable: true,
};
export default Tab;
