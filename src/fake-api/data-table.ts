import { isArray, isFunction, isString } from '../types/index';
import random from '../random/index';
import uuid from '../uuid/index';
import type {
  TObject,
  TDataSource,
  TQueryType,
  TQueryTypeFn,
  TQueryTypeObject,
  TSortFn,
  TGetCurrentTime,
  TResultType,
  TFakeApiConfig,
  TLinkOption,
  TLinkOptionItem,
} from './type.d';

const defaultDueryTypeFn: TQueryTypeObject = {
  like: (source: any, target: string): boolean => source?.match(target),
  is: (source: any, target: any): boolean => source == target,
  equal: (source: any, target: any): boolean => source === target,
  include: (source: any[], target: any): boolean => (source || []).includes(target),
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

const defaultGetCurrentTime: TGetCurrentTime = () => new Date().toLocaleString('zh', { hour12: false });

let tableId = 0;
/**
 * 模拟数据列表
 * @param {*} initData 初始列表
 * @param {*} opts 配置
 */
class DataTable {
  name: string;
  _list: TObject[];
  key: string;
  queryType: TQueryType;
  queryTypeFn: TQueryTypeFn;
  createTime: string;
  updateTime: string;
  sort: TSortFn;
  getCurrentTime: TGetCurrentTime;
  timeout: [number, number];
  resultType: TResultType;
  /** 关联关系 */
  links: TLinkOptionItem<DataTable>[];
  /** 关联表 */
  linkTables: DataTable[];
  format: null | Function;
  dataSource: TDataSource | DataTable;
  lazyLoad: boolean;
  constructor(dataSource: TDataSource | DataTable, config: TFakeApiConfig) {
    const opts = Object.assign(
      {
        key: 'id',
        name: '表' + tableId++,
        queryType: {},
        createTime: 'createTime',
        updateTime: 'updateTime',
        sort: defaultSort,
        getCurrentTime: defaultGetCurrentTime,
        timeout: [100, 500],
        format: null,
        lazyLoad: false,
      },
      config,
    );
    this._list = [];

    this.name = opts.name;
    this.key = opts.key;
    this.queryType = opts.queryType;
    this.queryTypeFn = Object.assign({}, defaultDueryTypeFn, opts.queryTypeFn);
    this.createTime = opts.createTime;
    this.updateTime = opts.updateTime;
    this.sort = opts.sort;
    this.getCurrentTime = opts.getCurrentTime;
    this.timeout = opts.timeout;
    this.resultType = Object.assign({}, defaultResultType, opts.resultType);
    this.format = opts.format;
    this.links = [];
    this.linkTables = [];
    this.lazyLoad = false;
    this.dataSource = '';
    if (isArray(dataSource)) {
      this.init(dataSource as TObject[]);
    } else {
      this.dataSource = dataSource;
      this.lazyLoad = true;
    }
  }
  /** 表是否为空 */
  isEmpty() {
    return this._list.length === 0;
  }
  /** 初始化数据 */
  init(defaultData: TObject[]) {
    if (isArray(defaultData)) {
      const extProperty: TObject = {};
      let time = null;
      if (!!this.createTime || !!this.updateTime) time = this.getCurrentTime();
      if (!!this.createTime) extProperty[this.createTime] = time;
      if (!!this.updateTime) extProperty[this.updateTime] = time;
      this._list = defaultData.map((item) => {
        if (!item[this.key]) extProperty[this.key] = uuid();
        return Object.assign({}, item, extProperty);
      });
      if (!!this.format) this._list = this.format(this._list);
    }
  }
  /** 加载数据 */
  async lazyInit() {
    if (this.lazyLoad && this.isEmpty()) {
      if (isString(this.dataSource)) {
        this.init(await fetch(this.dataSource as unknown as string).then((res) => res.json()));
      } else if (this.dataSource instanceof DataTable) {
        if (this.dataSource.isEmpty()) await this.dataSource.lazyInit();
        this.init(this.dataSource._list);
      } else if (isFunction(this.dataSource)) {
        this.init(await (this.dataSource as Function)());
      }
    }
  }
  /** 建立单条关联 */
  hasOne(source: DataTable, option: TLinkOption = {}) {
    if (!(source instanceof DataTable)) throw new Error('source type error!');
    const foreignKey = option.foreignKey || this.key;
    const alias = option.alias || foreignKey;
    const sourceKey = option.sourceKey || source.key;
    this.links.push({ many: false, source, alias, foreignKey, sourceKey });
    if (!this.linkTables.includes(source)) this.linkTables.push(source);
  }
  /** 建立多条关联 */
  hasMany(source: DataTable, option: TLinkOption = {}) {
    if (!(source instanceof DataTable)) throw new Error('source type error!');
    const foreignKey = option.foreignKey || this.key;
    const alias = option.alias || foreignKey;
    const sourceKey = option.sourceKey || source.key;
    this.links.push({ many: true, source, alias, foreignKey, sourceKey });
    if (!this.linkTables.includes(source)) this.linkTables.push(source);
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
  /** 查询-同步 */
  querySync(params: TObject = {}) {
    let { pageNumber = 1, pageSize = 10, ...restParams } = params;
    let list = this.search(restParams);

    const total = list.length;

    pageSize = Math.min(pageSize, 65535);
    pageNumber = Math.min(pageNumber, Math.ceil(total / pageSize));
    pageNumber = Math.max(pageNumber, 1);

    list = list.sort(this.sort).splice((pageNumber - 1) * pageSize, pageSize);

    return { total, list };
  }
  /** 新增-同步 */
  createSync(params: TObject = {}, format?: Function) {
    let newItem: TObject = { ...params };
    let time = null;
    if (!!this.createTime || !!this.updateTime) time = this.getCurrentTime();
    if (!!this.createTime) newItem[this.createTime] = time;
    if (!!this.updateTime) newItem[this.updateTime] = time;
    if (!newItem[this.key]) newItem[this.key] = uuid();

    newItem = !format ? newItem : format(newItem);
    this._list.unshift(newItem);

    return newItem;
  }
  /** 更新-同步 */
  updateSync(params: TObject = {}, format?: Function) {
    let newItem: TObject = { ...params };
    const data = this._list.find((item) => item[this.key] === newItem[this.key]);
    if (!!data) {
      if (!!this.updateTime) newItem[this.updateTime] = this.getCurrentTime();
      const index = this._list.indexOf(data);
      let updateData = Object.assign({}, data, newItem);
      updateData = !format ? updateData : format(updateData);
      this._list.splice(index, 1, updateData);
      return updateData;
    }

    return data;
  }
  /** 删除-同步 */
  removeSync(params: TObject = {}) {
    const idArray = params[this.key]?.split(',');
    this._list = this._list.filter((item) => !idArray.includes(item[this.key]));
  }
  /** 详情-同步 */
  profileSync(params: TObject = {}) {
    return this.search(params)[0];
  }
  /** 获取某一项 */
  getItem(params: TObject = {}): TObject {
    return this.search(params)[0];
  }
  /** 列表-同步 */
  listSync(params: TObject = {}) {
    return this.search(params);
  }
  /** 获取完整列表 */
  getList(params: TObject = {}): TObject[] {
    return this.search(params);
  }
  /** 随机获取查询结果的一项 */
  pick(params: TObject = {}, count: number = 1): null | TObject | TObject[] {
    if (count <= 0) return null;
    const list: any[] = this.search(params);
    if (count === 1) return random(list);
    return list.sort(() => Math.random() - 0.5).slice(0, count);
  }
  /** 数据项获取关联数据 */
  async getItemLinked(item: TObject = {}) {
    await Promise.all(this.linkTables.map((table) => table.lazyInit()));
    const result = { ...item };
    for (const link of this.links) {
      if (!item[link.foreignKey]) continue;
      if (link.many) {
        result[link.alias] = [];
        if (!Array.isArray(item[link.foreignKey])) continue;
        result[link.alias] = (item[link.foreignKey] || [])
          .map((key: any) => link.source.getItem({ [link.sourceKey]: key }))
          .filter((item: any) => !!item);
      } else {
        result[link.alias] = link.source.getItem({ [link.sourceKey]: item[link.foreignKey] });
      }
    }
    return result;
  }
  /** 更新关联表数据，更新此表数据自动更新关联表中关于此表更新项的数据 */
  async updateItemLinked(item: TObject = {}) {
    await Promise.all(this.linkTables.map((table) => table.lazyInit()));
    for (const link of this.links) {
      const linkTable = link.source;
      // 关联表的配置包含此表，说明是双向绑定的表
      if ((linkTable.linkTables || []).includes(this)) {
        // 双向绑定的表，此表数据更新，也会修改关联表数据
        const linkThis = linkTable.links.find((item: TLinkOptionItem<DataTable>) => item.source === this);
        if (!linkThis) continue;

        // 此表是多个，关联表是多个
        if (link.many && linkThis.many) {
          // 获取当前表外键数据，更新关联表数据，此时关联表数据应该为数组
          const values = item[link.foreignKey] || [];
          for (const value of values) {
            const profile = linkTable.getItem({ [link.sourceKey]: value });
            const updateData = { [linkThis.foreignKey]: profile[linkThis.foreignKey] };
            if (!updateData[linkThis.foreignKey]) updateData[linkThis.foreignKey] = [];
            updateData[linkThis.foreignKey].push(item[linkThis.sourceKey]);
            linkTable.updateSync({ ...profile, ...updateData });
          }
        }

        // 此表是多个，关联表是单个
        if (link.many && !linkThis.many) {
          // 获取当前表外键数据，更新关联表数据，此时关联表数据应该为值
          const values = item[link.foreignKey] || [];
          for (const value of values) {
            const profile = linkTable.getItem({ [link.sourceKey]: value });
            const updateData = { [linkThis.foreignKey]: item[linkThis.sourceKey] };
            linkTable.updateSync({ ...profile, ...updateData });
          }
        }

        // 此表是单个，关联表是多个
        if (!link.many && linkThis.many) {
          const value = item[link.foreignKey];
          const profile = linkTable.getItem({ [link.sourceKey]: value });
          const updateData = { [linkThis.foreignKey]: profile[linkThis.foreignKey] };
          if (!updateData[linkThis.foreignKey]) updateData[linkThis.foreignKey] = [];
          updateData[linkThis.foreignKey].push(item[linkThis.sourceKey]);
          linkTable.updateSync({ ...profile, ...updateData });
        }

        // 此表是单个，关联表是单个
        if (!link.many && !linkThis.many) {
          const value = item[link.foreignKey];
          const profile = linkTable.getItem({ [link.sourceKey]: value });
          const updateData = { [linkThis.foreignKey]: item[linkThis.sourceKey] };
          linkTable.updateSync({ ...profile, ...updateData });
        }
      }
    }
  }
  /** 删除关联表数据，删除此表数据自动删除关联表中关于此表删除项的数据 */
  async removeItemLinked(item: TObject = {}) {
    await Promise.all(this.linkTables.map((table) => table.lazyInit()));
    for (const link of this.links) {
      const linkTable = link.source;
      // 关联表的配置包含此表，说明是双向绑定的表
      if ((linkTable.linkTables || []).includes(this)) {
        // 双向绑定的表，此表数据更新，也会修改关联表数据
        const linkThis = linkTable.links.find((item: TLinkOptionItem<DataTable>) => item.source === this);
        if (!linkThis) continue;

        // 此表是多个，关联表是多个
        if (link.many && linkThis.many) {
          // 获取当前表外键数据，删除关联表数据，此时关联表数据应该为数组
          const values = item[link.foreignKey] || [];
          for (const value of values) {
            const profile = linkTable.getItem({ [link.sourceKey]: value });
            const updateData = {
              [linkThis.foreignKey]: (profile[linkThis.foreignKey] || []).filter(
                (val: any) => val === item[linkThis.sourceKey],
              ),
            };
            linkTable.updateSync({ ...profile, ...updateData });
          }
        }

        // 此表是多个，关联表是单个
        if (link.many && !linkThis.many) {
          // 获取当前表外键数据，删除关联表数据，此时关联表数据应该为值
          const values = item[link.foreignKey] || [];
          for (const value of values) {
            const profile = linkTable.getItem({ [link.sourceKey]: value });
            const updateData = { [linkThis.foreignKey]: null };
            linkTable.updateSync({ ...profile, ...updateData });
          }
        }

        // 此表是单个，关联表是多个
        if (!link.many && linkThis.many) {
          const value = item[link.foreignKey];
          const profile = linkTable.getItem({ [link.sourceKey]: value });
          const updateData = {
            [linkThis.foreignKey]: (profile[linkThis.foreignKey] || []).filter(
              (val: any) => val === item[linkThis.sourceKey],
            ),
          };
          linkTable.updateSync({ ...profile, ...updateData });
        }

        // 此表是单个，关联表是单个
        if (!link.many && !linkThis.many) {
          const value = item[link.foreignKey];
          const profile = linkTable.getItem({ [link.sourceKey]: value });
          const updateData = { [linkThis.foreignKey]: null };
          linkTable.updateSync({ ...profile, ...updateData });
        }
      }
    }
  }
}

export default DataTable;
