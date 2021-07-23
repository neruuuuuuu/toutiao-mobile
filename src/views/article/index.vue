<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      class="article-nav-bar"
    />
    <!-- 文章标题 -->
    <h1 class="article-title">
      11111
    </h1>
    <!-- 作者单元格 -->
    <van-cell
      class="auther-cell"
      center
    >
      <!-- 作者头像 -->
      <van-image
        class="avatar"
        slot="icon"
        width="50"
        height="50"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <!-- 作者名 -->
      <div
        class="auther-name"
        slot="title"
      >bang</div>
      <!-- 发布时间 -->
      <div slot="label">aaa </div>
      <!-- 关注按钮 -->
      <van-button
        size="small"
        round
        icon="plus"
      >关注</van-button>
    </van-cell>
    <!-- 文章正文 -->
    <div class="markdown-bod">
      <h1>qwert</h1>
      <p>12345</p>
    </div>
    <!-- 评论列表 -->

    <!-- 操作 -->
  </div>
</template>

<script>
import './github-markdown.css'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
.article-nav-bar {
  background: rgb(255, 187, 199);
}
.article-title {
  background: rgb(255, 255, 255);
  margin: 0;
  padding: 10px 15px;
  font-size: 30px;
  color: rgb(75, 75, 75);
}
.auther-cell {
  padding: 10px 15px;
  border-bottom: solid 1px rgb(245, 245, 245);
  .avatar {
    margin-right: 15px;
  }
}
.markdown-bod {
  padding: 15px;
  background-color: #fff;
}
</style>
