<template>
  <div id="partners">
    <div class="part-box" v-for="(item, index) in titleArr" :key="index" v-if="titleArr">
    	<el-row>
    		<el-col :xs="10" :span="4" class="part-title">
    			<h2>{{item.h1}}</h2>
    		</el-col>
    		<el-col :span="24" class="part-tt">
    			<p>{{item.h2}}</p>
    		</el-col>
    		<el-col :span="24" class="yichu">
    			<span>{{item.p}}</span>
    		</el-col>
    	</el-row>
    </div>
  </div>
</template>
<script>
import { partnerList } from '@/api';
export default {
	data() {
    return {
      titleArr:[]
    }
	},
	methods: {
		getData() {
			partnerList().then((res) => {
				this.titleArr = res.data.data
			})
		}
	},
  created () {
		this.getData()
    this.$store.commit('SET_ACTIVEROUTER', '/partners')
  }
}
</script>
<style lang="less">
	#partners{
		width: 1200px;
		margin: 0 auto;
		padding: 20px 30px;
		background: #f7c864;
		.part-box{
			width: 100%;
			background: #fff;
			padding: 10px 30px;
			margin-bottom: 20px;
			box-shadow: #f7c864 0px 0px 5px 0px;
			.part-title{
				border-bottom: 1px solid #999;
				h2{
					margin-bottom: 5px;
					padding: 0;
					font-weight: bold;
					font-size: 20px;
				}
			}
			.part-tt p{
				width: 100%;
				margin-top: 5px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				font-size: 16px;
			}
			.yichu{
				width: 100%;
				text-indent:2em;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				font-size: 18px;
				font-weight: 500;
			}
		}
	}
	@media only screen and (max-width: 768px) {
		#partners{
			width: 100%;
		}
	}
</style>
