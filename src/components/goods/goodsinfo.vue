<template>
    <div>
        <div>测试测试</div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>

        <div class="section" v-if="detailData.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">

                             <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in detailData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            
                            <div class="goods-spec">
                                <h1>{{detailData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{detailData.goodsinfo.sub_title}}</p>
                                 <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{detailData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{detailData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{detailData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="goodsCount" :min="1" :max="detailData.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{detailData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 详情和评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowInfo =true">
                                            <a href="javascript:;" :class="{selected:isShowInfo}">商品介绍</a>
                                        </li>
                                        <li  @click="isShowInfo =false">
                                            <a href="javascript:;" :class="{selected:!isShowInfo}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" style="display: block;" v-show="isShowInfo">
                                <p style="padding:5px" v-html="detailData.goodsinfo.content"></p>
                            </div>
                            <div class="tab-content" style="display: block;" v-show="!isShowInfo">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea  id="txtContent" ref="txtContentRef" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="postComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentData.totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentData.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                       <!-- 分页插件 -->
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 5, 10, 20]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="commentData.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in detailData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                           <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 过渡动画 -->
        <transition>
            <div v-if="detailData.imglist" class="animateDiv" >
                <img ref="animateDivRef" :src="detailData.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>
</template>
<style>
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
.animateDiv {
  position: absolute;
  left: 0;
  top: 0;
}
.animateDiv img {
  width: 50px;
  height: 50px;
}
</style>

<script>
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'
import $ from 'jquery'
window.$ = $
window.jQuery = $
//单独引入框架的某一个组件
import { Affix } from 'iview'
export default {
  //组件的局部注册
  components: { Affix },
  data() {
    return {
      detailData: {},
      goodsCount: 1,
      isShowInfo: true, //商品介绍和商品详情的切换,
      commentData: {}, //评论数据
      pageIndex: 1, //默认当前页
      pageSize: 2, //默认页容量
      addToCartOffset: null, //加入购物车按钮的偏移量(动画开始)
      shoppingCartOffset: null //顶部购物车的偏移量(动画结束)
    }
  },
  created() {
    this.getDetailData()
    this.getCommentData()
  },
  updated() {
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
  watch: {
    $route: function() {
      this.getDetailData()
      this.getCommentData()
    }
  },
  methods: {
    getDetailData() {
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.goodsid}`)
        .then(res => {
          this.detailData = res.data.message
        })

      //获得动画开始和结束的偏移量
      setTimeout(() => {
        //为什么要用$符号包起来?jQuery??
        this.addToCartOffset = $(this.$refs.addToShopCartRef).offset()
        console.log($(this.$refs.addToShopCartRef).offset());
        // $(this.$refs.animateDivRef).offset(this.addToCartOffset)

      }, 220)
    },
    getCommentData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsid
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$axios.get(url).then(res => {
        this.commentData = res.data
      })
    },
    //页容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1
      this.getCommentData()
    },
    //页码
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getCommentData()
    },
    postComment() {
      const contentText = this.$refs.txtContentRef.value
      // console.log(contentText);
      if (contentText.trim().length == 0) {
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        })
      }
      this.$axios
        .post(
          `site/validate/comment/post/goods/${this.$route.params.goodsid}`,
          { commenttxt: contentText }
        )
        .then(res => {
          if (res.data.status == 0) {
            //1清空输入框
            //   这里的contentText为什么要加this??
            this.$refs.txtContentRef.value = ''
            //提示
            this.$message({
              message: '评论成功!',
              type: 'success'
            })
            //刷新返回评论第一页
            this.pageIndex = 1
            this.getCommentData()
          }
        })
    }
  }
}
</script>

