import React from 'react';
import ReactDOM from 'react-dom';

interface IToastProps {
  message?: string;
}

/**
 * button组件
 * @param props BaseButtonProps
 */
let seed = 0;
const Toast = (props: IToastProps) => {
  const { message } = props;
  const now = Date.now();
  const getUuid = () => {
    const id = seed;
    seed += 1;
    return `${now}-${id}`;
  };
  let div: any = document.createElement('div');
  div.id = 'sw-toast-' + getUuid();
  document.body.append(div);
  ReactDOM.render(
    <div className='sw-toast sw-toast-text'>
      <div>{message}</div>
    </div>,
    div
  );
  console.log(seed);
  if (seed > 1) {
    let box = document.getElementById(div.id);
    box?.parentNode?.removeChild(box);
  } else {
    setTimeout(() => {
      let box = document.getElementById(div.id);
      box?.parentNode?.removeChild(box);
    }, 3000);
  }
};
Toast.info = (message: string) => {
  Toast({
    message,
  });
};
export default Toast;
