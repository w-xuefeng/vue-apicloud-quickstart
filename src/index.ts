import { InstallOptions } from './models'
import { PluginObject, PluginFunction } from 'vue'
import Plugins from './plugins'
import Request, { NetworkRequest } from './request'

const installFunction: PluginFunction<InstallOptions> = (Vue: Vue.VueConstructor, options?: InstallOptions) => {
  if (!options || !options.pages) {
    throw new Error('vue-apicloud-quickstart need options with pages configuration!')
  }
  if (!Array.isArray(options.pages)) {
    throw new Error('pages configuration type must be array!')
  }
  if (options.pages.length === 0) {
    throw new Error('pages configuration can not be empty array!')
  }
  Plugins.forEach(plugin => Vue.use(plugin, options))
}

class Vaq {
  installed = false
  install(Vue: Vue.VueConstructor, options?: InstallOptions) {
    if (this.installed) return
    this.installed = true
    return installFunction(Vue, options)
  }
}

const vaq: PluginObject<InstallOptions> = new Vaq()

export {
  Request,
  NetworkRequest,
  Vaq
}

export default vaq