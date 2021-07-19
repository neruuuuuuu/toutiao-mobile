<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      shape="round"
      background="rgb(255, 187, 199)"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      show-action
      @focus="isResultShow=false"
    >
      <template #action>
        <van-button
          round
          @click="$router.back()"
          size="small"
        >取消</van-button>
      </template>
    </van-search>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchValue"
      :search-value="searchValue"
    />
    <!-- 搜索历史 -->
    <search-history v-else />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  components: { SearchSuggestion, SearchHistory, SearchResult },
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    }
  }
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
