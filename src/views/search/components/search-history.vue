<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isHistoryEdit">
        <span @click="$emit('delete-all',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isHistoryEdit=false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isHistoryEdit=true"
      ></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history,index) in searchHistories"
      :key="index"
      @click="$emit('search',history)"
    >
      <van-icon
        name="close"
        v-if="isHistoryEdit"
        @click="onDelete(index)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isHistoryEdit: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    onDelete (index) {
      this.searchHistories.splice(index, 1)
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
</style>
