export interface TOptions {
  [key: string]: any;
}

export interface TSetHeaderOptions extends TOptions {
  withHeader: boolean;
}

export interface TToFormData extends TOptions {
  formData: boolean;
}

export interface TChangePageParams extends TOptions {
  useLimit: boolean;
}

export interface TPageParams {
  pageNumber: number;
  pageSize: number;
}

export interface TPaths {
  default: string;
  [url: string]: string[];
}

export interface TTransformed {
  [url: string]: string;
}

export interface TGetServerPath extends TOptions {}
