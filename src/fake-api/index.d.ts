export type TObject = { [k: string]: any };

export type TSortFn = (item1: any, item2: any) => any;

export type TQueryTypeObject = {
  [key: string]: (source: any, target: any) => boolean;
};

export type TQueryType = { [key: string]: 'is' | 'like' };

export interface TFakeApiConfig {
  key: string;
  queryType: TqueryType;
  createTime: string;
  updateTime: string;
  sort: TSortFn;
  timeout: [number, number];
  debug: boolean;
}

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
