const APP = getApp()
Component({
	properties: {
		bgcolor: {
			type: String,
			value: '#FFF'
		},
		selector: {
			type: String,
			value: 'skeleton'
		}
	},
	data: {
		systemInfo: {},
		skeletonRectLists: [],
		skeletonCircleLists: []
	},
	attached: function () {
		this.data.systemInfo = wx.getSystemInfoSync()
	},
	ready: function () {
		const that = this
		//绘制背景
		wx.createSelectorQuery().selectAll(`.${this.data.selector}`).boundingClientRect().exec(function(res){
			that.setData({
				'systemInfo.height': res[0][0].height + res[0][0].top
			})
		})
		//绘制矩形
		this.rectHandle()
		//绘制圆形
		this.radiusHandle()
	},
	methods: {
    cancleMove() {
      return
    },
		rectHandle: function () {
			const that = this
			//绘制不带样式的节点
			wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-rect`).boundingClientRect().exec(function(res){
        that.setData({
					skeletonRectLists: res[0]
				}, function() {
        })
			});
		},
		radiusHandle: function () {
			const that = this
			wx.createSelectorQuery().selectAll(`.${this.data.selector} >>> .${this.data.selector}-radius`).boundingClientRect().exec(function(res){
				that.setData({
					skeletonCircleLists: res[0]
				}, function() {
        })
			});
		}
	}
})