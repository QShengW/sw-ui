import { FC } from 'react';
import TextAlign, { IProps } from './textAlign';
import TextItem, { IItemPorps } from './item';

export type ITextAlignComponent = FC<IProps> & {
  Item: FC<IItemPorps>;
};
const TextView = TextAlign as ITextAlignComponent;

TextView.Item = TextItem;

export default TextView;
