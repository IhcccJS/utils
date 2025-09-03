import delay from '../delay/index';
import random from '../random/index';
import { isString } from '../types/index';
import DataTable from './data-table';
import type { TObject, TDataSource, TResponseData, TResponseList, TResponseListData, TFakeApiConfig } from './type.d';

const colorList: TObject = {
  query: '#2196F3',
  create: '#24B588',
  update: '#673AB7',
  remove: '#F44336',
  profile: '#00BCD4',
  list: '#795548',
  request: '#E91E63',
};

const cssStyle = (type: string) => {
  return `color: #fff;padding: 2px 8px 2px 2px;background: ${colorList[type]};border-radius: 2px;`;
};

/**
 * 模拟数据列表
 * @param {*} initData 初始列表
 * @param {*} opts 配置
 */
class FakeApi extends DataTable {
  debug: boolean;
  constructor(dataSource: TDataSource | DataTable, config: TFakeApiConfig) {
    super(dataSource, config);
    const opts = Object.assign({ debug: false }, config);
    this.debug = opts.debug;
  }
  async _baseQuery(params: TObject = {}, format?: Function): Promise<TResponseListData> {
    await this.lazyInit();
    let result: TResponseListData;
    try {
      const data = this.querySync(params);

      result = this.resultType.query({
        success: true,
        code: '0',
        data: !format ? data : format(data),
        message: '查询成功！',
      });
    } catch (error) {
      result = this.resultType.query({ success: false, code: '-1', message: '查询失败！', error });
    }

    await delay(random(...this.timeout));

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
  async _baseCreate(params: TObject = {}, format?: Function): Promise<TResponseData> {
    await this.lazyInit();
    let result: TResponseData;
    try {
      const data: TObject = this.createSync(params);
      result = this.resultType.create({
        success: true,
        code: '0',
        message: '新增成功！',
        data: !format ? data : format(data),
      });
    } catch (error) {
      result = this.resultType.create({ success: false, code: '-1', message: '新增失败！', error });
    }

    await delay(random(...this.timeout));

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
  async _baseUpdate(params: TObject = {}, format?: Function): Promise<TResponseData> {
    await this.lazyInit();
    let result: TResponseData;
    try {
      const data = this.updateSync(params);

      if (!!data) {
        result = this.resultType.update({
          success: true,
          code: '0',
          message: '更新成功！',
          data: !format ? data : format(data),
        });
      } else {
        result = this.resultType.update({ success: false, code: '1', message: '没有此项！', data });
      }
    } catch (error) {
      result = this.resultType.update({ success: false, code: '-1', message: '更新失败！', error });
    }

    await delay(random(...this.timeout));

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
  async _baseRemove(params: TObject = {}): Promise<TResponseData> {
    await this.lazyInit();
    let result: TResponseData;
    try {
      this.removeSync(params);
      result = this.resultType.remove({ success: true, code: '0', message: '删除成功！' });
    } catch (error) {
      result = this.resultType.remove({ success: false, code: '-1', message: '删除失败！', error });
    }

    await delay(random(...this.timeout));

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
  async _baseProfile(params: TObject = {}, format?: Function): Promise<TResponseData> {
    await this.lazyInit();
    let result: TResponseData;
    try {
      const data = this.profileSync(params);

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
              data: !format ? data : format(data),
              message: '查询成功！',
            },
      );
    } catch (error) {
      result = this.resultType.profile({ success: false, code: '-1', message: '查询失败！', error });
    }
    await delay(random(...this.timeout));

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
  async _baseList(params: TObject = {}, format?: Function): Promise<TResponseList> {
    await this.lazyInit();
    let result: TResponseList;
    try {
      const list = this.listSync(params);
      result = this.resultType.list({
        success: true,
        code: '0',
        list: !format ? list : format(list),
        message: '查询成功！',
      });
    } catch (error) {
      result = this.resultType.list({ success: false, code: '-1', message: '查询失败！', error });
    }

    await delay(random(...this.timeout));

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
  /** 分页 */
  query(params: TObject = {}): Promise<TResponseListData> {
    return this._baseQuery(params);
  }
  /** 新增 */
  create(params: TObject = {}): Promise<TResponseData> {
    return this._baseCreate(params);
  }
  /** 更新 */
  update(params: TObject = {}): Promise<TResponseData> {
    return this._baseUpdate(params);
  }
  /** 删除 */
  remove(params: TObject = {}): Promise<TResponseData> {
    return this._baseRemove(params);
  }
  /** 详情 */
  profile(params: TObject = {}): Promise<TResponseData> {
    return this._baseProfile(params);
  }
  /** 列表 */
  list(params: TObject = {}): Promise<TResponseList> {
    return this._baseList(params);
  }
  /** 查询关联表 */
  async getLinked(foreignKey: string, params: TObject = {}) {
    let result;
    try {
      const data = this.profileSync(params);

      const linked = await this.getItemLinked({ [foreignKey]: data[foreignKey] });

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
              data: Object.values(linked)[0],
              message: '查询成功！',
            },
      );
    } catch (error) {
      result = this.resultType.profile({ success: false, code: '-1', message: '查询失败！', error });
    }

    await delay(random(...this.timeout));

    if (this.debug) {
      console.log('result: ', result);
    }

    return result;
  }
  /** 分页带关联 */
  queryWith(params: TObject = {}) {
    return this._baseQuery(params, async (data: any) => ({
      ...data,
      list: data.list.map((item: TObject) => this.getItemLinked(item)),
    }));
  }
  /** 新增带关联 */
  createWith(params: TObject = {}) {
    return this._baseCreate(params, async (item: TObject) => this.updateItemLinked(item));
  }
  /** 更新带关联 */
  updateWith(params: TObject = {}) {
    return this._baseUpdate(params, async (item: TObject) => this.updateItemLinked(item));
  }
  /** 删除带关联 */
  removeWith(params: TObject = {}) {
    let idArray = params[this.key] || [];
    if (isString(idArray)) idArray = idArray.split(',');
    const removeItems = this._list.filter((item) => idArray.includes(item[this.key]));
    removeItems.forEach((item) => this.removeItemLinked(item));
    return this._baseRemove(params);
  }
  /** 查询详情带关联 */
  profileWith(params: TObject = {}) {
    return this._baseProfile(params, async (data: any) => this.getItemLinked(data));
  }
  /** 列表带关联 */
  listWith(params: TObject = {}) {
    return this._baseList(params, async (list: any) => list.map((item: TObject) => this.getItemLinked(item)));
  }
  /** 任意响应内容 */
  async request(response: any): Promise<any> {
    const result: any = this.resultType.request(response);

    await delay(random(...this.timeout));

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
