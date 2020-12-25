import React, { useState } from 'react';

import classnames from 'classnames';
import { isDef, addUnit } from '../../utils/unit';
import Loading from '../Loading';
import Icon from '../Icon';

export type fitType = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
interface IImageProps {
  src: string;
  alt: string;
  fit?: fitType; //图片填充模式 默认 fill
  round?: boolean; //	是否显示为圆形
  width?: number | string; //宽度，默认单位为px
  height?: number | string; //高度，默认单位为px
  radius?: number | string; //圆角大小，默认单位为px
  loading?: boolean; //是否展示图片加载中提示
}
/**
 * 图片组件
 * @param props
 */
const Image: React.FC<IImageProps> = (props) => {
  const { src, alt, fit, round, width, height, radius, loading } = props;
  const [load, setLoad] = useState(-1);
  const classes = classnames('sw-image', {});
  const styles = (() => {
    const style: React.CSSProperties = {};

    if (isDef(width)) {
      style.width = addUnit(width);
    }

    if (isDef(height)) {
      style.height = addUnit(height);
    }

    if (isDef(radius)) {
      style.overflow = 'hidden';
      style.borderRadius = addUnit(radius);
    }

    if (fit) {
      style.objectFit = fit;
    }

    if (round) {
      style.overflow = 'hidden';
      style.borderRadius = '50%';
    }
    return style;
  })();
  return (
    <div
      className={classes}
      style={{
        width: styles.width,
        height: styles.height,
      }}
    >
      {load === -1 && loading && (
        <div className='sw-image-loading'>
          <Loading type={'circle-box'} color={'#e9ebec'} />
        </div>
      )}
      {load === 0 && (
        <div className='sw-image-error'>
          <Icon name={'fail'} color='#dcdee0' size='32px' />
          <span>{alt}加载失败</span>
        </div>
      )}
      {(load === -1 || load === 1) && (
        <img
          src={src}
          alt={alt}
          style={styles}
          className='sw-image-img'
          onLoad={() => setLoad(1)}
          onError={() => setLoad(0)}
        />
      )}
    </div>
  );
};
Image.defaultProps = {
  fit: 'fill',
  round: false,
  radius: 0,
  loading: false,
};
export default Image;
