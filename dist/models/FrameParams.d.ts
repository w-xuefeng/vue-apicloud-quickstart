import CommonParams from './CommonParams';
export default interface FrameParams extends CommonParams {
    /**
     * 默认值：若当前在tabLayout组件中为ui_layout，否则为ui_window
     *
     * 描述：（可选项）frame所要添加到的目标页面
     *
     * ui_window 页面添加到当前window中。若当前在tabLayout组件中，页面只能添加到navigationBar和tabBar之间的区域，无法覆盖在navigationBar、tabBar之上
     *
     * ui_layout 页面添加到当前tabLayout中。此时页面能够添加到tabLayout中任意位置，能够覆盖在navigationBar、tabBar之上，只在tabLayout组件中有效
    */
    fixedOn?: 'ui_window' | 'ui_layout';
    /**
     * 默认值：充满整个父页面
     *
     * 描述：（可选项）设置页面的位置和大小。如果要固定宽高则使用x、y、w、h等参数；如果要自适应状态栏高度变化、横竖屏切换等，则需要使用margin相关参数，不能使用w、h固定宽高。推荐使用margin相关参数来布局。
     *
     * 内部字段：
     *
     *    x: 左上角x坐标，数字类型
     *    y: 左上角y坐标，数字类型
     *    w: 宽度，若传'auto'，页面从x位置开始自动充满父页面宽度，数字或固定值'auto'
     *    h: 高度，若传'auto'，页面从y位置开始自动充满父页面高度，数字或固定值'auto'
     *    marginLeft: 相对父页面左外边距的距离，数字类型
     *    marginTop: 相对父页面上外边距的距离，数字类型
     *    marginBottom: 相对父页面下外边距的距离，数字类型
     *    marginRight: 相对父页面右外边距的距离，数字类型
     *
    */
    rect?: {
        x?: number;
        y?: number;
        w?: 'auto' | number;
        h?: 'auto' | number;
        marginTop?: number;
        marginRight?: number;
        marginBottom?: number;
        marginLeft?: number;
    };
}
