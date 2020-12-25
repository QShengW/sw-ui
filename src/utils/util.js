//Copy from iView. https://www.iviewui.com/
// scrollTop animation
export function scrollTop(el, to, duration = 500, endCallback) {
  const from = document.documentElement.scrollTop || document.body.scrollTop;
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}


export function scrollLeft(from, to, animate, callback) {
  const difference = Math.abs(from - to);
  const step = animate ? Math.ceil(difference / 600 * 50) : difference;
  const self = this;
  function scroll(start, end, step) {
    if (start === end) {
      callback && callback();
      return;
    }
    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }
    self.$refs.nav.scrollLeft = d;
    self.currentOffset = d;
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

