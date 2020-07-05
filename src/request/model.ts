import { CancelTokenSource } from 'axios'

export default interface RequestBase {
  interceptor(opts: RequestConfig): boolean;
  request(opts: RequestConfig): Promise<any>;
  afterRequest(ret: ResponseType): ResponseType;
  handleError(err: ResponseError): void;
}

/**
 * 以下字段除了 values 和 files 可以同时使用，其它参数都不能同时使用。
 */
export interface RequestDataConfig {
  /**
   * 以表单方式提交参数（JSON对象）, 如 {"field1": "value1", "field1": "value2"} (直接传JSON对像.)
   */
  values?: Record<string, any>;
  /**
   * 以表单方式提交文件，支持多文件上传（JSON对象）,如 {"file": "path"}，也支持同一字段对应多文件：{"file":["path1","path2"]}。文件路径，支持绝对路径，以及fs://、cache://、box://等文件路径协议。可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等.
   */
  files?: Record<string, string | string[]>;
  /**
   * 以二进制流的方式提交文件。stream为文件路径（字符串类型），支持绝对路径，以及fs://、cache://、box://等文件路径协议。可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等
   */
  stream?: string;
  /**
   * 以纯文本的方式提交数据，body支持字符串及JSON对象（若要校验数据完整性，需将JSON对象转换成字符串再传入）。提交JSON对象时，需设置application/json类型的Content-Type头
   */
  body?: Record<string, any> | string;
}

export interface RequestBaseConfig {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'patch';
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
  safeMode?: 'none' | 'both' | 'request' | 'response';
  proxy?: {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
    protocol?: string;
  };
}

export interface RequestConfig extends RequestBaseConfig {
  /**
   * 以表单方式提交参数（JSON对象）, 如 {"field1": "value1", "field1": "value2"} (直接传JSON对像.)
   */
  data?: any;
  /**
   * 以表单方式提交参数（JSON对象）, 如 {"field1": "value1", "field1": "value2"} (直接传JSON对像.)
   */
  body?: Record<string, any> | string;
  /**
   * 以表单方式提交文件，支持多文件上传（JSON对象）,如 {"file": "path"}，也支持同一字段对应多文件：{"file":["path1","path2"]}。文件路径，支持绝对路径，以及fs://、cache://、box://等文件路径协议。可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等.
   */
  files?: Record<string, string | string[]>;
  /**
   * 以二进制流的方式提交文件。stream为文件路径（字符串类型），支持绝对路径，以及fs://、cache://、box://等文件路径协议。可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等
   */
  stream?: string;  
  tag?: string | CancelTokenSource;
  [any: string]: any;
}

export interface RequestConfigAPICloud extends RequestBaseConfig {  
  tag?: string;
  data?: RequestDataConfig;
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
