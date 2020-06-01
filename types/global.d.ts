declare const api: any
declare const $api: any
declare let apiready: () => any

interface Window {
  api: any;
  $api: any;
  apiready: () => any;
}

interface HTMLElement {
  getRect: DOMRect;
  computedStyle: CSSStyleDeclaration;
}