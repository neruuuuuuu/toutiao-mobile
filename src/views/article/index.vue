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
        @click="onFollow"
        :loading="isLoading"
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

    <!-- 底部操作 -->
    <div class="article-button">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        color="#777"
        size="22px"
        info="99+"
      ></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o' "
        :color="article.is_collected ? 'orange' : '#777' "
        size="22px"
        @click="onCollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o' "
        :color="article.attitude === 1 ? 'orange' : '#777' "
        size="22px"
        @click="onLike"
      ></van-icon>
      <van-icon
        name="share-o"
        color="#777"
        size="22px"
      ></van-icon>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user.js'

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
      article: {},
      isLoading: false
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
    },
    // 关注事件方法
    async onFollow () {
      this.isLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isLoading = false
    },
    // 收藏事件方法
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '收藏中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.$toast.success('已取消收藏')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 文章点赞方法
    async onLike () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '点赞中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已经点赞，则取消点赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
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
.article-button {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .comment-btn {
    width: 150px;
  }
}
</style>
