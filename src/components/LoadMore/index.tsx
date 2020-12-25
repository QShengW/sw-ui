import React from 'react';
import classnames from 'classnames';
import Loading, { LoadingType } from '../Loading';
interface ILoadMoreProps {
  loading?: boolean;
  more?: string; // 加载中文案
  tip?: string; //提示文案
  loadingSize?: number;
  loadingType?: LoadingType;
  loadingColor?: string;
}

const LoadMore: React.FC<ILoadMoreProps> = (props) => {
  const { loading, more, tip, loadingSize, loadingType, loadingColor } = props;
  const classes = classnames('sw-load-more', {
    'sw-load-more-line': !loading,
  });
  return (
    <div className={classes}>
      {loading && (
        <Loading size={loadingSize} color={loadingColor} type={loadingType} />
      )}
      <div
        className='sw-load-more-tip'
        style={{
          marginLeft: loading ? 6 : 0,
        }}
      >
        {loading ? more : tip}
        {!loading && !tip && <div className='sw-load-more-empty'></div>}
      </div>
    </div>
  );
};
LoadMore.defaultProps = {
  loading: false,
  tip: '',
  more: '正在加载',
  loadingSize: 20,
  loadingColor: '#2d8cf0',
  loadingType: 'circle',
};
export default LoadMore;
