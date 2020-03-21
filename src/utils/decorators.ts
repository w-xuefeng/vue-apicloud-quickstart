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
  if (methods.onWindowChange && typeof methods.onWindowChange === 'function') {
    target.options = {
      ...target.options,
      onWindowChange: methods.onWindowChange
    }
  }
  if (methods.onReady && typeof methods.onReady === 'function') {
    target.options = {
      ...target.options,
      onReady: methods.onReady
    }
  }
}