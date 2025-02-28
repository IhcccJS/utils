import delay from '../delay/index';
import { isArray, isFunction } from '../types/index';
import random from '../random/index';
import uuid from '../uuid/index';
import type {
  TObject,
  TQueryType,
  TQueryTypeFn,
  TQueryTypeObject,
  TResponseData,
  TResponseList,
  TResponseListData,
  TSortFn,
  TResultType,
  TFakeApiConfig,
} from './index.d';

const colorList: TObject = {
  query: '#2196F3',
  create: '#24B588',
  update: '#673AB7',
  remove: '#F44336',
  profile: '#00BCD4',
  list: '#795548',
  request: '#E91E63',
};

const rnd = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

const defaultDueryTypeFn: TQueryTypeObject = {
  like: (source: any, target: string): boolean => source?.match(target),
  is: (source: any, target: any): boolean => source === target,
};

const defaultResultType: TResultType = {
  query: (res) => res,
  create: (res) => res,
  update: (res) => res,
  remove: (res) => res,
  profile: (res) => res,
  list: (res) => res,
  request: (res) => res,
};

const defaultSort: TSortFn = (x, y) => (new Date(y.updateTime) as any) - (new Date(x.updateTime) as any);

const cssStyle = (type: string) => {
  return `color: #fff;padding: 2px 8px 2px 2px;background: ${colorList[type]};border-radius: 2px;`;
};

const getCurrentTime = () => new Date().toLocaleString('zh', { hour12: false });

/**
 * 模拟数据列表
 * @param {*} initData 初始列表
 * @param {*} opts 配置
 */
class FakeApi {
  private _list: TObject[];
  key: string;
  queryType: TQueryType;
  queryTypeFn: TQueryTypeFn;
  createTime: string;
  updateTime: string;
  sort: TSortFn;
  timeout: [number, number];
  resultType: TResultType;
  debug: boolean;
  constructor(defaultData: TObject[], config: TFakeApiConfig) {
    const opts = Object.assign(
      {
        key: 'id',
        queryType: {},
        createTime: 'createTime',
        updateTime: 'updateTime',
        sort: defaultSort,
        timeout: [100, 500],
        debug: false,
      },
      config,
    );
    this._list = [];
    this.key = opts.key;
    this.queryType = opts.queryType;
    this.queryTypeFn = Object.assign({}, defaultDueryTypeFn, opts.queryTypeFn);
    this.createTime = opts.createTime;
    this.updateTime = opts.updateTime;
    this.sort = opts.sort;
    this.timeout = opts.timeout;
    this.resultType = Object.assign({}, defaultResultType, opts.resultType);
    this.debug = opts.debug;
    this.init(defaultData);
  }
  init(defaultData: TObject[]) {
    if (isArray(defaultData)) {
      const extProperty: TObject = {};
      let time = null;
      if (!!this.createTime || !!this.updateTime) time = getCurrentTime();
      if (!!this.createTime) extProperty[this.createTime] = time;
      if (!!this.updateTime) extProperty[this.updateTime] = time;
      this._list = defaultData.map((item) => {
        if (!item[this.key]) extProperty[this.key] = uuid();
        return Object.assign({}, item, extProperty);
      });
    }
  }
  /** 根据查询条件搜索列表 */
  search(params: TObject = {}): TObject[] {
    let _list = [...this._list];

    const queryKeys = Object.keys(this.queryType);

    if (queryKeys.length > 0) {
      let currentQuery: any = null;
      queryKeys.forEach((key) => {
        if (params[key] !== void 0) {
          currentQuery = this.queryTypeFn[this.queryType[key]];
          if (isFunction(currentQuery)) {
            _list = _list.filter((item) => currentQuery(item[key] || '', params[key]));
          }
        }
      });
    }

    return _list;
  }
  /**
   * 查询
   */
  async query(params: TObject = {}): Promise<TResponseListData> {
    let result: TResponseListData;
    try {
      let { pageNumber = 1, pageSize = 10 } = params;
      let _list = this.search(params);

      const total = _list.length;

      pageSize = Math.min(pageSize, 65535);
      pageNumber = Math.min(pageNumber, Math.ceil(total / pageSize));
      pageNumber = Math.max(pageNumber, 1);

      _list = _list.sort(this.sort).splice((pageNumber - 1) * pageSize, pageSize);

      await delay(rnd(...this.timeout));

      result = this.resultType.query({
        success: true,
        code: '0',
        data: { total, list: _list },
        message: '查询成功！',
      });
    } catch (error) {
      result = this.resultType.query({ success: false, code: '-1', message: '查询失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c query', cssStyle('query'));
      console.group('参数列表：');
      console.log(JSON.stringify(params, null, 2));
      console.groupEnd();
      console.group('结果：');
      console.log('result: ', result);
      if (result?.data?.list) console.table(result.data.list);
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  /**
   * 新增
   */
  async create(params: TObject = {}): Promise<TResponseData> {
    let result: TResponseData;
    try {
      const newItem: TObject = { ...params };
      let time = null;
      if (!!this.createTime || !!this.updateTime) time = getCurrentTime();
      if (!!this.createTime) newItem[this.createTime] = time;
      if (!!this.updateTime) newItem[this.updateTime] = time;
      if (!newItem[this.key]) newItem[this.key] = uuid();

      this._list.unshift(newItem);

      await delay(rnd(...this.timeout));

      result = this.resultType.create({ success: true, code: '0', message: '新增成功！', data: newItem });
    } catch (error) {
      result = this.resultType.create({ success: false, code: '-1', message: '新增失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c create', cssStyle('create'));
      console.group('参数列表：');
      console.log(JSON.stringify(params, null, 2));
      console.groupEnd();
      console.group('结果：');
      console.log(JSON.stringify(result, null, 2));
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  /**
   * 更新
   */
  async update(params: TObject = {}): Promise<TResponseData> {
    let result: TResponseData;
    try {
      const newItem: TObject = { ...params };
      const key = newItem[this.key];

      const item = this._list.find((item) => item[this.key] === key);

      if (!!item) {
        if (!!this.updateTime) newItem[this.updateTime] = getCurrentTime();

        const index = this._list.indexOf(item);

        const data = Object.assign({}, item, newItem);

        this._list.splice(index, 1, data);

        await delay(rnd(...this.timeout));

        result = this.resultType.update({ success: true, code: '0', message: '更新成功！', data });
      } else {
        await delay(rnd(...this.timeout));
        result = this.resultType.update({ success: false, code: '1', message: '没有此项！', data: null });
      }
    } catch (error) {
      result = this.resultType.update({ success: false, code: '-1', message: '更新失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c update', cssStyle('update'));
      console.group('参数列表：');
      console.log(JSON.stringify(params, null, 2));
      console.groupEnd();
      console.group('结果：');
      console.log(JSON.stringify(result, null, 2));
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  /**
   * 删除
   */
  async remove(params: TObject = {}): Promise<TResponseData> {
    let result: TResponseData;
    try {
      const idArray = params[this.key]?.split(',');
      this._list = this._list.filter((item) => !idArray.includes(item[this.key]));

      await delay(rnd(...this.timeout));

      result = this.resultType.remove({ success: true, code: '0', message: '删除成功！' });
    } catch (error) {
      result = this.resultType.remove({ success: false, code: '-1', message: '删除失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c remove', cssStyle('remove'));
      console.group('参数列表：');
      console.log(JSON.stringify(params, null, 2));
      console.groupEnd();
      console.group('结果：');
      console.log(JSON.stringify(result, null, 2));
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  /**
   * 随机获取查询结果的一项
   */
  pick(params: TObject = {}): TObject {
    let _list: any[] = this.search(params);
    return random(_list);
  }
  /**
   * 获取某一项
   */
  getItem(params: TObject = {}): TObject {
    return this.search(params)[0];
  }
  /**
   * 详情
   */
  async profile(params: TObject = {}): Promise<TResponseData> {
    let result: TResponseData;
    try {
      await delay(rnd(...this.timeout));

      const data = this.getItem(params);

      result = this.resultType.profile(
        !data
          ? {
              success: false,
              code: '1',
              message: '查询失败，没有此结果！',
            }
          : {
              success: true,
              code: '0',
              data: { ...data },
              message: '查询成功！',
            },
      );
    } catch (error) {
      result = this.resultType.profile({ success: false, code: '-1', message: '查询失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c profile', cssStyle('profile'));
      console.group('参数列表：');
      console.log(JSON.stringify(params, null, 2));
      console.groupEnd();
      console.group('结果：');
      console.log(JSON.stringify(result, null, 2));
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  /**
   * 获取完整列表
   */
  getList(params: TObject = {}): TObject[] {
    return this.search(params);
  }
  /**
   * 列表
   */
  async list(params: TObject = {}): Promise<TResponseList> {
    let result: TResponseList;
    try {
      await delay(rnd(...this.timeout));
      result = this.resultType.list({
        success: true,
        code: '0',
        list: this.getList(params),
        message: '查询成功！',
      });
    } catch (error) {
      result = this.resultType.list({ success: false, code: '-1', message: '查询失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c list', cssStyle('list'));
      console.group('结果：');
      console.log('result: ', result);
      if (result.list) console.table(result?.list);
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
  async request(response: TObject): Promise<TObject> {
    let result: TObject;
    try {
      await delay(rnd(...this.timeout));
      result = this.resultType.request({ ...response });
    } catch (error) {
      result = this.resultType.request({ success: false, code: '-1', message: '查询失败！', error });
    }

    if (this.debug) {
      console.groupCollapsed('%c request', cssStyle('request'));
      console.group('结果：');
      console.log('result: ', response);
      console.groupEnd();
      console.groupEnd();
    }

    return result;
  }
}

export default FakeApi;
