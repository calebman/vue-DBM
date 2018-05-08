/*
 * @Author: calebman 
 * @Date: 2018-05-06 12:10:56 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-08 14:11:36
 */

const main = () => import(/* webpackChunkName: "group-index" */ '@/views/main');



//登录页
export const loginRouter = {
  path: 'login',
  name: 'login',
  meta: { title: "系统登录", notAuth: true },
  component: () => import(/* webpackChunkName: "group-index" */'@/views/login')
};


export const errorRouter = [
  { path: "/404", name: "page404", meta: { title: "页面走丢了", notAuth: true }, component: () => import(/* webpackChunkName: "group-error-page" */ '@/views/error-page/404') },
  { path: "/403", name: "page403", meta: { title: "权限不足", notAuth: true }, omponent: () => import(/* webpackChunkName: "group-error-page" */ '@/views/error-page/403') },
  { path: "/500", name: "page500", meta: { title: "服务端异常", notAuth: true }, component: () => import(/* webpackChunkName: "group-error-page" */ '@/views/error-page/500') }
]


export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/dashboard',
  component: main,
  children: [
    { path: 'dashboard', name: 'dashboard', meta: { title: "仪表盘" }, component: () => import(/* webpackChunkName: "group-index" */'@/views/dashboard') }
  ]
}

export const appRouter = [
  {
    path: 'example',
    name: 'example',
    meta: { title: "组件演示", icon: "dbm d-icon-yanshi" },
    redirect: '/example/datatabledemo',
    component: main,
    children: [
      { path: "menucarddemo", name: "menuCardDemo", meta: { title: "菜单组件示例", icon: "dbm d-icon-qiapian" }, component: () => import( /* webpackChunkName: "group-demo-menucard-page" */ '@/views/demo/menu-card-demo') },
      { path: "treeviewdemo", name: "treeViewDemo", meta: { title: "树形组件示例", icon: "dbm d-icon-shu" }, component: () => import( /* webpackChunkName: "group-demo-treeview-page" */ '@/views/demo/tree-view-demo') },
      { path: "datatabledemo", name: "dataTableDemo", meta: { title: "数据表格组件示例", icon: "dbm d-icon-biaoge" }, component: () => import(/* webpackChunkName: "group-demo-table-page" */ '@/views/demo/datatable/data-table') },
      { path: "chartsdemo", name: "chartsDemo", meta: { title: "图表组件示例", icon: "dbm d-icon-tubiao" }, component: () => import(/* webpackChunkName: "group-demo-charts-page" */ '@/views/demo/charts-demo') },
      { path: "test", name: "test", meta: { title: "布局测试", icon: "icon dbm d-icon-test" }, component: () => import( /* webpackChunkName: "group-demo-menucard-page" */ '@/views/demo/layout-test') }
    ]
  }
]