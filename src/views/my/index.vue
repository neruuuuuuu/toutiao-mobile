<template>
  <div class="my-container">
    <van-cell-group class="my-info">
      <!-- 第一行 -->
      <van-cell
        class="frist-row"
        title="单元格"
        value="内容"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          width="60"
          height="60"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div
          class="name"
          slot="title"
        >昵称</div>
        <van-button
          size="small"
          round
        >编辑</van-button>
      </van-cell>
      <!-- 第二行 -->
      <van-grid :border="false">
        <van-grid-item>
          <div slot="text">
            <div class="span">12</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">12</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">999</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">12</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>

    </van-cell-group>
    <!-- 第三行 -->
    <van-grid :column-num="2">
      <van-grid-item
        icon="star-o"
        text="收藏"
      />
      <van-grid-item
        icon="eye-o"
        text="历史"
      />
    </van-grid>
    <!-- 第四行 -->
    <van-cell
      title="消息通知"
      is-link
      to=""
    />
    <van-cell
      title="小小同学"
      is-link
      to=""
    />
    <!-- 第五行 -->
    <van-cell title="退出登录" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background-color: rgb(250, 152, 177);
    .frist-row {
      // box-sizing: border-box;
      background-color: unset;
      padding: 35px 25px 10px 25px;
      font-size: 15px;
      .avatar {
        border: 1px solid white;
        margin-right: 10px;
        color: #fff;
      }
      .name {
        color: #fff;
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>
