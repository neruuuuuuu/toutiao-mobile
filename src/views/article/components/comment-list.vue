<template>
  <div class="comment-list">
    <van-list
      v-model="articleComment.loading"
      :finished="articleComment.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment,index) in  articleComment.list"
        :key="index"
        :comment="comment"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      articleComment: { // 文章评论相关数据
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      const articleComment = this.articleComment

      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })

      // 2. 将数据添加到列表中
      const { results } = data.data
      articleComment.list.push(...results)

      // 更新总数据条数
      articleComment.totalCount = data.data.total_count

      // 3. 将加载更多的 loading 设置为 false
      articleComment.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true // 没有数据了，关闭加载更多
      }
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
</style>
