import { InstallOptions } from './models';
import { PluginObject } from 'vue';
import Request, { NetworkRequest } from './request';
import { VueAPICloud, APIEvent } from './utils/decorators';
declare class VueApicloudQuickstart {
    installed: boolean;
    install(Vue: Vue.VueConstructor, options?: InstallOptions): void;
}
declare const vaq: PluginObject<InstallOptions>;
export { Request, NetworkRequest, VueApicloudQuickstart, APIEvent, VueAPICloud };
export default vaq;
