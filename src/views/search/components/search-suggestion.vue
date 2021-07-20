<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :title="suggestion"
      v-for="(suggestion,index) in suggestions"
      :key="index"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // 监视props或data的数据变化
    // 属性名：要监视数据的名称
    // searchValue () {
    // console.log('hello')
    // }

    // 完整写法
    searchValue: {
      // 防抖 debounce
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchValue)
        this.suggestions = data.data.options
      }, 300),
      // 有请求需要再也没初始化的时候就执行一次
      immediate: true
    }
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
</style>
