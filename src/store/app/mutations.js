/*
 * @Author: calebman 
 * @Date: 2018-03-13 17:33:58 
 * @Last Modified by: calebman
 * @Last Modified time: 2018-05-06 13:26:39
 */
const mutations = {
    UPDATE_APP_MENU(state, appRouter) {
        let menu = generatorMenu(appRouter);
        state.menu = menu;
    },
    //修改loading状态
    UPDATE_ROUTER_LOADING(state, status) {
        state.routerLoading = status
    },
}


function generatorMenu(appRouter, menu, parent) {
    if (!menu || !Array.isArray(menu)) {
        menu = [];
    }
    if (appRouter && Array.isArray(appRouter)) {
        for (let index in appRouter) {
            let routeItem = appRouter[index];
            let routeItemPath = `/${routeItem.path}`;
            let menuItem = {
                path: parent && parent.path ? (parent.path + routeItemPath) : routeItemPath,
                title: routeItem.meta && routeItem.meta.title ? routeItem.meta.title : null,
                icon: routeItem.meta && routeItem.meta.icon ? routeItem.meta.icon : null
            };
            let children = routeItem.children;
            if (children && Array.isArray(children)) {
                menuItem.children = [];
                generatorMenu(children, menuItem.children, menuItem);
            }
            menu.push(menuItem);
        }
    }
    return menu;
}
export default mutations
