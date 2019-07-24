Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 最大刻度值
    min: {
      type: Number,
      value: 0
    },
    // 最小刻度值
    max: {
      type: Number,
      value: 100
    },
    // 精度值
    scale: {
      type: Number,
      value: 2
    },
    val: {
      type: Array,
      value: [0, 100]
    }
  },
  slide: {},
  /**
   * 组件的初始数据
   */
  data: {
    value: [0, 0],
    itemW: 0,
    rangStyle: ''
  },
  ready () {
    const { min, max, val, scale } = this.properties
    const query = this.createSelectorQuery()
    query.select('.slide-con').boundingClientRect()
    query.selectAll('.slide-item').boundingClientRect().exec((res) => {
      // 初始化获取滑块条的宽度
      this.slide = {
        length: res[0].width - res[1][0].width,
      }
      let value = val.map((item)=>{
        item = Math.ceil(this.slide.length / ((max - min) / scale) / scale * item)
        return item
      })
      this.setData({
        value,
        itemW: res[1][0].width
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    move(ev) {
      const { val, min, max, scale} = this.properties
      const index = ev.currentTarget.dataset.index
      const value = this.data.value
      value[index] = ev.detail.x
      val[index] = Math.floor(ev.detail.x / (this.slide.length / ((max - min) / scale))) * scale
      this.setData({
        rangStyle: `left: ${Math.min(value[0], value[1]) + (this.data.itemW / 2)}px; width: ${Math.abs(value[0] - value[1])}px`
      })
      this.triggerEvent('getVal', { val })
    }
  }
})
