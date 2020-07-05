import RequestBase, { RequestConfigAPICloud, RequestConfig, ResponseError, ResponseType } from './model';
import { CancelTokenSource } from 'axios';
declare class NetworkRequest implements RequestBase {
    private baseUrl;
    private tag;
    requestOptions: RequestConfig | RequestConfigAPICloud;
    constructor(opts?: RequestConfig);
    interceptor(opts: RequestConfig): boolean;
    afterRequest(ret: ResponseType): ResponseType;
    handleError(err: ResponseError): void;
    readyForRequest(opts: RequestConfig): Promise<RequestConfigAPICloud>;
    requestForClient(opts: RequestConfigAPICloud): Promise<any>;
    requestForBrower(opts: RequestConfigAPICloud): Promise<any>;
    request(opts: RequestConfig): Promise<any>;
    get(url: string, data?: Record<string, string | number | boolean>): Promise<any>;
    post(url: string, data: any, headers?: any): Promise<any>;
    setBaseUrl(url: string): void;
    setTag(tag?: string): void;
    getTag(): string | CancelTokenSource;
    cancelAjax(tag: string, msg?: string): void;
}
export { NetworkRequest };
declare const _default: NetworkRequest;
export default _default;
