import { bringFunc } from './index'

export const APIEvent = (extra?: { extra: any; [any: string]: any }) => {
  return (target: any, key: string) => {
    if (typeof target[key] === 'function') {
      const oldEvents = target.$apiEventOptions || {}
      let newEvent = {}
      if (extra) {
        newEvent = {
          ...extra,
          handel: target[key]
        }
      } else {
        newEvent = target[key]
      }
      target.$apiEventOptions = {
        ...oldEvents,
        [key]: newEvent
      }
    }
  }
}

export const VueAPICloud = (target: any) => {
  const { methods = {} } = target.options
  target.options = bringFunc(['onWindowChange', 'onReady'], methods, target.options)
}

