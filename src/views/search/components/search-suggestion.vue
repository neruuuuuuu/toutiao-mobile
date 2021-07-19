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
      async handler () {
        const { data } = await getSearchSuggestions(this.searchValue)
        this.suggestions = data.data.options
      },
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
