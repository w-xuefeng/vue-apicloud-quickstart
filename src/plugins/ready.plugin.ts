import { PluginObject, PluginFunction } from 'vue'
import { InstallOptions, StatusBar } from '../models'
import { catchApiError } from '../utils'

const noop = () => {}

const updateOrientation = () => {
  const update = function () {
    setTimeout(function () {
      document.dispatchEvent(new MessageEvent('updateOrientation'))
    }, 200)
  }
  window.addEventListener('orientationchange', update, false)
}

const initApiReady = (debugOnPC: boolean) => {
  return new Promise((resolve: (value: any) => void) => {
    window.apiready = () => {
      return catchApiError(() => {
        updateOrientation()
        if (typeof api !== 'undefined' && api.systemType === 'ios') {
          document.addEventListener('touchstart', noop, false)
        }
        resolve(debugOnPC)
      })
    }
    if (typeof api === 'undefined' && debugOnPC) {
      window.apiready()
    }
  })
}

const install: PluginFunction<InstallOptions> = (
  Vue: Vue.VueConstructor,
  options?: InstallOptions
) => {
  function initApp(opts: any) {
    return initApiReady(!!options?.debugOnPC)
      .then(() => new Vue(opts))
      .then(
        (vm) => (document.dispatchEvent(new MessageEvent('apiEventReady')), vm)
      )
  }
  Object.defineProperty(Vue, 'init', {
    value: initApp,
  })
  Vue.mixin({
    beforeCreate() {
      const { debugOnPC = false } = options || {}
      const _self: any = this
      const vmOptions: any = this.$options
      _self._isApiready = false
      _self._debugOnPC = debugOnPC
      document.addEventListener('apiEventReady', () => {
        catchApiError(
          () => {
            const addAPIEventListener = (
              apiEvent: Record<
                string,
                { extra: any; handle: Function } | Function
              >
            ) => {
              for (const key in apiEvent) {
                if (apiEvent.hasOwnProperty(key)) {
                  const eventListener = apiEvent[key]
                  const [handle, param] =
                    typeof eventListener === 'function'
                      ? [eventListener, { name: key }]
                      : [
                          eventListener.handle,
                          { name: key, extra: eventListener.extra },
                        ]
                  if (typeof handle === 'function') {
                    api.addEventListener(param, (ret: any, err: any) => {
                      handle.bind(this).call(this, ret, err)
                    })
                  }
                }
              }
            }
            const { $apiEventOptions = {} } = _self.$data || {}
            const statusBar: StatusBar = vmOptions.statusBar || {}
            if ('apiEvent' in vmOptions) {
              const apiEvent = vmOptions.apiEvent
              addAPIEventListener(apiEvent)
            }
            if (typeof statusBar === 'string' && statusBar || typeof statusBar === 'object' && statusBar.color) {
              addAPIEventListener({ viewappear: () => this.$setStatusBarStyle(statusBar) })
            }
            if (Object.keys($apiEventOptions).length > 0) {
              addAPIEventListener($apiEventOptions)
            }
          },
          {
            cn: 'apiEvent 只能在移动设备上执行',
            en: 'apiEvent can be run on mobile devices only',
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
      },
    },
  })
}

const ReadyPlugin: PluginObject<InstallOptions> = {
  install,
}

export default ReadyPlugin
