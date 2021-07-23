<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(suggestion,index) in suggestions"
      :key="index"
      @click="$emit('suggestion-search',suggestion)"
    >
      <div
        slot="title"
        v-html="highlight(suggestion,searchValue)"
      ></div>
    </van-cell>
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
  methods: {
    highlight (suggestion, keyword) {
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(keyword, 'gi')
      return suggestion.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
</style>
