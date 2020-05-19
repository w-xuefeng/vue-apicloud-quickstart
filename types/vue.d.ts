import Vue from 'vue'
import { FrameParams, AnimationType, PullDownRefreshOptions, ToastParam  } from '../src/models'
import { OpenWinOptions, ObjectMap, Page } from '../src/utils'
import { NetworkRequest } from '../src/request'

declare module 'vue/types/vue' {
  interface VueConstructor {
    init: (opts: Record<string, any>) => Promise<CombinedVueInstance<Vue, object, object, object, object>>;
  }

  interface Vue {
    api: any;
    $api: any;
    $req: NetworkRequest;
    $page: {
      open: (url: string, { name, pageParam, animation, winOpts }?: OpenWinOptions) => void;
      push: (opts: string | OpenWinOptions) => void;
      close: () => void;
      closeToWin: ({ url, animation }: { url: string; animation?: AnimationType | undefined }) => void;
      pageParam: () => any;
    };
    $frame: { open: (params: FrameParams) => void };
    $pagesInfo: {
      htmlPath: string;
      name: string;
      title: string;
      path: string;
    }[];
    $toast: (toastParam: ToastParam) => void;
    $getPageMap: () => ObjectMap<Page>;
    $getQueryString: (name: string) => string | null;
    $bindKeyBackExitApp: () => void;
    $n2p: (name: string) => string | undefined;
    $getSafeArea: () => {
      top: number;
      left: number;
      bottom: number;
      right: number;
    };
    $getWinSize: () => {
      winHeight: number;
      winWidth: number;
    };
    $setPullDownRefresh: (fn: (ret: any, err: any) => void, options: PullDownRefreshOptions) => void;
    $randomColor: (opts?: { rgb?: boolean; opacity?: number | 'random'  }) => string;
    $isLightColor: (color?: string) => boolean;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    statusBar?: {
      color: string;
      style?: 'dark' | 'light';
      animated?: boolean;
    } | string;
    apiEvent?: Record<string, { extra: any; handle: Function } | Function>;
    onReady?: Function;
    onWindowChange?: Function;
  }
}