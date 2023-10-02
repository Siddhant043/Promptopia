export const debounceSearch = function (funcToBeCalled, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      funcToBeCalled.apply(context, args);
    }, delay);
  };
};
