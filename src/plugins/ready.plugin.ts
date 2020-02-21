import { PluginObject, PluginFunction } from 'vue'
import { InstallOptions } from '../models'
import { catchApiError } from '../utils'

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

const init = (fn: Function) => {
  updateOrientation()
  catchApiError(fn)
  document.dispatchEvent(new MessageEvent('apiready', { data: {} }))
}

function initApiReady(debugOnPC: boolean, fn: Function) {
  if (debugOnPC) {
    return init(fn)
  } else {
    catchApiError(() => {
      apiready = () => {
        catchApiError(() => {
          if (api.systemType === 'ios') {
            document.addEventListener('touchstart', () => { }, false)
          }
          return init(fn)
        })
      }
    })
  }
}

const install: PluginFunction<InstallOptions> = (
  Vue: Vue.VueConstructor,
  options?: InstallOptions
) => {
  function initApp(opts: any) {
    return initApiReady(!!options?.debugOnPC, () => new Vue(opts))
  }
  Object.defineProperty(Vue, 'init', {
    value: initApp
  })
  Vue.mixin({
    beforeCreate() {
      const { debugOnPC = false } = options || {}
      const _self: any = this
      const vmOptions: any = this.$options
      _self._isApiready = false
      _self._debugOnPC = debugOnPC
      document.addEventListener('apiready', () => {
        catchApiError(
          () => {
            if ('apiEvent' in vmOptions) {
              const apiEvent = vmOptions.apiEvent
              for (const key in apiEvent) {
                if (apiEvent.hasOwnProperty(key)) {
                  const eventListener = apiEvent[key]
                  const [handle, param] =
                    typeof eventListener === 'function'
                      ? [eventListener, { name: key }]
                      : [
                        eventListener.handle,
                        { name: key, extra: eventListener.extra }
                      ]
                  if (typeof handle === 'function') {
                    api.addEventListener(param, (ret: any, err: any) => {
                      handle.bind(this).call(this, ret, err)
                    })
                  }
                }
              }
            }
          },
          {
            cn: 'apiEvent 只能在移动设备上执行',
            en: 'apiEvent can be run on mobile devices only'
          }
        )
        _self._isApiready = true
        if (_self._isMounted) {
          _self.__ready()
        }
      })
      document.addEventListener('updateOrientation', () => {
        vmOptions.onWindowChange && vmOptions.onWindowChange.bind(this).call()
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
        if (_self.$options.onReady) {
          catchApiError(() => {
            _self.$options.onReady.bind(this).call()
          })
        }
      }
    }
  })
}

const ReadyPlugin: PluginObject<InstallOptions> = {
  install
}

export default ReadyPlugin
