import { RequestConfig, ResponseType, ResponseError } from './model';
export default interface BaseRequest {
    interceptor(opts: RequestConfig): boolean;
    request(opts: RequestConfig): Promise<any>;
    afterRequest(ret: ResponseType): ResponseType;
    handleError(err: ResponseError): void;
}
