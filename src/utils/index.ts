import { Base64 } from 'js-base64'
import { WindowParams, FrameParams, PageConfig, InstallOptions, AnimationType, PullDownRefreshOptions  } from '../models'

interface Page extends PageConfig {
  htmlPath: string;
}

interface ObjectMap<T> {
  [any: string]: T;
}

interface OpenWinOptions {
  name?: string;
  pageParam?: any;
  animation?: AnimationType;
  winOpts?: WindowParams;
}

const helpFunc = (opts: InstallOptions): ObjectMap<any> => {
  const { pages } = opts

  const getPageMap: () => ObjectMap<Page> = () => {
    return pages.reduce((rst: ObjectMap<Page>, page: PageConfig ) => {
      rst[page.name] = {
        ...page,
        htmlPath: page.path.replace(/\/(\w)/, (match: any, $1: string) =>
          $1.toLocaleLowerCase()
        )
      }
      return rst
    }, {})
  }

  const getQueryString = (name: string) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    return r != null ? decodeURI(r[2]) : null
  }

  const bindKeyBackExitApp = () => {
    if (typeof api !== 'undefined') {
      api.addEventListener(
        {
          name: 'keyback'
        },
        () => {
          api.toast({
            msg: '再按一次返回键退出' + api.appName,
            duration: 2000,
            location: 'bottom'
          })
          api.addEventListener(
            {
              name: 'keyback'
            },
            () => {
              api.closeWidget({ silent: true })
            }
          )
          setTimeout(() => {
            bindKeyBackExitApp()
          }, 3000)
        }
      )
    }
  }

  const n2p = (name: string) => {
    if (getPageMap()[name]) {
      return getPageMap()[name].htmlPath
    } else {
      return undefined
    }
  }

  const open = (url: string, { name, pageParam, animation, winOpts }: OpenWinOptions = {}) => {
    const httpUrl = url.startsWith('http:') || url.startsWith('https:') || url.startsWith('//:')
    url = url.endsWith('.html') ? url : ( httpUrl ? url : url + '.html')
    if (typeof api === 'undefined') {
      if (pageParam) {
        url = `${url}?pageParam=${Base64.encodeURI(JSON.stringify(pageParam))}`
      }
      window.top.location.href = url
      return
    }
    name = name ? name : `win_${url}`
    const params: WindowParams = {
      name,
      url,
      pageParam,
      animation,
      ...(winOpts || {})
    }
    api.openWin(params)
  }

  const push = (opts: string | OpenWinOptions) => {
    if (typeof opts === 'string') {
      return open(opts)
    }
    const { name = '' } = opts
    const url = n2p(name)
    if (url) {
      return open(url, opts)
    }
  }

  const close = () => {
    if (typeof api === 'undefined') {
      window.history.back()
      return
    }
    api.closeWin()
  }
  
  const closeToWin = ({ url, animation }: { url: string; animation?: AnimationType }) => {
    url = url.endsWith('.html') ? url : url + '.html'
    if (typeof api !== 'undefined') {
      const name = `win_${url}`
      if (animation) {
        api.closeToWin({ name, animation })
      } else {
        api.closeToWin({ name })
      }
    } else {
      window.location.href = url
    }
  }

  const pageParam = () => {
    if (typeof api !== 'undefined') {
      return api.pageParam
    } else {
      const param = getQueryString('pageParam')
      return param ? JSON.parse(Base64.decode(param)) : undefined
    }
  }

  const getSafeArea: () => { top: number; left: number; bottom: number; right: number } = () => {
    if (typeof api !== 'undefined') {
      return api.safeArea
    } else {
      return { top: 0, left: 0, bottom: 0, right: 0 }
    }
  }

  const getWinSize: () => { winHeight: number; winWidth: number } = () => {
    if (typeof api !== 'undefined') {
      return {
        winHeight: api.winHeight,
        winWidth: api.winWidth
      }
    }
    return {
      winHeight: window.screen.availHeight,
      winWidth: window.screen.availWidth
    }
  }
    
  const setPullDownRefresh = (fn: (ret: any, err: any) => void, options: PullDownRefreshOptions) => {
    if (typeof api !== 'undefined') {
      api.setRefreshHeaderInfo(
        {
          visible: true,
          loadingImg: 'widget://image/refresh.png',
          bgColor: '#282c34',
          textColor: '#fff',
          textDown: '下拉刷新...',
          textUp: '松开刷新...',
          showTime: true,
          ...options
        },
        (ret: any, err: any) => {
          fn && fn(ret, err)
        }
      )
    }
  }

  const openFrame = (params: FrameParams) => {
    let { url } = params
    const httpUrl = url.startsWith('http:') || url.startsWith('https:') || url.startsWith('//:')
    url = url.endsWith('.html') ? url : ( httpUrl ? url : url + '.html')
    if (typeof api !== 'undefined') {
      api.openFrame({ ...params, url })
    } else {
      const { name, rect, pageParam } = params
      const iframe = document.createElement('iframe')
      iframe.setAttribute('frameborder', '0')
      iframe.setAttribute('name', name)
      if (pageParam) {
        url = `${url}?pageParam=${Base64.encodeURI(JSON.stringify(pageParam))}`
      }
      iframe.src = url
      iframe.style.position = 'absolute'
      if (rect) {
        if (rect.x) {
          iframe.style.left = `${rect.x}px`
        }
        if (rect.y) {
          iframe.style.top = `${rect.y}px`
        }
        if (rect.w) {
          iframe.style.width = rect.w === 'auto' ? '100%' : `${rect.w}px`
        }
        if (rect.h) {
          iframe.style.height = rect.h === 'auto' ? '100%' : `${rect.h}px`
        }
      }
      document.body.appendChild(iframe)
    }
  }

  return {
    page: { open, push, close, closeToWin, pageParam },
    frame: { open: openFrame },
    pagesInfo: Object.keys(getPageMap()).map(k => ({ ...getPageMap()[k]})),
    getPageMap,
    getQueryString,
    bindKeyBackExitApp,
    n2p,
    getSafeArea,
    getWinSize,
    setPullDownRefresh
  }  
}

export const apiError = ['api is not defined', 'apiready is not defined']

export const handelApiError = (error: Error, msg?: { cn: string; en: string }) => {
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

export const catchApiError = (fn: Function, msg?: { cn: string; en: string }) => {
  try {
    fn()
  } catch (error) {
    handelApiError(error, msg)
  }
}

export default helpFunc
