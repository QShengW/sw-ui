import React, { FC, createContext } from 'react';
import classnames from 'classnames';
import { IItemPorps } from './item';

export interface IProps {
  length: '3' | '4' | '5' | '6' | '7' | '8' | '9'; //对齐的长度
}
export const TextContext = createContext<IProps>({
  length: '3',
});

/**
 * 文字对齐 样式
 * 获取
 * @param props
 */
const TextAlign: FC<IProps> = (props) => {
  const { length, children } = props;
  const classes = classnames('sw-text-align', {});
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IItemPorps>;
      const { displayName } = childElement.type;
      if (displayName === 'TextAlignItem') {
        return React.cloneElement(childElement);
      } else {
        console.error(
          'Warning: Element has a child which is not a MenuItem component'
        );
        // return React.cloneElement(child as React.FunctionComponentElement<any>);
      }
    });
  };
  return (
    <div className={classes}>
      <TextContext.Provider
        value={{
          length,
        }}
      >
        {renderChildren()}
      </TextContext.Provider>
    </div>
  );
};
TextAlign.defaultProps = {};

export default TextAlign;
