import React, { Component } from 'react';
import { country } from './data';
import './style.scss';

// 头部搜索栏
class Pager extends Component<any, any> {
  public charStr = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
  public boxClientTop = 50;
  public countryList: any
  public charBar: any

  public lastChar: any
  constructor(props: any) {
    super(props);
    this.state = {
      isTouching: false,
      lastChar: 'A'
    }
    // this.isTouching = false;
    // this.lastChar = 'A';
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.getChar = this.getChar.bind(this);
    this.gotoChar = this.gotoChar.bind(this);
  }
  initState() {
    const obj: any = {};
    return country.map((item, index) => {
      const i = item.lastIndexOf(' ');
      const en = item.slice(0, i);
      const ch = item.slice(i + 1);
      let first = false;
      if (obj[en.slice(0, 1)]) {
        first = false;
      } else {
        first = true;
        obj[en.slice(0, 1)] = true;
      }
      return { en: en, ch: ch, first: first }
    });
  }
  touchStart(e: any) {
    // e.preventDefault();
    // this.isTouching = true;
    this.setState({ isTouching: true });
    const char = this.getChar(e.touches[0].clientY);
    this.gotoChar(char);
  }
  touchMove(e: any) {
    e.preventDefault();
    const char = this.getChar(e.touches[0].clientY);
    this.gotoChar(char);
  }
  touchEnd(e: any) {
    e.preventDefault();
    this.setState({ isTouching: false });
  }
  getChar(clientY: any) {
    const charHeight = this.charBar?.offsetHeight / this.charStr.length;
    const index = Math.floor((clientY - this.boxClientTop) / charHeight);
    return this.charStr[index];
  }
  gotoChar(char: any) {
    if (char === this.lastChar) {
      return false;
    }
    this.setState({ lastChar: char });
    // this.lastChar = char;
    if (char === '*') {
      this.countryList.scrollTop = 0;
    } else if (char === '#') {
      this.countryList.scrollTop = this.countryList.scrollHeight;
    }
    const target = document.querySelector('[data-en="' + char + '"]');
    if (target) {
      target.scrollIntoView();
    }
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="country-list">
        <div className="detial">this is detail page</div>
        <div
          className="country-border"
          ref={(res) => this.countryList = res}
        >
          {
            this.initState().map((item, index) => {
              return (
                <div key={index}>
                  {item.first && <div data-en={item.en.slice(0, 1)}></div>}
                  <div
                    className="item"
                  >
                    <div>{item.en}</div>
                    <div>{item.ch}</div>
                  </div>
                </div>
              )
            })
          }
          <div className="char-list-border">
            <ul
              className="char-list"
              ref={(res) => this.charBar = res}
              onTouchStart={this.touchStart}
              onTouchMove={this.touchMove}
              onTouchEnd={this.touchEnd}
            >
              {
                this.charStr.split('').map((char, index) => {
                  return (
                    <li className="char-item" key={index}>{char}</li>
                  )
                })
              }
            </ul>
          </div>
          {this.state.isTouching && <div className="char-tip">{this.state.lastChar}</div>}
        </div>
      </div>
    )
  }
}



export default Pager;