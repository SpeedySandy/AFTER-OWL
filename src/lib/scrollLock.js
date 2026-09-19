// The product modal and the bag drawer can be open at the same time, and both
// want the page behind them to stop scrolling. A plain add/remove of a class
// means whichever closes first unlocks the page under the other one, so the
// locks are counted instead.

let depth = 0;

export function lockScroll() {
  depth += 1;
  document.body.classList.add('no-scroll');
  return () => {
    depth = Math.max(0, depth - 1);
    if (depth === 0) document.body.classList.remove('no-scroll');
  };
}
