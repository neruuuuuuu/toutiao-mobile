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
      {{article.title}}
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
        :src="article.aut_photo"
      />
      <!-- 作者名 -->
      <div
        class="auther-name"
        slot="title"
      >{{article.aut_name}}</div>
      <!-- 发布时间 -->
      <div slot="label">{{article.pubdate | relativeTime}} </div>
      <!-- 关注按钮 -->
      <van-button
        size="small"
        round
        :type="article.is_followed ? 'default':'info'"
        :icon="article.is_followed ? '':'plus'"
      >{{article.is_followed ? '已关注':'关注'}}</van-button>
    </van-cell>
    <!-- 文章正文 -->
    <div
      ref="article-content"
      class="markdown-bod"
      v-html="article.content"
    >
    </div>
    <!-- 评论列表 -->

    <!-- 操作 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data

      this.$nextTick(() => {
        this.handelPreviewImage()
      })
    },
    handelPreviewImage () {
      // 获取DOM容器
      const articleContent = this.$refs['article-content']
      // 得到img标签
      const imgs = articleContent.querySelectorAll('img')
      // 循环注册点击事件
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 调用ImagePreview()
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    }
  },
  created () {
    this.loadArticle()
  },
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
  /deep/ p {
    text-align: justify;
  }
}
</style>
