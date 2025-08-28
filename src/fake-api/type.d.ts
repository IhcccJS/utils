export type TObject = Record<string, any>;

export type TDataSource = string | TObject[] | (() => Promise<TObject[]>);

export type TSortFn = (item1: any, item2: any) => any;

export type TGetCurrentTime = () => string;

export type TQueryTypeObject = {
  [key: string]: (source: any, target: any) => boolean;
};

export type TQueryTypeFn = {
  [key: string]: (source: any, target: string) => boolean;
};

export type TQueryType = { [key: string]: keyof TQueryTypeFn };

export type TResponseListData = {
  success: boolean;
  code: string;
  data?: {
    total: number;
    list: TObject[];
  };
  message: string;
  error?: any;
};

export type TResponseData = {
  success: boolean;
  code: string;
  data?: TObject;
  message: string;
  error?: any;
};

export type TResponseList = {
  success: boolean;
  code: string;
  list?: TObject[];
  message: string;
  error?: any;
};

export type TResultType = Record<string, (response: TResponseListData | TResponseData | TResponseList | any) => any>;

export type TFakeApiConfig = {
  key: string;
  queryType: TQueryType;
  queryTypeFn: TQueryTypeFn;
  createTime: string;
  updateTime: string;
  sort: TSortFn;
  timeout: [number, number];
  resultType: TResultType;
  debug: boolean;
};

export type TLinkOption = {
  /** 外键 */
  foreignKey?: string;
  /** 别名 */
  alias?: string;
  /** 源键 */
  sourceKey?: string;
};

export type TLinkOptionItem<T> = {
  /** 是否多个 */
  many: boolean;
  /** 数据表 */
  source: T;
  /** 中间表 */
  // through: T;
  /** 外键 */
  foreignKey: string;
  /** 别名 */
  alias: string;
  /** 源键 */
  sourceKey: string;
};
