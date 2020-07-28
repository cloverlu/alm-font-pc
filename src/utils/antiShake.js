// 防抖节流函数
export function antiShake(func, wait, immediate = true) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}
// export function antiShake() {
//   let runFlag = false;
//   return function(fn) {
//     console.log("1111111111-------", fn);
//     // 判断之前的调用是否完成
//     if (runFlag) {
//       return false;
//     }
//     runFlag = true;
//     setTimeout(() => {
//       fn();
//       runFlag = false;
//     }, 2000);
//   };
// }
