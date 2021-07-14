<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search
      v-model="value"
      shape="round"
      background="rgb(255, 187, 199)"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      show-action
    >
      <template #action>
        <van-button
          round
          @click="onSearch"
          size="small"
        >搜索</van-button>
      </template>
    </van-search>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
/deep/ .van-search__action {
  line-height: 0;
  .van-button--small {
    height: 34px;
  }
}
</style>
