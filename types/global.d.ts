declare const api: any
declare const $api: any
declare let apiready: () => void

interface Window {
  api: any;
  $api: any;
  apiready: () => void;
}