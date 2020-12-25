
import { IBasePopupProps } from '../Popup';
import { IFormat } from '../../utils/help';
import { StrNum, ArrSN, BaseOptionProps } from '../../Types';

export type IFinish = {
  value: ArrSN | string;
  label: ArrSN | string;
  valueFormat: string;
  labelFormat: string;
};
type IValue = {
  value: StrNum;
  label: StrNum;
};
export type ISelect = {
  [key: string]: any;
} & IValue;
export type BaseCascaderProps = ICascaderProps & IBasePopupProps;
interface ICascaderProps {
  title: string; //头部标题
  data?: any[]; // 全部数据都在一个数组里的 格式必须是 BaseOptionProps[] 格式 如果不是 BaseOptionProps[] 格式 请在 添加 formatParams 进行格式化 也是 第一列的数据
  secondData?: BaseOptionProps[]; //第二列数据
  lastData?: BaseOptionProps[]; //第三列数据
  closeType?: 'cross' | 'close'; //头部关闭按钮的图标形状
  safeBottom?: boolean; //是否需要兼容iphonex及以上的机型
  formatParams?: IFormat; // 选择 格式化选中目标的函数
  formatLabelFinish?: string; // 选择后label数组格式化，自定义显示格式 如：福建省,厦门市,思明区 福建省 厦门市 思明区 福建省/厦门市/思明区
  formatValueFinish?: string; // 选择后value数组格式化，自定义显示格式 如：1,2,3 1 2 3 1/2/3
  onChange?: (
    finishValue: IFinish,
    value: IValue,
    itemOtherData: BaseCascaderProps[],
    selectIndex: number
  ) => void; // 每列选中数据后返回值
  onFinish?: (finishValue: IFinish, otherData: BaseCascaderProps[]) => void;
}

