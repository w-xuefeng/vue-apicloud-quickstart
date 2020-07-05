import helpFunc from './helpFunc';
export declare const apiError: string[];
export declare const handelApiError: (error: Error, msg?: {
    cn: string;
    en: string;
} | undefined) => Error;
export declare const catchApiError: (fn: Function, msg?: {
    cn: string;
    en: string;
} | undefined) => any;
export declare const bringFunc: (funcName: string | string[], from: Record<string, Function>, to: Record<string, any>) => {
    [x: string]: any;
};
export declare const isHttpUrl: (url: string) => boolean;
export default helpFunc;
