import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';

export type IPortalProps = React.PropsWithChildren<{
  node?: HTMLElement;
  getContainer?: string; //弹出层默认挂载到组件所在位置，可以通过 get-container 属性指定挂载位置。
}>;
/**
 * 传送门
 * @param props
 */
// 判断是否为浏览器环境
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const Portal = ({ node, getContainer, children }: IPortalProps) => {
  // 使用ref记录内部创建的节点 初始值为null
  const defaultNodeRef = React.useRef<HTMLElement | null>(null);
  // 组件卸载时 移除该节点
  useEffect(
    () => () => {
      if (defaultNodeRef.current) {
        document.body.removeChild(defaultNodeRef.current);
      }
    },
    []
  );
  // 如果非浏览器环境 直接返回 null 服务端渲染需要
  if (!canUseDOM) return null;
  // 若用户未传入节点，Portal也未创建节点，则创建节点并添加至body
  if (!node && !defaultNodeRef.current && !getContainer) {
    const defaultNode = document.createElement('div');
    defaultNode.className = 'sw-portal';
    defaultNodeRef.current = defaultNode;
    document.body.appendChild(defaultNode);
  }
  if (!node && !defaultNodeRef.current && getContainer) {
    defaultNodeRef.current = document.querySelector(getContainer)
  }
  return ReactDOM.createPortal(children, (node || defaultNodeRef.current)!); // 这里需要进行断言
};

export default Portal;
