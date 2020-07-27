// 防抖节流函数
function settime() {
  let runFlag = false;
  return function(fn) {
    console.log("1111111111-------", fn);
    // 判断之前的调用是否完成
    if (runFlag) {
      return false;
    }
    runFlag = true;
    setTimeout(() => {
      fn();
      runFlag = false;
    }, 2000);
  };
}

export { settime };
