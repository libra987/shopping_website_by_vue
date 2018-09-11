import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//导入组件
import goodslist from '../components/goods/goodslist.vue'
import goodsinfo from '../components/goods/goodsinfo.vue'

//创建路由,设置路径,租住组件
const router =new VueRouter ({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsid',component:goodsinfo}
    ]
})


export default router