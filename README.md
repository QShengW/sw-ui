<h1 align="center">Welcome to react-swui 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

### 🏠 [Homepage](https://github.com/QShengW/sw-ui)

## Install

```sh
yarn add react-swui

# or

npm i react-swui
```

## Usage

```jsx
import React from 'react';
import { Button } from 'react-sw';
import 'react-swui/dist/index.css';

export default () => {
  return (
    <>
      <Button text='成功按钮' btnType='success' />
      <Button text='主要按钮' btnType='primary' />
      <Button text='信息按钮' btnType='info' />
      <Button text='默认按钮' />
      <Button text='危险按钮' btnType='danger' />
      <Button text='警告按钮' btnType='warning' />
    </>
  );
};
```

# 🥥 [All Use Cases](https://github.com/QShengW/sw-ui/blob/master/src/App.tsx)

# React Mobile Component

Current projects include component encapsulation for everyday use

## 目录结构

```js
components
├── BackTop                   # 返回顶部
├── Badge                     # 徽标 在右上角展示徽标数字或小红点。
├── Button                    # 按钮
├── Icon                      # 样式图标
├── Image                     # 图片组件
├── Loading                   # 加载组件
├── LoadMore                  # 加载完成 ｜ 加载中
├── Overlay                   # 遮罩层
├── Popup                     # 上下左右弹出
├── Switch                    # 开关
├── TextAlign                 # 文字对齐
├── Checkbox                  # 复选框 用于在选中和非选中状态之间进行切换。
├── Cascader                  # 数据选择 三级选择 支持 支持 数据格式化
├── Cell                      # 单元格为列表中的单个展示项。
├── ..............
```

## directory structure

```js
The following is an introduction to the catalog structure of the whole project。
components                    # Packaged components
├── BackTop                   # Back to the top
├── Badge                     # The logo shows the logo number or small red dot in the upper right corner
├── Button                    # Button
├── Icon                      # Icon
├── Image                     # Image
├── Loading                   # Loading
├── LoadMore                  # LoadMore ｜ LoadMore ing
├── Overlay                   # Overlay
├── Popup                     # Popup
├── Switch                    # Switch
├── Cascader                  # Cascader
├── TextAlign                 # TextAlign
├── ..............
```
