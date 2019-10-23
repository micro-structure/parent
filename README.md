## 主项目模版

一个项目的主框架可以理解为带路由容器的结构，而不一定局限在只包含项目菜单的容器，即使子项目不是一个完全独立的模块，只要是通过路由访问得到，都可以作为主框架的子模块。

主框架的开发与平时单独开发项目一致，区别的地方在于：

- 共享 router / store 实例到 window 上，以便于只模块能够在初始化加载时动态注入所需的路由和数据

**⚠️ 注意：将库代码通过 CDN 引入不是必选的，因为我们并不依赖全局的库，只依赖它们的实例，且实例是全局唯一的**，当然，如果你选择通过 CDN 引入，我们提供了 `externals` 在打包时来将库代码剔除。

## 主框架的开发流程

通过 [micro-structure-cli](https://github.com/micro-structure/cli) 创建主项目

```
# 初始化选择主项目
micro init
```

启动服务

```
npm run serve
```

## 主项目开发

你可以选择 react 或 vue 中的一种来开发你的容器结构与样式。

其中，唯一的全局变量 `_MICRO_APP_CONFIG` 挂载了我们需要的一些实例。如果想要新增属性，可以调用 `registerField` 来实现，例如：

```js
// ./assets/window.js

registerField({
  http,
  registerHttpUrlMap,
  Http,
  loading: Loading.instance,
  modal: Modal,
  message
})
```
