// postcss.config.js
// px 转 rem
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 37.5px 为 1rem
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
// 行内样式不会转换
