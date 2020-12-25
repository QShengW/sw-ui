import React from 'react';
import classNames from 'classnames';

/**
 * 类型
 */
export type LoadingType =
  | 'circle-default'
  | 'circle'
  | 'circle-box'
  | 'circle-side'
  | 'circle-pulse'
  | 'circle-multiple';

/**
 * Partial 可以把包裹的值都指定成可选的
 */
interface ILoadingProps {
  type?: LoadingType; //loading 类型
  size?: number; //loading 大小
  color?: string; //loading 颜色
  text?: string; //加载文案
  vertical?: boolean; //是否垂直排列图标和文字内容
}
/**
 * Loading组件
 * @param props BaseLoadingProps
 */
const Loading: React.FC<ILoadingProps> = (props) => {
  const { type, size, color, text, vertical } = props;
  const classes = classNames('sw-loading', {
    [`sw-loading-${type}`]: type,
  });
  const loadingClasses = classNames('loading-view', {
    'flex-ai-center': !vertical,
    'flex-column-center': vertical,
  });
  const sizeStyles = size && {
    width: size,
    height: size,
  };
  const colorStyles = color && {
    color,
  };
  const styles = { ...sizeStyles, ...colorStyles };
  const LoadingView = () => {
    switch (type) {
      case 'circle-multiple':
      case 'circle-pulse':
      case 'circle-box':
        return (
          <div className={classes} style={styles}>
            <div></div>
            <div></div>
          </div>
        );
      case 'circle-default':
        return (
          <span className={classes} style={styles}>
            <svg viewBox='25 25 50 50' className='svg-circular'>
              <circle cx='50' cy='50' r='20' fill='none'></circle>
            </svg>
          </span>
        );
      default:
        return <div className={classes} style={styles} />;
    }
  };
  return (
    <div className={loadingClasses}>
      <LoadingView />
      {text && (
        <span
          className={`sw-loading-text ${vertical ? 'no-m-left m-t-8' : ''}`}
        >
          {text}
        </span>
      )}
    </div>
  );
};
Loading.defaultProps = {
  type: 'circle-default',
  vertical: false,
};
export default Loading;
