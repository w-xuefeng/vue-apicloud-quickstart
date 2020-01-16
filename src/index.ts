import { InstallOptions } from './models'
import { PluginObject, PluginFunction } from 'vue'
import Plugins from './plugins'

const install: PluginFunction<InstallOptions> = (Vue: Vue.VueConstructor, options?: InstallOptions) => {
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

const VAQ: PluginObject<InstallOptions> = {
  install
}

export default VAQ