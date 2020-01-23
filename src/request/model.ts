export interface RequestConfig {
  url: string;
  data?: any;
  method?: 'get'| 'post'| 'put'| 'delete'| 'head'| 'options'| 'patch';
  /**
   * 超时时间
   * 单位：秒
   */
  timeout?: number;
  headers?: any;
  dataType?: 'json' | 'text';
  returnAll?: boolean;
  charset?: string;
  report?: boolean;
  cache?: boolean;
  safeMode?: 'none'| 'both'| 'request'| 'response';
  proxy?: {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
    protocol?: string;
  };
  [any: string]: any;
}

export interface ResponseReturnAll {
  statusCode?: number;
  headers?: any;
  body?: any;
}

export interface ResponseUpload {
  progress?: number;
  status?: 0 | 1 | 2;
  // 上传状态，数字类型。（0：上传中、1：上传完成、2：上传失败）
  body?: any;
}

export interface ResponseType extends ResponseReturnAll, ResponseUpload {
  [any: string]: any;
}

export interface ResponseError {
  statusCode: number;
  code: 0 | 1 | 2 | 3 | 4;
  // 错误码，数字类型。（0：连接错误、1：超时、2：授权错误、3：数据类型错误、4：不安全的数据）
  msg: string;
  body: any;
}
