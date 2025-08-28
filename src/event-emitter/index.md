---
nav:
  title: 方法
  order: 2
title: eventEmitter
group:
  title: 类
  order: 3
---

## eventEmitter

简单实现的发布订阅事件处理类，同一事件只能监听一次

### API

```ts
function eventEmitter (): EventEmitter;

class EventEmitter {
  static is(ee: any): boolean;

  public eventsList: Record<string, Function>;

  names(): string[]

  once(name: string, ...args: any[]): void

  emit(name: string, ...args: any[]): any

  on(name: string, callback: Function, context: any): void

  off(name: string): void

  offAll(): void
}
```
