import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import  './filters'
import VueLazyLoad from 'vue-lazyload'
//搞完路由后,要在入口文件中导入,挂到实例中
Vue.use(router)
Vue.use(ElementUI);
Vue.use(VueLazyLoad,{
    loading:require('./statics/site/images/01.gif')
})


import 'element-ui/lib/theme-chalk/index.css';

//导入axios
import axios from "axios";
axios.defaults.baseURL = 'http://47.106.148.205:8899/';
Vue.prototype.$axios = axios



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
