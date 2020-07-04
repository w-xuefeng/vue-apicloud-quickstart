import { RequestConfig, ResponseError, ResponseType } from './model';
import { CancelTokenSource } from 'axios';
import BaseRequest from './BaseRequest';
export declare class NetworkRequest implements BaseRequest {
    private baseUrl;
    private tag;
    requestOptions: RequestConfig;
    constructor(opts?: RequestConfig);
    interceptor(opts: RequestConfig): boolean;
    afterRequest(ret: ResponseType): ResponseType;
    handleError(err: ResponseError): void;
    readyForRequest(opts: RequestConfig): void;
    requestForClient(): Promise<any>;
    requestForBrower(): Promise<any>;
    request(opts: RequestConfig): Promise<any>;
    get(url: string, data?: Record<string, string | number | boolean>): Promise<any>;
    post(url: string, data: any, headers?: any): Promise<any>;
    setBaseUrl(url: string): void;
    setTag(tag?: string): void;
    getTag(): string | CancelTokenSource;
    cancelAjax(tag: string, msg?: string): void;
}
declare const _default: NetworkRequest;
export default _default;
