import { isNull, isUndefined } from './index';

test('null 是否是 Null 类型？', () => {
  expect(isNull(null)).toBe(true);
});

test('对象 {} 是否是 Null 类型？', () => {
  expect(isNull({})).toBe(false);
});

test('void 0 是否是 undefined 类型？', () => {
  expect(isUndefined(void 0)).toBe(true);
});

test('对象 {} 是否是 undefined 类型？', () => {
  expect(isUndefined({})).toBe(false);
});
