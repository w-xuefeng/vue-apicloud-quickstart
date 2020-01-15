import { InstallOptions } from './models'
import Plugins from './plugins'

const install = (Vue: Vue.VueConstructor, options: InstallOptions) => {
  Plugins.forEach(plugin => Vue.use(plugin, options))
}

export default {
  install
}