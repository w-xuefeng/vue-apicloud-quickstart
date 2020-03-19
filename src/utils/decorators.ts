export const APIEvent = (extra?: { extra: any }) => {
  return (target: any, key: string) => {
    if (typeof target.methods[key] === 'function') {
      let apiEvent = {}
      if (extra) {
        apiEvent = {
          extra,
          handel: target.methods[key]
        }
      } else {
        apiEvent = target.methods[key]
      }
      target.$options = {
        ...target.$options,
        apiEvent: {
          ...target.$options.apiEvent,
          apiEvent
        }
      }
    }
  }
}

export const VueAPICloud = (target: any) => {
  if (target.methods.onWindowChange && typeof target.methods.onWindowChange === 'function') {
    target.$options = {
      ...target.$options,
      onWindowChange: target.methods.onWindowChange
    }
  }
  if (target.methods.onReady && typeof target.methods.onReady === 'function') {
    target.$options = {
      ...target.$options,
      onReady: target.methods.onReady
    }
  }
}