interface RequestConfig {
  method?: 'get'| 'post'| 'put'| 'delete'| 'head'| 'options'| 'trace'| 'patch';
  timeout?: number;
  headers?: any;
  dataType?: 'json' | 'text';
  returnAll?: boolean;
  charset?: string;
  report?: boolean;
  cache?: boolean;
  safeMode?: 'none'| 'both'| 'request'| 'response';
  [any: string]: any;
}

interface ResponseReturnAll {
  statusCode: number;
  headers: any;
  body: any;
}

interface ResponseUpload {
  progress: number;
  status: 0 | 1 | 2;
  // 上传状态，数字类型。（0：上传中、1：上传完成、2：上传失败）
  body: any;
}

type ResponseType = ResponseReturnAll | ResponseUpload

interface ResponseError {
  statusCode: number;
  code: 0 | 1 | 2 | 3 | 4;
  // 错误码，数字类型。（0：连接错误、1：超时、2：授权错误、3：数据类型错误、4：不安全的数据）
  msg: string;
  body: any;
}


export class NetworkRequest {
  private baseUrl = '';
  private tag = '';
  private defaultHeaders = {};
  private defaultTimeout = 30;
  private defaultMethod: 'get' = 'get';
  private defaultReturnAll = false;
  private defaultDataType: 'json' = 'json';
  private defaultCharset = 'utf-8';
  private defaultReport = false;
  private defaultCache = false;
  private defaultSafeMode: 'none' = 'none';
  config: RequestConfig;

  constructor(opts = {}) {
    this.config = {
      method: this.defaultMethod,
      timeout: this.defaultTimeout,
      headers: this.defaultHeaders,
      dataType: this.defaultDataType,
      returnAll: this.defaultReturnAll,
      charset: this.defaultCharset,
      report: this.defaultReport,
      cache: this.defaultCache,
      safeMode: this.defaultSafeMode,
      ...opts
    }
  }

  interceptor(opts: any) {
    // 请求拦截器
    return opts
  }

  /**
   * @param ret
   *
   * returnAll 参数传 true 时，内部字段为
   * 
   *     statusCode 状态码，数字类型
   * 
   *     headers 响应头，JSON对象
   * 
   *     body 消息体，即服务器返回的数据。若dataType为json，那么body为JSON对象，否则为字符串
   * 
   *
   * 上传文件时，若 report 字段传 true 返回上传进度时，原服务器返回数据会被放在 body 字段里面，内部字段为
   *
   *     progress 上传进度，0.00-100.00
   * 
   *     status 上传状态，数字类型。（0：上传中、1：上传完成、2：上传失败）
   * 
   *     body 上传完成时，服务器返回的数据。若 dataType 为 json，那么 body 为 JSON 对象，否则为字符串
   * 
   */
  afterReauest(ret: ResponseType) {
    // 请求成功后的回调
    return ret
  }

  /**
   * @param err
   * 
   *    statusCode 网络请求状态码，数字类型
   *    code 错误码，数字类型。（0：连接错误、1：超时、2：授权错误、3：数据类型错误、4：不安全的数据）
   *    msg 错误描述，字符串类型
   *    body 服务器返回的原始数据
   * 
   */
  handleError(err: ResponseError) {
    // 统一的错误处理
    return err
  }

  /**
   * @param opts.method  (可选， 默认 get)
   * get、post、put、delete、head、options、trace、patch
   *
   * @param opts.data (可选， 默认 无)
   * {
   *   stream："",
   *    // 以二进制流的方式提交文件。stream为文件路径（字符串类型）
   *    // 支持绝对路径，以及fs://、cache://、box://等文件路径协议
   *    // 可直接使用其他端API返回的结果，如 api.getPicture 回调的 ret.data 等
   *   body："",
   *    // 以纯文本的方式提交数据，body支持字符串及JSON对象
   *    // 提交JSON对象时，需设置application/json类型的Content-Type头
   *   values：{},
   *    // 以表单方式提交参数（JSON对象）, 如 {"field1": "value1", "field1": "value2"} (直接传JSON对像.)
   *   files：{}
   *    // 以表单方式提交文件，支持多文件上传（JSON对象）,如 {"file": "path"}
   *    // 也支持同一字段对应多文件：{"file":["path1","path2"]}
   *    // 文件路径，支持绝对路径，以及fs://、cache://、box://等文件路径协议
   *    // 可直接使用其他端API返回的结果，如api.getPicture回调的ret.data等.
   * }
   *
   * @param opts.certificate (可选， 默认 无)
   * {
   *   path:'',          // p12证书路径，支持fs://、widget://、cache://等文件路径协议，字符串类型
   *   password:''       // 证书密码，字符串类型
   * }
   *
   * @param opts.safeMode (可选， 默认 none)
   *  none              // 不做数据安全检查
   *  both              // 对请求和响应的数据做安全检查
   *  request           // 对请求数据做安全检查
   *  response          // 对响应的数据做安全检查
   *
   * @param opts.proxy (可选， 默认 无)
   * {
   *   host:          // 服务器地址，字符串类型
   *   port:          // 服务器端口，数字类型
   * }
   */
  request(opts: RequestConfig) {
    this.tag = opts.tag || `ajax-${new Date().getTime()}`
    this.interceptor(opts)
    const options = {
      url: opts.url.startsWith('http')
        ? opts.url
        : `${this.baseUrl}${opts.url}`,
      method: opts.method || this.config.method,
      timeout: opts.timeout || this.config.timeout,
      dataType: opts.dataType || this.config.dataType,
      returnAll: opts.returnAll || this.config.returnAll,
      headers: opts.headers || this.config.headers,
      charset: opts.charset || this.config.charset,
      report: opts.report || this.config.report,
      cache: opts.cache || this.config.cache,
      safeMode: opts.safeMode || this.config.safeMode,
      data: {
        values: opts.data,
        files: opts.files
      },
      certificate: opts.certificate,
      proxy: opts.proxy,
      tag: this.tag
    }
    if (typeof api !== "undefined") {
      return new Promise((resolve, reject) => {
        window.api.ajax(options,
          (ret: ResponseType, err: ResponseError) => {
            if (ret) {
              this.afterReauest(ret)
              return resolve(ret)
            } else {
              this.handleError(err)
              return reject(err)
            }
          }
        )
      })
    } else {
      return fetch(options.url, {
        credentials: 'omit',
        headers: options.headers,
        method: options.method?.toLocaleUpperCase(),
        body: opts.data ? JSON.stringify(opts.data) : undefined,
        mode: 'cors'
      }).then(rs => rs.json())
    }
  }

  get(url: string) {
    return this.request({ url })
  }
  post(url: string, data: any, headers?: any) {
    return this.request({ url, data, headers, method: 'post' })
  }

  setBseUrl(url: string) {
    this.baseUrl = url
  }

  setTag(tag: string) {
    this.tag = tag
  }

  getTag() {
    return this.tag
  }

  cancelAjax(tag: string) {
    window.api.cancelAjax({ tag })
  }
}

export default new NetworkRequest()
