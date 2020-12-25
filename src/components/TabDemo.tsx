import React, { useState, useRef } from 'react';
import {
  Tab,
  Icon,
  Popup,
  Toast,
  Button,
  Loading,
  Overlay,
  BackTop,
  LoadMore,
} from '.';
import './styles/index.scss';
// import { scrollTop } from './utils/util';

// function getElementToPageTop(el: any): number {
//   if (el.parentElement) {
//     console.log(el.parentElement);
//     return getElementToPageTop(el.parentElement) + el.offsetTop;
//   }
//   console.log(el.offsetTop);
//   return el.offsetTop;
// }
// function getWz(index: number) {
//   const goTop = getElementToPageTop(document.getElementById(`weizhi_${index}`));
//   // console.log(document.getElementById(`weizhi_${index}`)?.offsetTop)
//   scrollTop(window, goTop, 1500);
// }

function App() {
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const [showss, setShowss] = useState(true);
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [tyLeft, setTyLeft] = useState(0);
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
  /**
   * 当前item 点击
   */
  function scrollOnClick(event: any) {
    const {
      offsetWidth: itemOffsetWidth,
      offsetLeft,
      offsetParent,
      style,
    } = event.target as HTMLElement; // 当前tab item 的 ref
    const nav_w = itemOffsetWidth; //'当前点击的宽'
    // 总宽 - 当前点击的宽 / 2
    if (node.current && nodeView.current) {
      const { offsetWidth: fl_w } = node.current as HTMLDivElement;
      const { offsetWidth: flb_w } = nodeView.current as HTMLDivElement;

      const fn_w = (flb_w - nav_w) / 2;
      var fnl_l;
      var fnl_x = offsetLeft;

      if (fnl_x <= fn_w) {
        fnl_l = 0;
      } else if (fn_w - fnl_x <= flb_w - fl_w) {
        fnl_l = flb_w - fl_w;
      } else {
        fnl_l = fn_w - fnl_x;
      }
      console.log(offsetLeft, fnl_l, 'fnl_lfnl_l');
      // node.current.style.left = fnl_l + 'px';
      scrollLeft(offsetLeft, fnl_l, 1500);
      // $('.find_nav_list').animate(
      //   {
      //     left: fnl_l,
      //   },
      //   300
      // );
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
      console.log(start, end);
      if (start > end) {
        d = start - step < end ? end : start - step;
      }

      if (node.current) {
        node.current.style.left = d + 'px';
      }

      window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
  }
  return (
    <>
      <div className='find_nav'>
        <div className='find_nav_left' ref={nodeView}>
          <div
            className={'find_nav_list'}
            ref={node}
            onTouchStart={scrollTouchstart}
            onTouchMove={scrollTouchmove}
          >
            <ul>
              {[
                '每日更新',
                '精品首推',
                '时尚包包',
                'T恤',
                '运动品牌',
                '香水化妆品',
                '阿迪达斯',
                '耐克',
                '范思哲',
                '古驰',
                '李宁',
                '索尼',
                '苹果手机',
                'IPad',
                'Iphone',
                'IPad1',
                'IPad2',
                'IPad3',
                'IPad4',
                'IPad5',
              ].map((item, i) => (
                <li
                  className='sw-tab'
                  key={i}
                  onClick={scrollOnClick}
                  // onClick={(event) => {
                  //   // const {
                  //   //   offsetLeft,
                  //   //   offsetWidth: itemOffsetWidth,
                  //   // } = event.target as HTMLElement; // 当前tab item 的 ref
                  //   // if (node.current) {
                  //   //   const { offsetWidth } = node.current; // 当前tab 的 ref
                  //   //   const navWidth = offsetWidth / 2;
                  //   //   const scrollOffset =
                  //   //     offsetLeft - navWidth + itemOffsetWidth / 2;
                  //   //   console.log(offsetLeft, currentOffset);
                  //   //   scrollLeft(currentOffset, scrollOffset, 1500, () => {});
                  //   // }
                  // }}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: 100 }}></div>
      <Tab
        data={[
          '每日更新',
          '精品首推',
          '时尚包包',
          'T恤',
          '运动品牌',
          '香水化妆品',
          '阿迪达斯',
          '耐克',
          '范思哲',
          '古驰',
          '李宁',
          '索尼',
          '苹果手机',
          'IPad',
          'Iphone',
          'IPad1',
          'IPad2',
          'IPad3',
          'IPad4',
          'IPad5',
        ]}
      />
      <div
        className='App'
        style={{
          padding: '0 16px',
        }}
      >
        {/* <Button text="加载状态" btnType="success" onClick={() => getWz(1)} style={{
        position: 'fixed',
        top: 0,
        right: 0
      }} />
      <Button text="加载状态" btnType="success" onClick={() => getWz(2)} style={{
        position: 'fixed',
        top: 44,
        right: 0
      }} />
      <Button text="加载状态" btnType="success" onClick={() => getWz(3)} style={{
        position: 'fixed',
        top: 88,
        right: 0
      }} />
      <Button text="加载状态" btnType="success" onClick={() => getWz(4)} style={{
        position: 'fixed',
        top: 122,
        right: 0
      }} />
      <Button text="加载状态" btnType="success" onClick={() => getWz(5)} style={{
        position: 'fixed',
        top: 166,
        right: 0
      }} />
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          style={{
            height: 500,
            backgroundColor: `${color16()}`,
          }}
          ref={node}
          id={`weizhi_${item}`}
        >
          {item}
        </div>
      ))} */}

        <Icon name={'wechat'} color={'green'} />
        <Icon name={'arrow'} />
        <Icon name={'arrow-up'} />
        <BackTop />
        <h2 className='van-doc-demo-block__title'>LoadMore</h2>
        <LoadMore />
        <LoadMore tip='暂无数据' />
        <LoadMore loading={showss} tip='暂无数据' />
        <LoadMore loading={showss} loadingType={'circle-side'} tip='暂无数据' />
        <LoadMore
          loading={showss}
          loadingType={'circle-multiple'}
          tip='暂无数据'
        />
        <LoadMore
          loading={showss}
          loadingType={'circle-pulse'}
          tip='暂无数据'
        />
        <LoadMore loading={showss} loadingType={'circle-box'} tip='暂无数据' />
        <Button
          text='加载状态'
          btnType='success'
          onClick={() => setShowss(!showss)}
        />
        <h2 className='van-doc-demo-block__title'>Overlay遮罩层</h2>
        <Overlay
          zIndex={2}
          show={show}
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        >
          <div className='wrapper'>
            <div
              className='block'
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
            >
              我是嵌入内容
            </div>
          </div>
        </Overlay>
        <Button
          text='显示遮罩层'
          btnType='success'
          onClick={() => setShow(!show)}
        />
        <h2 className='van-doc-demo-block__title'>Popup遮罩层</h2>
        <Button
          text='显示Popup'
          btnType='success'
          onClick={() => setShows(!shows)}
        />
        <Popup
          show={shows}
          position={'right'}
          onClose={() => setShows(!shows)}
          style={{
            width: 300,
          }}
        >
          1111
        </Popup>
        <h2 className='van-doc-demo-block__title'>Toast</h2>
        <Button
          text='显示Toast'
          btnType='success'
          onClick={() => Toast.info('提示内容')}
        />
        <h2 className='van-doc-demo-block__title'>Loading</h2>
        <div
          className='d-flex flex-wrap p-tb-30'
          style={{
            background: '#40479a',
          }}
        >
          <Loading color='red' text='加载中...' />
          <i className='p-l-30' />
          <Loading type='circle-side' color='green' text='加载中...' />
          <i className='p-l-30' />
          <Loading type='circle-side' size={20} text='side...' />
          <i className='p-l-30' />
          <Loading type='circle-multiple' text='multiple...' />
          <i className='p-l-30' />
          <Loading type='circle-pulse' size={20} text='pulse...' />
          <i className='p-l-30' />
          <Loading
            type='circle-box'
            size={20}
            vertical
            color='#fff'
            text='box加载文案...'
          />
        </div>
        <h2 className='van-doc-demo-block__title'>按钮类型</h2>
        <div className='flex-row flex-wrap'>
          <Button text='成功按钮' btnType='success' />
          <Button text='主要按钮' btnType='primary' />
          <Button text='信息按钮' btnType='info' />
          <Button text='默认按钮' />
          <Button text='危险按钮' btnType='danger' />
          <Button text='警告按钮' btnType='warning' />

          <Button
            text='是一个百度链接'
            btnType='link'
            href='http://www.baidu.com'
            target='_bank'
          />

          <Button
            text='渐变色按钮'
            style={{
              color: '#fff',
              background:
                'linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))',
            }}
          />
        </div>
        <h2 className='van-doc-demo-block__title'>加载按钮</h2>
        <div className='flex-ai-center flex-wrap'>
          <Button text='方形按钮' btnType='success' square loading />
          <Button
            text='方形按钮'
            btnType='success'
            square
            loading
            loadingText='loading...'
            loadingType='circle-side'
          />
          <Button
            text='方形按钮'
            btnType='success'
            square
            loading
            loadingText='加载...'
            loadingType='circle'
          />

          <Button
            text='方形按钮'
            btnType='success'
            square
            loading
            loadingText='加载...'
            loadingType='circle-multiple'
          />
          <Button
            text='方形按钮'
            btnType='success'
            square
            loading
            loadingText='加载...'
            loadingType='circle-pulse'
          />
          <Button
            text='方形按钮'
            btnType='success'
            square
            loading
            loadingText='加载...'
            loadingType='circle-box'
          />
        </div>
        <h2 className='van-doc-demo-block__title'>按钮形状</h2>
        <div className='flex-ai-center flex-row'>
          <Button text='方形按钮' btnType='success' square />
          <Button text='圆形按钮' btnType='success' round />
        </div>
        <h2 className='van-doc-demo-block__title'>边框按钮</h2>
        <div className='flex-wrap flex-row'>
          <Button text='成功按钮' btnType='success' plain />
          <Button text='主要按钮' btnType='primary' plain />
          <Button text='信息按钮' btnType='info' plain />
          <Button text='默认按钮' plain />
          <Button text='危险按钮' btnType='danger' plain />
          <Button text='警告按钮' btnType='warning' plain />
        </div>
        <h2 className='van-doc-demo-block__title'>按钮尺寸大小</h2>
        <Button text='大号按钮' btnType='success' size='large' />
        <div className='flex-ai-center flex-row'>
          <Button text='普通按钮' btnType='success' />
          <Button text='小型按钮' btnType='success' size='small' />
          <Button text='迷你按钮' btnType='success' size='mini' />
        </div>
        <h2 className='van-doc-demo-block__title'>块级按钮</h2>
        <Button text='大号按钮' btnType='success' block />
        <h2 className='van-doc-demo-block__title'>禁用按钮</h2>
        <Button text='禁用状态' btnType='success' disabled />
      </div>
    </>
  );
}

export default App;
