import FastClick  from 'fastclick'
import { PluginObject, PluginFunction } from 'vue'
import { InstallOptions } from '../models'

const install: PluginFunction<InstallOptions> = (Vue: Vue.VueConstructor, options?: InstallOptions) => {  
  const { debugOnPC = false } = options || {}
  const updateOrientation = () => {
    const update = function () {
      setTimeout(function () {
        document.dispatchEvent(
          new MessageEvent('updateOrientation', {
            data: {}
          })
        )
      }, 200)
    }
    window.addEventListener('orientationchange', update, false)
  }
  const init = (fn: () => void) => {
    updateOrientation()
    fn && fn()
    FastClick(document.body)
    document.dispatchEvent(new MessageEvent('apiready', { data: {} }))
  }
  function initApiReady(debugOnPC: boolean, fn: () => void) {
    if (debugOnPC) {
      init(fn)
    } else {
      apiready = function () {
        if (api.systemType === 'ios') {
          document.addEventListener('touchstart', () => {}, false)
        }
        init(fn)
      }
    }
  }
  initApiReady(!!debugOnPC, () => {
    Vue.mixin({
      beforeCreate() {
        const _self: any = this
        const vmOptions: any = this.$options
        _self._isApiready = false
        document.addEventListener('apiready', () => {
          if ('apiEvent' in vmOptions) {
            const apiEvent = vmOptions.apiEvent
            for (const key in apiEvent) {
              if (apiEvent.hasOwnProperty(key)) {
                const eventListener = apiEvent[key]
                if (typeof eventListener === 'function') {
                  api.addEventListener({ name: key }, (ret: any, err: any) => {
                    eventListener.bind(this).call(this, ret, err)
                  })
                }
              }
            }
          }
          _self._isApiready = true
          if (_self._isMounted) {
            _self.__ready()
          }
        })
        document.addEventListener('updateOrientation', () => {
          vmOptions.onWindowChange &&
            vmOptions.onWindowChange.bind(this).call()
        })
      },
      mounted() {
        const _self: any = this
        _self._isMounted = true
        if (_self._isApiready) {
          _self.__ready()
        } else {
          setTimeout(() => {
            _self.__ready()
          }, 200)
        }
      },
      methods: {
        __ready() {
          const _self: any = this
          if (_self.__readyed) {
            return
          }
          _self.__readyed = true
          _self.$options.onReady && _self.$options.onReady.bind(this).call()
        }
      }
    })    
  })
}

const ReadyPlugin: PluginObject<InstallOptions> = {
  install
}
export default ReadyPlugin
