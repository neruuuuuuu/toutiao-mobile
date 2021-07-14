<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :title="a"
      v-for="(a,index) in 6"
      :key="index"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="less" scoped>
</style>
