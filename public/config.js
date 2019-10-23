window._MICRO_APP_CONFIG_SERVER = 'http://yourdomain.com'
window._MICRO_APP_CONFIG_MENU = [
  {
    id: 'index',
    name: '首页',
    path: '/',
    dir: 'index',
    entry: '/0.1.0/index.js',
    child: [
      {
        name: '主页',
        path: '/'
      },
      {
        name: '个人中心',
        path: '/user',
        child: [
          {
            name: '密码设置',
            path: '/user/pwd'
          }
        ]
      }
    ]
  },
  {
    id: 'second',
    name: '第二个子项目',
    path: '/second',
    dir: 'second',
    entry: '/0.1.0/index.js',
    child: [
      {
        name: '我的订单',
        path: '/second/order',
        child: [
          {
            name: '最近订单',
            path: '/second/order/latest'
          },
          {
            name: '退款售后',
            path: '/second/order/back'
          }
        ]
      },
      {
        name: '我的积分',
        path: '/second/jifen'
      }
    ]
  }
]
