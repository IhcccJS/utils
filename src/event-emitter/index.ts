import { isFunction } from '../types/index';

interface TEventsList {
  [key: string]: Function;
}

export class EventEmitter {
  /**
   * 判断数据类型，是否是 EventEmitter
   * @param ee 数据
   * @returns boolean
   */
  static is(ee: any): boolean {
    return ee instanceof EventEmitter;
  }

  public eventsList: TEventsList;

  constructor() {
    this.eventsList = {};
  }

  /**
   * 返回事件名称列表
   * @returns
   */
  names() {
    return Object.keys(this.eventsList);
  }

  /**
   * 返回事件名称列表
   * @returns
   */
  getEventNames() {
    return Object.keys(this.eventsList);
  }

  /**
   * 触发指定事件，触发后就取消订阅
   * @returns
   */
  once(name: string, ...args: any[]) {
    if (isFunction(this.eventsList[name])) {
      this.eventsList[name](...args);
      delete this.eventsList[name];
    }
  }

  /**
   * 触发指定事件
   * @returns
   */
  emit(name: string, ...args: any[]) {
    if (isFunction(this.eventsList[name])) {
      return this.eventsList[name](...args);
    }
  }

  /**
   * 订阅指定事件
   * @returns
   */
  on(name: string, callback: Function, context: any) {
    if (isFunction(this.eventsList[name]) || !isFunction(callback)) return;
    this.eventsList[name] = callback.bind(context || callback);
  }

  /**
   * 取消订阅指定事件
   * @returns
   */
  off(name: string) {
    delete this.eventsList[name];
  }

  /**
   * 取消订阅所有事件
   * @returns
   */
  offAll() {
    this.eventsList = {};
  }
}

function eventEmitter() {
  return new EventEmitter();
}

export default eventEmitter;
