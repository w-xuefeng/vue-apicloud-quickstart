export default interface CommonParams {
  /**
   * 默认值：无
   * 
   * 描述：window 或 frame 名字
  */
  name: string;

  /**
   * 默认值：无
   * 
   * 描述：页面地址，可以为本地文件路径，支持相对路径和绝对路径，以及 widget://、fs://等协议路径，也可以为远程地址。 当data参数不为空时，url将做为baseUrl，data中的html引用的资源文件根路径以该url为基础。
  */
  url: string;

  /**
   * 默认值：无
   * 
   * 描述：（可选项）页面参数，新页面中可以通过 api.pageParam 获取
  */
  pageParam?: any;

  /**
   * 默认值：无
   * 
   * 描述：（可选项）动画参数，不传时使用默认动画
   * 
   * type 动画类型（详见动画类型常量）
   * 
   * subType 动画子类型（详见动画子类型常量）
   * 
   * duration 动画过渡时间，默认300毫秒
   *
   * type 取值范围：
   * 
   *    none 无动画效果
   *    push 新视图将旧视图推开
   *    movein 新视图移到旧视图上面
   *    fade 交叉淡化过渡（不支持过渡方向）
   *    flip 翻转效果
   *    reveal 将旧视图移开,显示下面的新视图
   *    ripple 滴水效果（不支持过渡方向）
   *    curl 向上翻一页
   *    un_curl 向下翻一页
   *    suck 收缩效果（不支持过渡方向）
   *    cube 立方体翻滚效果
   * 
   * （Android 系统 flip，ripple，curl，un_curl，suck，cube 类型不支持）
   *
   * subType 取值范围
   * 
   *    from_right 从右边开始动画
   *    from_left 从左边开始动画
   *    from_top 从顶部开始动画
   *    from_bottom 从底部开始动画  
  */
  animation?: {
    type: 'none' | 'push' | 'movein' | 'fade' | 'flip' | 'reveal' | 'ripple' | 'curl' | 'un_curl' | 'suck' | 'cube';
    subType: 'from_right' | 'from_left' | 'from_top' | 'from_bottom';
    duration: number;
  };

  /**
   * 默认值：无
   * 
   * 描述：（可选项）页面加载的数据内容，可以为html片段或者整张html文件的数据
  */
  data?: string;

  /**
   * 类型：JSON 对象
   * 
   * 默认值：无
   * 
   * 描述：（可选项）请求头
   */
  headers?: any;

  /**
   * 默认值：false
   * 
   * 描述：（可选项）是否使用WKWebView来加载页面。参考WKWebView介绍
   */
  useWKWebView?: boolean;

  /**
   * 类型：布尔
   * 
   * 默认值：false
   * 
   * 描述：（可选项）是否可以通过手势来进行历史记录前进后退，只在useWKWebView参数为true时有效
  */
  historyGestureEnabled?: boolean;

  /**
   * 默认值：true
   * 
   * 描述：（可选项）是否自动同步WKWebView外部如ajax产生的Cookie到WKWebView中，只在useWKWebView参数为true时有效
  */
  syncCookie?: boolean;

  /**
   * 默认值：若在 config.xml 里面配置了pageBounce，则默认值为配置的值，否则为 false
   * 
   * 描述：（可选项）页面是否弹动。注意如果页面使用了上拉、下拉刷新等功能，该属性可能会被刷新组件重新设置
  */
  bounces?: boolean;

  /**
   * 默认值：若在 config.xml 里面配置了 windowBackground，则默认值为配置的值，否则透明
   * 
   * 描述：（可选项）背景色，支持图片和颜色，格式为 #fff、#ffffff、rgba(r,g,b,a)等，图片路径支持 fs://、widget://等 APICloud 自定义文件路径协议，同时支持相对路径
  */
  bgColor?: string;

  /**
   * 默认值：false
   * 
   * 描述：（可选项）当点击状态栏，页面是否滚动到顶部。若当前屏幕上不止一个页面的 scrollToTop 属性为 true，则所有的都不会起作用。只 iOS 有效
  */
  scrollToTop?: boolean;

  /**
   * 默认值：true
   * 
   * 描述：（可选项）页面内容超出后是否可以滚动，只支持iOS
  */
  scrollEnabled?: boolean;

  /**
   * 默认值：true
   * 
   * 描述：（可选项）是否显示垂直滚动条
  */
  vScrollBarEnabled?: boolean;


  /**
   * 默认值：true
   * 
   * 描述：（可选项）是否显示水平滚动条
  */
  hScrollBarEnabled?: boolean;

  /**
   * 默认值：false
   * 
   * 描述：（可选项）页面是否可以缩放
  */
  scaleEnabled?: boolean;

  /**
   * 默认值：never
   * 
   * 描述：（可选项）设置页面滚动到头部或尾部时，显示回弹阴影效果的模式，仅Android有效
   * 
   * 取值范围：
   *
   *    never 永远不显示
   *    always 总是显示
   *    scrolls 只有当页面内容超出设备屏幕大小，发生滚动行为时显示，建议设置为该模式
   * 
  */
  overScrollMode?: 'never' | 'always' | 'scrolls';


  /**
   * 默认值：false
   * 
   * 描述：（可选项）是否允许iOS 11及以上系统中页面元素默认的拖拽行为。只支持iOS
  */
  dragAndDrop?: boolean;

  /**
   * 类型：JSON 对象
   * 
   * 默认值：无
   * 
   * 描述：（可选项）页面加载进度配置信息，若不传则无加载进度效果
   * 
   * 内部字段
   * 
   *    @type 加载进度效果类型，默认值为 default，取值范围为 default|page，为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
   *    @title type 为 default 时显示的加载框标题，字符串类型
   *    @text type 为 default 时显示的加载框内容，字符串类型
   *    @color type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
   *    @height type 为 page 时进度条高度，默认值为3，数字类型
   * 
  */
  progress?: {
      type: 'default' | 'page';
      title: string;
      text: string;
      color: string;
      height: number;
  };

  /**
   * 默认值：false
   * 
   * 描述：（可选项）页面已经打开时，是否重新加载页面，重新加载页面后 apiready 方法将会被执行
  */
  reload?: boolean;

  /**
   * 默认值：false
   * 
   * 描述：（可选项）是否允许长按页面时弹出选择菜单
  */
  allowEdit?: boolean;


  /**
   * 默认值：auto
   * 
   * 描述：（可选项）当键盘弹出时，输入框被盖住时，当前页面的调整方式，只iOS有效，Android请在 config.xml 里面配置并云编译使用
   * 
   * 取值范围
   * 
   *    resize 若键盘盖住输入框，页面会自动上移
   *    pan 若键盘盖住输入框，页面不会自动上移
   *    auto 默认值，由系统决定如何处理，iOS平台该字段等同于resize
   * 
  */
  softInputMode?: 'resize' | 'pan' | 'auto';

  /**
   * 默认值：['tap']
   * 
   * 描述：（可选项）收起键盘的方式，只iOS有效。
   * 
   * 取值范围：
   * 
   *    tap 点击页面收起键盘，可以和drag或interactive同时使用
   *    drag 拖拽页面时收起键盘，可以和tap同时使用
   *    interactive 在键盘和页面交界处上下滑动收起键盘，可以和tap同时使用
  */
  softInputDismissMode?: ('tap' | 'drag' | 'interactive')[];

  /**
   * 默认值：true
   * 
   * 描述：（可选项）是否显示键盘上方的工具条。只支持iOS
  */
  softInputBarEnabled?: boolean;

  /**
   * 默认值：pull
   * 
   * 描述：（可选项）设置使用默认下拉刷新类型，取值范围：pull、swipe
  */
  defaultRefreshHeader?: 'pull' | 'swipe';

  /**
   * 默认值：无
   * 
   * 描述：（可选项）设置使用自定义下拉刷新模块的名称，设置后可以使用 api.setCustomRefreshHeaderInfo 方法来使用自定义下拉刷新组件
  */
  customRefreshHeader?: string;
}