<template>
    <div>
        <!-- 1,面包屑 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <!-- 2.通栏 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 侧边栏 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in topData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id"> 
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html"  v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel indicator-position="outside" height="340px">
                                    <el-carousel-item v-for="item in topData.sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel> 
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in topData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 3.商品列表 -->
        <div class="section" v-for="item in goodsGroup" :key="item.parentTitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <router-link :to="'/goodsinfo/'+subitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.el-carousel__container img {
  width: 100%;
  height: 100%;
}
</style>

<script>

export default {
  data() {
    return {
      topData: {},
      goodsGroup: []
    };
  },
  mounted() {
    this.getTopData();
    this.getgoodsgroup();
  },
  methods: {
    getTopData() {
      const url = "site/goods/gettopdata/goods";
      this.$axios.get(url).then(res => {
        this.topData = res.data.message;
      });
    },
    getgoodsgroup() {
      const url = "site/goods/getgoodsgroup";
      this.$axios.get(url).then(res => {
        this.goodsGroup = res.data.message;
      });
    }
  }
};
</script>




