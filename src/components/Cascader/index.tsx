import React, { useState, useEffect, CSSProperties } from 'react';
import classnames from 'classnames';
import Popup from '../Popup';
import Icon from '../Icon';
import { format } from '../../utils/help';
import { ArrSN, BaseOptionProps } from '../../Types';
import { IFinish, ISelect, BaseCascaderProps } from './types';

/**
 * Cascader 最多支持 3级联动数据
 * 级联选择框，用于多层级数据的选择，典型场景为省市区选择，
 * @param props
 */
const Cascader: React.FC<BaseCascaderProps> = (props) => {
  const {
    show,
    data,
    title,
    secondData,
    lastData,
    onClose,
    onChange,
    onFinish,
    closeType,
    formatParams,
    formatLabelFinish,
    formatValueFinish,
    safeBottom,
  } = props;
  const [styles, setStyles] = useState<CSSProperties>({});
  const [select, setSelect] = useState<ISelect[]>([]);

  const [firstColumn, setFirstColumn] = useState<BaseOptionProps[]>([]);
  const [secondColumn, setSecondColumn] = useState<BaseOptionProps[]>([]);
  const [lastColumn, setLastColumn] = useState<BaseOptionProps[]>([]);

  const [selectIndex, setSelectIndex] = useState(0);
  const classes = classnames('scoll-view', {
    safe: safeBottom,
  });
  useEffect(() => {
    // other code
    const selectData =
      data && formatParams && format(data, { ...formatParams });
    if (selectData && selectData.length > 0) {
      setFirstColumn(selectData);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //第一列
  useEffect(() => {
    // other code
    const data =
      secondData && formatParams
        ? format(secondData, { ...formatParams })
        : secondData;
    if (data && data.length > 0) {
      setSecondColumn(data);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondData]); //第二列
  useEffect(() => {
    // other code
    const data =
      lastData && formatParams
        ? format(lastData, { ...formatParams })
        : lastData;
    if (data && data.length > 0) {
      setLastColumn(data);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastData]); //第三列
  /**
   * sw-cascader-select-box 动画
   * @param selectIndex
   */
  function transform(selectIndex: number) {
    const style: CSSProperties = {};
    style.transform = `translate3d(-${selectIndex * 100}%, 0px, 0px)`;
    style.transitionDuration = '0.3s';
    setStyles(style);
  }
  /**
   * 内容点击操作
   * @param selectIndex
   * @param item
   * @param index
   */
  function liOnClick(
    selectIndex: number,
    item: BaseOptionProps,
    index: number
  ) {
    return (
      <li
        className={`${
          select[selectIndex]?.value === item.value ? 'select' : ''
        }`}
        key={index}
        onClick={() => {
          select[selectIndex] = {
            label: item.label,
            value: item.value,
            data: item.data,
          };
          if (selectIndex <= 1) {
            select[selectIndex + 1] = {
              label: '请选择',
              value: '请选择',
            };
            transform(selectIndex + 1);
            setSelectIndex(selectIndex + 1);
          }
          if (selectIndex === 0) {
            if (select.length === 3) {
              select.pop();
            }
            if (item.children.length > 0) {
              setSecondColumn(item.children);
            }
          } else if (selectIndex === 1) {
            if (item.children.length > 0) {
              setLastColumn(item.children);
            }
          } else if (selectIndex === 2) {
            setSelectIndex(selectIndex);
            onClose && onClose();
          }
          setSelect(select);
          const finishValue: IFinish = {
            value: [],
            label: [],
            valueFormat: '',
            labelFormat: '',
          };
          let valueArr: ArrSN = [];
          let labelArr: ArrSN = [];
          let otherArr: BaseCascaderProps[] = [];
          select.map((item) => {
            if (item.label === '请选择') return false;
            valueArr.push(item.value);
            labelArr.push(item.label);
            otherArr.push(item.data);
            return item;
          });
          finishValue.value = valueArr;
          finishValue.label = labelArr;
          finishValue.valueFormat = valueArr.join(formatValueFinish);
          finishValue.labelFormat = labelArr.join(formatLabelFinish);
          onChange &&
            onChange(
              finishValue,
              {
                value: item.value,
                label: item.label,
              },
              item.data,
              selectIndex
            );
          if (selectIndex === 2 && onFinish) {
            onFinish(finishValue, otherArr);
          }
        }}
      >
        <span>{item.label}</span>
        {select[selectIndex]?.value === item.value && (
          <Icon name={'success'} color='#f5503a' size={18} />
        )}
      </li>
    );
  }
  return (
    <Popup show={show} position={'bottom'} round onClose={onClose}>
      <div className={'sw-cascader'}>
        <div className='sw-cascader-header'>
          <h2 className='sw-cascader-title'>{title}</h2>
          <Icon
            name={closeType}
            classNames='sw-cascader-icon'
            onClick={() => {
              onClose && onClose();
            }}
          />
        </div>
        <div className='sw-cascader-nav'>
          {select.length === 0 && <div className='crt nav-item'>请选择</div>}
          {select.length > 0 &&
            select.map((item, i) => (
              <div
                className={`${selectIndex === i ? 'crt nav-item' : 'nav-item'}`}
                key={item.value}
                onClick={() => {
                  transform(i);
                  setSelectIndex(i);
                }}
              >
                {item.label}
              </div>
            ))}
        </div>

        <div className='sw-cascader-select-box' style={styles}>
          {firstColumn && firstColumn.length > 0 && (
            <div className={classes}>
              <ul>{firstColumn.map((item, i) => liOnClick(0, item, i))}</ul>
            </div>
          )}
          {secondColumn && secondColumn.length > 0 && (
            <div className={classes}>
              <ul>{secondColumn.map((item, i) => liOnClick(1, item, i))}</ul>
            </div>
          )}
          {lastColumn && lastColumn.length > 0 && (
            <div className={classes}>
              <ul>{lastColumn.map((item, i) => liOnClick(2, item, i))}</ul>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};
Cascader.defaultProps = {
  show: false,
  closeType: 'cross',
  safeBottom: true,
  formatLabelFinish: '/',
  formatValueFinish: ',',
};

export default Cascader;
