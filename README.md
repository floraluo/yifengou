
# 免单H5

> \"点我优惠购h5\"

# 源代码目录结构说明
```
- src                    // 源代码目录
    - assets             // 静态资源库
        - iconfont       // 字体图标文件
        - image          // 图片文件

    - components         // 公用组件目录
        - cartItem.vue   // 购物车列表项组件
        - goBack.vue     // 返回按钮组件
        - listItem.vue   // 商品列表项组件

    - config             // 配置目录
        - request.js     // ajax封装

    - pages              // 页面组件目录
        - cart           // 购物车列表页面目录
            - index.vue
        - home           // 主页目录
            - bind.vue   // 补贴提现
            - goods.vue  // 免单产品
            - index.vue
            - order.vue  // 订单提交
        - rule           // 规则页面目录
            - index.vue

    - router             // 路由目录
        -index.js

    - App.vue            // 页面入口文件

    - main.js            // 主入口文件
```

# 项目运行
```
cd h5-youhuigou/

npm install

npm run dev
```

# 问题
* tabbar应该公用
* tabbar选择状态需要考虑子页面，不能简单的通过router的样式解决
* init接口调用一遍就够了
* style scoped 不起作用

## 项目依赖插件
- [VeeValidate](https://github.com/baianat/vee-validate)<sup>表单验证</sup>
- [moment](https://github.com/moment/moment/)<sup>格式化时间</sup>

## 采坑集合
1. 对公用组件中的全局vm变量赋值this，最好不要在create生命周期中。
返回上一个页面时，vm是指向最后一个页面组件的。

    解决方法：1.每次进入有使用公共组件页面时都对vm变量重新赋值；2.使用call方法指定this指向问题；

2. 父元素有transform: translate 样式，子元素fixed定位会失效。

    解决方式：父元素使用top/margin-top等样式替代。
