export const debounce = (cb, wait, ...args) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, wait);
  };
};

export const throttle = (cb, wait) => {
  let last = 0;

  return function (...args) {
    let now = new Date().getTime();
    if (now - last < wait) return;
    last = now;
    return cb(...args);
  };
};
