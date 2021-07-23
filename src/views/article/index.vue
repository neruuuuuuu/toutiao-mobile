<template>
  <div>{{articleId}}</div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      require: true
    }
  },
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
