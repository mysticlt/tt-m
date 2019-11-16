<template>
  <div class="container">
    <!-- swipeable 开启手势切换功能 -->
    <van-tabs swipeable>
      <van-tab :key="item.id" v-for="item in myChannels" :title="item.name">
        <!-- 滚动容器 -->
        <div class="scroll-wrapper">
          <van-pull-refresh
            v-model="downLoading"
            @refresh="onRefresh"
            :success-text="refreshSuccessText"
          >
            <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <!-- 文章内容 -->
              <van-cell v-for="item in articles" :key="item">
                <!-- 三张图 -->
                <div class="article_item">
                  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
                  <div class="img_box">
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="info_box">
                    <span>你像一阵风</span>
                    <span>8评论</span>
                    <span>10分钟前</span>
                    <span class="close">
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
                <!-- 一张图 -->
                <div class="article_item">
                  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
                  <div class="img_box">
                    <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="info_box">
                    <span>你像一阵风</span>
                    <span>8评论</span>
                    <span>10分钟前</span>
                    <span class="close">
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 频道按钮 -->
    <span class="bar_btn" slot="nav-right">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/channel'
export default {
  name: 'home-index',
  data () {
    return {
      articles: [],
      // 是不是正在加载中
      upLoading: false,
      // 是不是已经加载完毕全部数据
      finished: false,
      // 是不是正在刷新中
      downLoading: false,
      // 刷新完毕后提示文字（暂无更新|更新成功）
      refreshSuccessText: '',
      // -------------------------------
      // 我的频道数据
      myChannels: []
    }
  },
  created () {
    // 获取频道数据
    this.getMyChannels()
  },
  methods: {
    async getMyChannels () {
      const data = await getMyChannels()
      // 渲染频道(标签页 tabs组件)
      this.myChannels = data.channels
    },
    onLoad () {
      // @load特点：默认在组件初始化会加载一次。
      // @load特点：当加载的内容渲染后不足一屏，继续触发一次。
      // @load事件触发条件: 往上滑动到底部触发。
      // 业务：获取列表数据进行渲染  现在是模拟
      window.setTimeout(() => {
        // 数据加载成功
        // 1. 结束加载中效果
        this.upLoading = false
        // 2. 模拟下数据
        // 每次加载一次 往后生成十条数据 [1-10] [11-20] ...
        const data = []
        for (let i = this.articles.length; i < this.articles.length + 10; i++) {
          data.push(i + 1)
        }
        // 追加
        this.articles.push(...data)
        // 3. 判断数据是否全部加载完毕  假设50条
        if (this.articles.length >= 50) {
          this.finished = true
        }
        console.log('ok')
      }, 1000)
    },
    onRefresh () {
      // @refresh  在下拉的时候松手触发
      window.setTimeout(() => {
        // 1. 结束正在刷新的效果
        this.downLoading = false
        // 2. 模拟数据
        const data = [1, 2, 3, 4]
        // const data = []
        // 判断是否有数据
        if (data.length) {
          // 3. 更新数据
          this.articles = data
          // 4. 给刷新后的提示
          this.refreshSuccessText = '更新成功'
          // 5. 有可能不满足一屏  主动加载一次数据
          this.onLoad()
          // 6. 重置加载全部数据是否完毕状态
          this.finished = false
        } else {
          // 3. 给刷新后的提示
          this.refreshSuccessText = '暂无更新'
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
// 文章列表样式
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
