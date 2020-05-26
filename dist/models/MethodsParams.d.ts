export interface AnimationType {
    type: 'none' | 'push' | 'movein' | 'fade' | 'flip' | 'reveal' | 'ripple' | 'curl' | 'un_curl' | 'suck' | 'cube';
    subType: 'from_right' | 'from_left' | 'from_top' | 'from_bottom';
    duration: number;
}
export interface PullDownRefreshOptions {
    visible: boolean;
    loadingImg: string;
    bgColor: string;
    textColor: string;
    textDown: string;
    textUp: string;
    showTime: boolean;
}
export interface ToastParam {
    msg: string;
    duration?: number;
    location?: 'top' | 'middle' | 'bottom';
    global?: boolean;
}
