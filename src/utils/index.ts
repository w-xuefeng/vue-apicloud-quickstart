import helpFunc from './helpFunc'

export const apiError = ['api is not defined', 'apiready is not defined']

export const handelApiError = (
  error: Error,
  msg?: { cn: string; en: string }
) => {
  if (apiError.includes(error.message)) {
    const { cn = '', en = '' } = msg || {}
    const warningEN = en || 'Please use mobile device to debug native module'
    const warningCN = cn || '请使用移动设备调试原生模块'
    console.warn(`[There is no api on the PC side] ${warningEN}`)
    console.warn(`[PC 端没有 API 环境变量] ${warningCN}`)
    console.info(error.stack)
    return error
  }
  throw error
}

export const catchApiError = (
  fn: Function,
  msg?: { cn: string; en: string }
) => {
  try {
    return fn()
  } catch (error) {
    return handelApiError(error, msg)
  }
}

export const bringFunc = (
  funcName: string | string[],
  from: Record<string, Function>,
  to: Record<string, any>
) => {
  const res = { ...to }
  if (Array.isArray(funcName)) {
    for (const func of funcName) {
      if (from[func] && typeof from[func] === 'function') {
        res[func] = from[func]
      }
    }
  } else {
    if (from[funcName] && typeof from[funcName] === 'function') {
      res[funcName] = from[funcName]
    }
  }
  return res
}

export default helpFunc
