import RequestBase, {
  RequestConfigAPICloud,
  RequestConfig,
  ResponseError,
  ResponseType,
} from './model'
import axios, { CancelTokenSource, AxiosRequestConfig } from 'axios'
import { isHttpUrl } from '../utils'

class NetworkRequest implements RequestBase {
  private baseUrl = ''
  private tag: string | CancelTokenSource = ''
  public requestOptions: RequestConfig | RequestConfigAPICloud

  constructor(opts?: RequestConfig) {
    this.requestOptions = {
      url: '',
      headers: {},
      method: 'get',
      timeout: 30,
      dataType: 'json',
      returnAll: false,
      charset: 'utf-8',
      report: false,
      cache: false,
      safeMode: 'none',
      ...opts,
    }
  }

  interceptor(opts: RequestConfig) {
    return !!opts
  }

  afterRequest(ret: ResponseType) {
    return ret
  }

  handleError(err: ResponseError): void {
    if (err) {
    }
  }

  readyForRequest(opts: RequestConfig) {
    return new Promise<RequestConfigAPICloud>((resolve) => {
      this.tag = opts.tag || this.tag || `ajax-${new Date().getTime()}`
      this.requestOptions = {
        ...this.requestOptions,
        ...opts,
        tag: this.tag,
        url: isHttpUrl(opts.url) ? opts.url : `${this.baseUrl}${opts.url}`,
        data: {
          values: opts.data,
          files: opts.files,
          stream: opts.stream,
          body: opts.body,
        },
      }
      resolve(this.requestOptions as RequestConfigAPICloud)
    })
  }

  requestForClient(opts: RequestConfigAPICloud) {
    const isContinue = this.interceptor(opts)
    if (!isContinue) {
      return new Promise<any>((resolve, reject) =>
        reject('The request is intercepted by interceptor')
      )
    }
    return new Promise<ResponseType>((resolve, reject) => {
      window.api.ajax(opts, (ret: ResponseType, err: ResponseError) => {
        if (ret) {
          return resolve(this.afterRequest(ret))
        } else {
          return reject(err)
        }
      })
    })
  }

  requestForBrower(opts: RequestConfigAPICloud) {
    this.tag =
      typeof this.tag === 'string' ? axios.CancelToken.source() : this.tag
    this.requestOptions.tag = this.tag
    const isContinue = this.interceptor(opts)
    if (!isContinue) {
      return new Promise<any>((resolve, reject) =>
        reject('The request is intercepted by interceptor')
      )
    }
    const axiosRequestConfig: AxiosRequestConfig = {
      url: opts.url,
      method: opts.method,
      baseURL: this.baseUrl,
      headers: opts.headers,
      data: (opts.data && (opts.data.values || opts.data.body)),
      timeout: (opts.timeout || 30) * 1000,
      proxy: opts.proxy,
      cancelToken: (this.tag as CancelTokenSource).token,
    }
    return axios
      .request(axiosRequestConfig)
      .then((rs) => this.afterRequest(rs.data))
  }

  request(opts: RequestConfig) {
    return this.readyForRequest(opts)
      .then((requestOptions) =>
        typeof api !== 'undefined'
          ? this.requestForClient(requestOptions)
          : this.requestForBrower(requestOptions)
      )
      .catch((err) => this.handleError(err))
  }

  get(url: string, data?: Record<string, string | number | boolean>) {
    if (data) {
      const params = Object.entries(data)
        .filter((e) => String(e[1]).trim() !== '')
        .map((e) => `${e[0]}=${e[1]}`)
        .join('&')
      url = `${url}?${params}`
    }
    return this.request({ url })
  }

  post(url: string, data: any, headers?: any) {
    return this.request({ url, data, headers, method: 'post' })
  }

  setBaseUrl(url: string) {
    this.baseUrl = url
  }

  setTag(tag?: string) {
    if (typeof api !== 'undefined' && tag) {
      this.tag = tag
    } else {
      this.tag = axios.CancelToken.source()
    }
  }

  getTag() {
    return this.tag
  }

  cancelAjax(tag: string, msg?: string) {
    if (typeof api !== 'undefined') {
      window.api.cancelAjax({ tag })
    } else {
      ;(this.tag as CancelTokenSource).cancel(msg)
    }
  }
}

export { NetworkRequest }
export default new NetworkRequest()
