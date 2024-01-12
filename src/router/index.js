import VueRouter from 'vue-router'

import ChatHome from '../view/pages/chatHome/index.vue'
import Login from '../view/pages/login/Login.vue'
import Register from '@/view/pages/register/Register'
import Home from "@/view/pages/home/Home.vue"

const router = new VueRouter({
    routes: [
        // {
        //     path: "/",
        //     redirect: "/ChatHome",
        //     /*meta: {
        //         title: 'ChatGPT'
        //     }*/
        // },
        {
            path: '/',          // 路径
            redirect: '/login'  // 重定向
        },
        {
            path: "/ChatHome",
            name: "ChatHome",
            component: ChatHome,
            /*meta: {
                title: 'ChatGPT'
            }*/
        },
        {
            path: '/login',     // 路径
            name: "Login",
            component: Login    // 跳转到的组件
        },
        {
            path: '/register',     // 路径
            component: Register    // 跳转到的组件
        },
        {
            path: '/home',     // 路径
            component: Home    // 跳转到的组件
        }
    ]
})

// 修改网页标题
/*router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});*/

export default router;
