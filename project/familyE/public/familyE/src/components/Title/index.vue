<template>
  <div class="title">
    <h1 :style="{color: color}">{{content.h1}}</h1>
    <p>
      <span :style="{color: color}">——————</span>
      <i class="iconfont icon-fuwu"></i>
      <span :style="{color: color}">——————</span></p>
    <h2 :style="{color: color}">{{content.h2}}</h2>
    <h3 :style="{color: color}">{{content.h3}}</h3>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      require: true,
      default: function() {
        return {
          h1: '',
          h2: '',
          h3: ''
        }
      }
    },
    color: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.title{
  text-align: center;
  padding-top: 8px;
  *+h1, *+h2, *+h3, *+h4, *+h5, *+h6, h1, h2, h3{
    margin: 0px;
  }
  h1{
    font-size: 2.8rem;
    color: #333;
    line-height: 6.4rem;
  }
  p{
    color: #707070;
    margin: 0px;
    position: relative;
    top: -12px;
    .icon-fuwu{
      color: #f7c968;
      position: relative;
      top: 2px;
    }
  }
  h2{
    font-size: 1.4rem;
    color: #808080;
    line-height: 1.8rem;
    width: 374px;
    margin: 0px auto 3.2rem
  }
  @media only screen and (max-width: 768px) {
    h2{
      width: 100%;
    }
  }
  h3{
    font-size: 1.8rem;
    color: #333;
    line-height: 2.2rem;
    width: 75%;
    margin: 0px auto
  }
}
</style>
