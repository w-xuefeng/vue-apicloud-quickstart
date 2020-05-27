import CommonParams from './CommonParams';
interface WindowParams extends CommonParams {
    /**
     * 默认值：false
     *
     * 描述：（可选项）设置该window是否为单例对象。若设置为单例对象，当调用closeWin方法关闭时，window将只是从屏幕移除而不会被销毁，下次再打开时将直接使用已存在的window，而不会再重新创建。
    */
    singleInstance?: boolean;
    /**
     * 默认值：无
     *
     * 描述：（可选项）是否隐藏原生navigationBar控件，该字段只 iOS 有效
    */
    hideTopBar?: boolean;
    /**
     * 默认值：无
     *
     * 描述：（可选项）是否隐藏原生tabBar控件，该字段只 iOS 有效
    */
    hideBottomBar?: boolean;
    /**
     * 默认值：true
     *
     * 描述：（可选项）是否支持滑动返回。iOS7.0及以上系统中，在新打开的页面中向右滑动，可以返回到上一个页面，该字段只 iOS 有效
    */
    slidBackEnabled?: boolean;
    /**
     * 默认值：full
     *
     * 描述：（可选项）当支持滑动返回时，设置手指在页面右滑的有效作用区域。取值范围（full:整个页面范围都可以右滑返回，edge:在页面左边缘右滑才可以返回），该字段只iOS有效
    */
    slidBackType?: 'full' | 'edge';
    /**
     * 类型：数字
     *
     * 默认值：0
     *
     * 描述：（可选项）window 显示延迟时间，适用于将被打开的 window 中可能需要打开有耗时操作的模块时，可延迟 window 展示到屏幕的时间，保持 UI 的整体性
    */
    delay?: number;
    /**
     * 默认值：false
     *
     * 描述：（可选项）是否隐藏虚拟home键。设置为true时，虚拟home键会在屏幕没有触摸操作时自动隐藏，触摸后又会显示出来。只支持iOS
     */
    hideHomeIndicator?: boolean;
}
export default WindowParams;
