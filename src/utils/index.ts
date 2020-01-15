import { Base64 } from 'js-base64'
import { WindowParams, FrameParams, PageConfig, InstallOptions } from '../models'

interface Page extends PageConfig {
  htmlPath: string;
}

interface ObjectMap<T> {
  [any: string]: T;
}

const helpFunc: (opts: InstallOptions) => {
  [any: string]: any;
} = (opts: InstallOptions) => {
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

  return {
    page: {
      open(url: string, { name, pageParam, animation, winOpts }: {
        name?: string;
        pageParam?: any;
        animation?: {
          type: 'none' | 'push' | 'movein' | 'fade' | 'flip' | 'reveal' | 'ripple' | 'curl' | 'un_curl' | 'suck' | 'cube';
          subType: 'from_right' | 'from_left' | 'from_top' | 'from_bottom';
          duration: number;
        };
        winOpts?: WindowParams;
      } = {}) {
        url = url.endsWith('.html') ? url : url + '.html'
        if (!api) {
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
      },
      close() {
        if (!api) {
          window.history.back()
          return
        }
        api.closeWin()
      },
      closeToWin({ url, animation }: {
        url: string;
        animation?: {
          type: 'none' | 'push' | 'movein' | 'fade' | 'flip' | 'reveal' | 'ripple' | 'curl' | 'un_curl' | 'suck' | 'cube';
          subType: 'from_right' | 'from_left' | 'from_top' | 'from_bottom';
          duration: number;
        };
      }) {
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
      },
      pageParam: () => {
        if (typeof api !== 'undefined') {
          return api.pageParam
        } else {
          const param = getQueryString('pageParam')
          return param ? JSON.parse(Base64.decode(param)) : undefined
        }
      }
    },
    frame: {
      open(params: FrameParams) {
        let { url } = params
        url = url.endsWith('.html') ? url : url + '.html'
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
    },
    pagesInfo: Object.keys(getPageMap()).map(k => ({ ...getPageMap()[k]})),
    getPageMap,
    getQueryString,
    bindKeyBackExitApp,
    getSafeArea(): { top: number; left: number; bottom: number; right: number } {
      if (typeof api !== 'undefined') {
        return api.safeArea
      } else {
        return { top: 0, left: 0, bottom: 0, right: 0 }
      }
    },
    getWinSize(): { winHeight: number; winWidth: number } {
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
    },
    n2p(name: string) {
      if (getPageMap()[name]) {
        return getPageMap()[name].htmlPath
      } else {
        return undefined
      }
    },
    setPullDownRefresh(fn: (ret: any, err: any) => void, options: {
      visible: boolean;
      loadingImg: string;
      bgColor: string;
      textColor: string;
      textDown: string;
      textUp: string;
      showTime: boolean;
    }) {
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
  }  
}

export default helpFunc
