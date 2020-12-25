import React, { useState } from 'react';
import {
  Tab,
  Icon,
  Image,
  Badge,
  Popup,
  Toast,
  Button,
  Loading,
  Overlay,
  BackTop,
  LoadMore,
  TextAlign,
  Switch,
} from './components';
import './styles/index.scss';

import { throttle } from './utils/throttle-debounce'

import Sunset from './sunset.jpg';




function App() {
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const [showss, setShowss] = useState(true);
  const [active, setActive] = useState(false);


  const throttleFunc = throttle(3000, true, (num:number) => {
    console.log('num:', num++);
  });
  return (
    <div
      className='App'
      style={{
        padding: '0 16px',
      }}
    >
      <div onClick={()=>{
        console.log(111)
        throttleFunc(1); // Will execute the callback
      }}>
        测试throttle
      </div>
      <h2 className='van-doc-demo-block__title'>Switch</h2>
      <div className='flex-wrap'>
        <div
          className='flex-column-center'
          style={{
            width: '20%',
          }}
        >
          <Switch active={active} onClick={(check) => setActive(check)} />
          <h2 className='van-doc-demo-block__title'>基础用法</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '20%',
          }}
        >
          <Switch
            disabled
            active={active}
            onClick={(check) => setActive(check)}
          />
          <h2 className='van-doc-demo-block__title'>disabled</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '20%',
          }}
        >
          <Switch
            color={'red'}
            bgColor={'#03a9f4'}
            active={active}
            onClick={(check) => setActive(check)}
          />
          <h2 className='van-doc-demo-block__title'>自定颜色</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '20%',
          }}
        >
          <Switch
            active={active}
            onClick={(check) => {
              console.log('无限回调');
              setActive(check);
            }}
          />
          <h2 className='van-doc-demo-block__title'>无限回调</h2>
        </div>
      </div>

      <h2 className='van-doc-demo-block__title'>TextAlign</h2>
      <TextAlign length={'5'}>
        <TextAlign.Item text={'台式'} />
        <TextAlign.Item text={'台式机'} />
        <TextAlign.Item text={'台式机器'} />
        <TextAlign.Item text={'台式台式台'} />
      </TextAlign>

      <h2 className='van-doc-demo-block__title'>Badge</h2>
      <Badge text={1}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge dot>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <h2 className='van-doc-demo-block__title'>自定义颜色</h2>
      <Badge color={'#836c68'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge type={'primary'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge type={'info'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge type={'success'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge type={'warning'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>
      <i className='p-l-30' />
      <Badge type={'danger'} text='100' max={99}>
        <div className='sw-demo-child' />
      </Badge>

      <h2 className='van-doc-demo-block__title'>基础用法</h2>
      <Image width='100' height='100' src={Sunset} alt='cat' />
      <h2 className='van-doc-demo-block__title'>填充模式</h2>
      <div className='flex-wrap'>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image
            width='100'
            height='100'
            src={Sunset}
            alt='cat'
            fit={'contain'}
          />
          <h2 className='van-doc-demo-block__title'>contain</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image
            width='100'
            height='100'
            src={Sunset}
            alt='cat'
            fit={'cover'}
          />
          <h2 className='van-doc-demo-block__title'>cover</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image width='100' height='100' src={Sunset} alt='cat' fit={'fill'} />
          <h2 className='van-doc-demo-block__title'>fill</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image width='100' height='100' src={Sunset} alt='cat' fit={'none'} />
          <h2 className='van-doc-demo-block__title'>none</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image
            width='100'
            height='100'
            src={Sunset}
            alt='cat'
            fit={'scale-down'}
          />
          <h2 className='van-doc-demo-block__title'>scale-down</h2>
        </div>
      </div>
      <div>
        <h2 className='van-doc-demo-block__title'>圆形图片</h2>
        <div className='flex-wrap'>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              src={Sunset}
              alt='cat'
              fit={'contain'}
              round
            />
            <h2 className='van-doc-demo-block__title'>contain</h2>
          </div>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              src={Sunset}
              alt='cat'
              fit={'cover'}
              round
            />
            <h2 className='van-doc-demo-block__title'>cover</h2>
          </div>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              src={Sunset}
              alt='cat'
              fit={'fill'}
              round
            />
            <h2 className='van-doc-demo-block__title'>fill</h2>
          </div>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              src={Sunset}
              alt='cat'
              fit={'none'}
              round
            />
            <h2 className='van-doc-demo-block__title'>none</h2>
          </div>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              src={Sunset}
              alt='cat'
              fit={'scale-down'}
              round
            />
            <h2 className='van-doc-demo-block__title'>scale-down</h2>
          </div>
        </div>
        <h2 className='van-doc-demo-block__title'>Radius</h2>
        <div className='flex-wrap'>
          <div
            className='flex-column-center'
            style={{
              width: '33.3%',
            }}
          >
            <Image
              width='100'
              height='100'
              radius='30'
              src={Sunset}
              alt='cat'
              fit={'cover'}
            />
            <h2 className='van-doc-demo-block__title'>contain</h2>
          </div>
        </div>
      </div>
      <h2 className='van-doc-demo-block__title'>其他</h2>

      <div className='flex-wrap'>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image
            width='100'
            height='100'
            radius='30'
            src={'https://avatars2.githubusercontent.com/u/5787110?s=80&v=4'}
            alt='cat'
            fit={'cover'}
          />
          <h2 className='van-doc-demo-block__title'>Error</h2>
        </div>
        <div
          className='flex-column-center'
          style={{
            width: '33.3%',
          }}
        >
          <Image
            width='100'
            height='100'
            radius='30'
            src={Sunset}
            alt='cat'
            fit={'cover'}
            loading
          />
          <h2 className='van-doc-demo-block__title'>Loading</h2>
        </div>
      </div>

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
      <LoadMore loading={showss} loadingType={'circle-pulse'} tip='暂无数据' />
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
          setShow(!show);
        }}
      >
        <div className='wrapper'>
          <div
            className='block'
            onClick={(e) => {
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
  );
}

export default App;
