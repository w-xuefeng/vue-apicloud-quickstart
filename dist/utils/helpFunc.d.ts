import { WindowParams, PageConfig, InstallOptions, AnimationType } from '../models';
export interface Page extends PageConfig {
    htmlPath: string;
}
export interface ObjectMap<T> {
    [any: string]: T;
}
export interface OpenWinOptions {
    name?: string;
    pageParam?: any;
    animation?: AnimationType;
    winOpts?: WindowParams;
}
export interface CloseWinOptions {
    name?: string;
    animation?: AnimationType;
}
export interface SafeArea {
    top: number;
    left: number;
    bottom: number;
    right: number;
}
declare const _default: (opts: InstallOptions) => ObjectMap<any>;
export default _default;
