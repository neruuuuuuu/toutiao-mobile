<template>
  <div class="article-item">
    <!-- 单元格 -->
    <van-cell class="article-cell ">
      <!-- 单元格标题 -->
      <div
        slot="title"
        class="cell-title van-ellipsis"
      >{{article.title}}</div>
      <!-- 单元格右侧内容 单张图 默认default-->
      <div v-if="article.cover.type === 1">
        <van-image
          class="right-img"
          fit="cover"
          :src="article.cover.images"
        />
      </div>
      <!-- 单元格标题下方内容 -->
      <div
        slot="label"
        class="cell-label"
      >
        <!-- 三张图 -->
        <div
          v-if="article.cover.type === 3"
          class="cell-center"
        >
          <van-image
            class="center-img"
            fit="cover"
            v-for="(image,index) in article.cover.images"
            :key="index"
            :src="image"
          />
        </div>

        <!-- 作者 发布时间 -->
        <div class="label-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .article-cell {
    .cell-title {
      font-size: 16px;
      color: rgb(39, 39, 39);
    }
    /deep/ .van-cell__value {
      flex: unset;
      width: 110px;
      height: 70px;
      margin-left: 12px;
    }
    .cell-label {
      .cell-center {
        display: flex;
        flex-direction: row;
        .center-img {
          // 父元素下排除最后一个元素
          &:not(:last-child) {
            padding-right: 4px;
          }
          flex: 1;
          height: 70px;
        }
      }
      .label-wrap {
        font-size: 12px;
        color: #7d7d7d;

        span {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
