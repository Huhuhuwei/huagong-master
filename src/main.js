import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import { copyToClipboard } from '@/util/util'
import i18n from '@/config/i18n'
import ElementUI from 'element-ui';	// Element 1
import 'element-ui/lib/theme-chalk/index.css'; // Element 2
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {
    Button,
    Container,
    Main,
    Row,
    Col,
    Image,
    Popover,
    Card,
    Divider
} from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Image);
Vue.use(Popover);
Vue.use(Card);
Vue.use(Divider);
Vue.use(VueAxios, axios) // 使用 axios 插件
Vue.component(CollapseTransition.name, CollapseTransition)
/**
 * 复制
 */

Vue.prototype.$copy = function (value,mes) {
  if (copyToClipboard(value)) {
    this.$message.success(mes)
  }
}

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')



