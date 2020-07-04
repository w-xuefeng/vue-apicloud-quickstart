import { RequestConfig, ResponseError, ResponseType } from './model'
import axios, { CancelTokenSource } from 'axios'
import BaseRequest from './BaseRequest'

export class NetworkRequest implements BaseRequest {
  private baseUrl = '';
  private tag: string | CancelTokenSource = '' ;
  public requestOptions: RequestConfig;

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
      ...opts
    }
  }
  
  interceptor(opts: RequestConfig) {
    return !!opts
  }

  afterRequest(ret: ResponseType) {
    return ret
  }

  handleError(err: ResponseError): void {
    if (err) {}
  }

  readyForRequest(opts: RequestConfig): void {
    const isHttpUrl = (url: string): boolean =>
      ['https://', 'http://', '//'].some((e) => url.startsWith(e))
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
  }

  requestForClient() {
    const isContinue = this.interceptor(this.requestOptions)
    if (!isContinue) {
      return new Promise<any>((resolve, reject) =>
        reject('The request is intercepted by interceptor')
      )
    }      
    return new Promise<ResponseType>((resolve, reject) => {
      window.api.ajax(
        this.requestOptions,
        (ret: ResponseType, err: ResponseError) => {
          if (ret) {
            return resolve(this.afterRequest(ret))
          } else {
            return reject(err)
          }
        }
      )
    })
  }

  requestForBrower() {
    this.tag = typeof this.tag === 'string' ? axios.CancelToken.source() : this.tag
    this.requestOptions.tag = this.tag
    const isContinue = this.interceptor(this.requestOptions)
    if (!isContinue) {
      return new Promise<any>((resolve, reject) =>
        reject('The request is intercepted by interceptor')
      )
    }
    const axiosRequestConfig = {
      url: this.requestOptions.url,
      method: this.requestOptions.method,
      baseURL: this.baseUrl,
      headers: this.requestOptions.headers,
      data: this.requestOptions.data.values || this.requestOptions.data.body,
      timeout: (this.requestOptions.timeout || 30) * 1000,        
      proxy: this.requestOptions.proxy,
      cancelToken: (this.tag as CancelTokenSource).token
    }
    return axios
      .request(axiosRequestConfig)
      .then(rs => this.afterRequest(rs.data))
  }

  request(opts: RequestConfig) {
    this.readyForRequest(opts)
    return (
      typeof api !== 'undefined'
      ? this.requestForClient()
      : this.requestForBrower()
    ).catch(err => this.handleError(err))
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
      (this.tag as CancelTokenSource).cancel(msg)
    }
  }
}

export default new NetworkRequest()
