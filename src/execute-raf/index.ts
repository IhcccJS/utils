// @ts-ignore
import { requestAnimationFrame as raf, cancelAnimationFrame as caf } from 'animation-frame-polyfill';

type ExecuteRafCallback<T> = (item: T, index: number) => {};

/**
 * 在每一帧里渐进执行回调，避免阻塞渲染主线程导致页面卡顿
 * @param list 要处理的列表
 * @param callback 处理每一项的回调，返回 false 可中断处理
 * @returns 返回一个对象，包含 cancel 方法
 */
function executeRaf<T>(list: T[], callback: ExecuteRafCallback<T>): { cancel: () => void } {
  let index = 0;
  let rafId = 0;
  let lastTime = 0;

  function doProcess(t: number) {
    for (let i = 0; i < list.length; i++) {
      const now = performance.now();
      if (t - lastTime > now) callback(list[index], index);
    }
    lastTime = t;
    rafId = raf(doProcess);
  }

  rafId = raf(doProcess);

  return { cancel: () => caf(rafId) };
}

export default executeRaf;
