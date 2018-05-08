// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { appRouter } from './router/router';
import store from './store';

//引入系统工具类
import utils from './libs/utils';
Vue.prototype.$utils = utils;
//引入moment.js工具
import moment from 'moment';
//加载中文
// moment.lang('zh_cn');
Vue.prototype.$moment = moment;
//引入本项目基础样式
import "@/assets/themes-base/index.css";
//引入字体图标
import "@/assets/iconfont/iconfont.css";

//全局引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small' });


router.beforeEach((to, from, next) => {
    //如果你需要认证、未登录且跳转路由不为登录页面则 跳转登录页面重新登录
    if (!to.meta.notAuth && !store.getters.isLogin && to.path != "/") {
        to.query.routePath = to.path;
        router.replace({ path: "/login", query: to.query });
    } else {
        store.commit('UPDATE_ROUTER_LOADING', true);
        next();
    }
});

router.afterEach(function (to) {
    window.document.title = to.meta.title ? `${to.meta.title}` : `Database Manager`;
    store.commit('UPDATE_ROUTER_LOADING', false);
});

router.onError(function (err) {
    store.commit('UPDATE_ROUTER_LOADING', false);
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    created() {
        // 根据路由构建菜单栏
        store.commit("UPDATE_APP_MENU", appRouter);
    },
    template: '<App/>'
})