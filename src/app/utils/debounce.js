export function debounce(func, ms) {
  let timeout;
  return function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, e), ms);
  };
}
