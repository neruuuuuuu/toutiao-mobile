<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      shape="round"
      background="rgb(255, 187, 199)"
      placeholder="请输入搜索关键词"
      @search="onSearch(searchValue)"
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
    <search-result
      v-if="isResultShow"
      :search-value="searchValue"
    />
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchValue"
      :search-value="searchValue"
      @suggestionSearch="onSearch"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories=searchHistories
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: { SearchSuggestion, SearchHistory, SearchResult },
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '',
      isResultShow: false,
      searchHistories: getItem('search-histories') || []
    }
  },
  methods: {
    onSearch (searchText) {
      // 判断输入是否为空
      if (!searchText) {

      } else {
        this.searchValue = searchText
        // 在搜索历史中查找是否已存在
        const index = this.searchHistories.indexOf(searchText)
        // 删除相同的搜索历史
        if (index !== -1) {
          this.searchHistories.splice(index, 1)
        }
        // 队头插入搜索历史
        this.searchHistories.unshift(searchText)
        // 本地存储搜索历史
        setItem('search-histories', this.searchHistories)

        // 展示搜索结果
        this.isResultShow = true
      }
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
