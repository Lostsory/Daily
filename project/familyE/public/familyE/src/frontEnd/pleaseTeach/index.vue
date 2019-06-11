<template>
  <div id="pleaseTeach">
    <div class="pleaseTeach-box">
      <h1>请家教</h1>
      <p style="text-indent:2em;margin-bottom: 1rem">为了保证您对家教的期望，保证孩子的学习情况有良好的改善，请认真填写以下内容。我们保证信息绝对保密，永不外泄，保证您与您孩子的信息安全是我们的责无旁贷的责任和义务。让我们为了孩子更好的成长共同努力吧！</p>
      <!-- <el-col :span="24" v-show="stepShow">
      	<el-steps :active="active">
				  <el-step title="联系方式" icon="iconfont icon-lianxi"></el-step>
				  <el-step title="学习情况" icon="iconfont icon-ziliao"></el-step>
				  <el-step title="家教情况" icon="iconfont icon-jiaoyu"></el-step>
				</el-steps>
      </el-col> -->
      <el-row :gutter="60" :active="active">
        <el-form ref="subXuqiu" :model="subXuqiu" :rules="subRules">
          <el-col :xs="24" :span="8" v-show="contact">
            <div class="contact">
              <div class="contact-head" v-show="!stepShow">
                <p>*</p>请留下您的联系方式
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="studentName">
                  <el-input size="medium" placeholder="请输入您的姓名（家长）" v-model="subXuqiu.studentName"></el-input>
                </el-form-item>
                <el-form-item label="" prop="phone">
                  <el-input size="medium" placeholder="请输入您的电话" v-model="subXuqiu.phone"></el-input>
                </el-form-item>
                <el-form-item label="" prop="address">
                  <el-input size="medium" placeholder="请输入您的地址" v-model="subXuqiu.address"></el-input>
                </el-form-item>
                <el-form-item label="" prop="gradeId" v-if="stepShow">
                  <el-select size="medium" v-model="subXuqiu.gradeId" clearable placeholder="请选择孩子的所在年级" @change="selectKemu">
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.gradeName"
                      :value="item._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="subjectIds" v-if="stepShow">
                  <el-select multiple size="medium" v-model="subXuqiu.subjectIds" clearable placeholder="请选择科目">
                    <el-option
                      v-for="(item, index) in kemuOptions"
                      :key="index"
                      :label="item.subjectName"
                      :value="item._id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="contact-footer">
                <p>信息保密不泄露，信息真实保证我们可以更好的为您和您的孩子服务！</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :span="8" v-show="show">
            <div class="contact">
              <div class="contact-head">
                <p>*</p>请留下您孩子的学习情况
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="gradeId">
                  <el-select size="medium" v-model="subXuqiu.gradeId" clearable placeholder="请选择孩子的所在年级" @change="selectKemu">
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.gradeName"
                      :value="item._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="remark">
                  <el-input type="textarea" v-model="subXuqiu.remark" :rows="3" placeholder="请输入孩子的学习情况"></el-input>
                </el-form-item>
              </div>
              <div class="contact-footer">
                <p>更多的学习情况使我们更好的为您的孩子匹配适合的家教，为学习保驾护航！</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :span="8" v-show="kemu">
            <div class="contact">
              <div class="contact-head">
                <p>*</p>请留下您想要的家教情况
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="subjectIds">
                  <el-select multiple size="medium" v-model="subXuqiu.subjectIds" clearable placeholder="请选择科目">
                    <el-option
                      v-for="(item, index) in kemuOptions"
                      :key="index"
                      :label="item.subjectName"
                      :value="item._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="expectFee">
                  <el-input size="medium" placeholder="请输入期望的课费" v-model="subXuqiu.expectFee"></el-input>
                </el-form-item>
              </div>
              <div class="contact-footer">
                <p>更多的学习情况使我们更好的为您的孩子匹配适合的家教，为学习保驾护航！</p>
              </div>
            </div>
          </el-col>
        </el-form>
        <el-col :span="24" style="text-align: center;margin-top: 20px;margin-bottom: 20px;">
          <!--<el-checkbox></el-checkbox>我已阅读<span><a href="#">《XXXXXXXXXXXXXXX》</a></span>协议-->
        </el-col>
        <el-col :span="24" style="text-align: center;margin-bottom: 20px;">
        	<!-- <el-button style="padding: 1.5rem 5rem;" type="warning" @click="nexts" v-show="buttonShow" id="dianjicishu">下一步</el-button> -->
        	<!-- <el-button style="padding: 1.5rem 5rem;" type="warning" v-show="subShow" @click="subMit('subXuqiu')">提交需求</el-button> -->
        	<el-button style="padding: 1.5rem 5rem;" type="warning" @click="subMit('subXuqiu')">提交需求</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { gradeList, subjectList, studentAdd } from '@/api'
export default {
  data() {
    return {
      kemuOptions: [],
      options: [],
      value: '',
      gradeName: '',
      // 表单在什么情况下显示
      contact: true,
      show: true,
      kemu: true,
      active: 1,
      buttonShow: false,
      stepShow: false,
      subShow: true,
      subXuqiu: {
      },
      // 表单验证
      subRules: {
        studentName: [
          {required: true, message: '不可为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '不可为空', trigger: 'blur'},
          { max: 11, message: '最多11个字符', trigger: 'blur' }
        ],
        gradeId: [{required: true, message: '不可为空', trigger: 'change'}],
        subjectIds: [
          { required: true, message: '不可为空', trigger: ['change', 'blur'] }
        ]
      },
    }
  },
  mounted(){
      window.onresize = () => {
        let w = document.documentElement.offsetWidth || document.body.offsetWidth;
         return (() => {
           if(w <= 768){
                this.active = 1
                this.show = false
                this.kemu = false
                this.buttonShow = true
                this.stepShow = true
                this.subShow = false
            } else if(w > 768) {
                this.contact = true
                this.show = true
                this.kemu = true
                this.buttonShow = false
                this.stepShow = false
                this.subShow = true
            }
         })()
       }
  },
  methods:{
    swiperH() {
      let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if(w <= 768){
          this.show = false
          this.kemu = false
          this.buttonShow = true
          this.stepShow = true
          this.subShow = false
      } else if(w > 768) {
          this.show = true
          this.kemu = true
          this.buttonShow = false
          this.stepShow = false
          this.subShow = true
      }
    },
		nexts() {
			
      this.active = this.active + 1
      if(this.active == 2) {
      	if(this.subXuqiu.studentName == undefined || this.subXuqiu.studentName == '' || this.subXuqiu.phone == undefined || this.subXuqiu.phone == '') {
      		this.active = 1
      		this.$message({
	          message: '请填写您的信息',
	          type: 'warning'
	        })
      	} else {
					this.contact = false
					this.show = true
	        this.kemu = false
      	}
      } else if (this.active==3) {
      	console.log(this.subXuqiu.gradeId)
      	if (this.subXuqiu.gradeId == undefined || this.subXuqiu.gradeId == '') {
      		this.active = 2
      		this.$message({
	          message: '请填写您的信息',
	          type: 'warning'
	        })
      	} else {
      		this.buttonShow = false
					this.subShow = true
					this.contact = false
					this.show = false
					this.kemu = true
      	}
      } else if (this.active++ > 3) {
        this.active = 1
      }
		},
    // 选择年级
    selectGrade() {
      gradeList().then((res) => {
        this.options = res.data.data
      })
    },
    selectKemu() {
      this.subXuqiu.subjectIds = []
      subjectList({gradeId:this.subXuqiu.gradeId}).then((res) => {
        this.kemuOptions = res.data.data
      })
    },
    subMit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const mapSubject = {}
          this.kemuOptions.forEach(item => {
            mapSubject[item._id] = item
          })
          this.subXuqiu.subjectIds = this.subXuqiu.subjectIds.map((item) => {
            return mapSubject[item]
          })
          studentAdd(this.subXuqiu).then((res) => {
            if (res.data.httpCode === '200') {
              this.$message({
                message: '已成功录入您的信息，我们的客服稍后会与您取得联系',
                type: 'success',
                showClose: true,
                delay: 10000
              });
              this.subXuqiu = {}
            } else {
              this.$message({
                showClose: true,
                message: '您的信息已经存在',
                type: 'warning'
              });
            }
          })
        }
      })
    }
  },
  created() {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/pleaseTeach')
    this.swiperH()
    this.selectGrade()
  }
}
</script>
<style>
#pleaseTeach{
  padding: 2rem
}
 .pleaseTeach-box h1{
   font-size: 32px;
   text-align: center;
   padding: 2rem 0px;
   margin: 0px
 }
 .pleaseTeach-box p{
   margin: 0px;
   font-size: 16px;
 }
 .pleaseTeach-box{
   width: 100%;
   height: 100%;
   padding: 0px 30px;
   background-color: #fff;
   box-shadow: #f7c864 0px 0px 5px 0px
 }
 .contact{
   width: 100%;
   margin-right: 30px;
   border: 1px solid #ccc;
   font-size: 16px;
   padding: 1.8rem;
   overflow: hidden;
 }
 .contact-head{
   width: 100%;
   margin-bottom: 15px;
 }
 .contact-head p{
   color: #f7c864;
   margin-right: 5px;
   float: left;
 }
 .contact-footer p{
   color: #f7c864;
   font-size: 12px;
   margin-top: 25px
 }
 .el-form-item{
   margin: 0px !important;
   padding-bottom: 15px
 }
 .el-step__title.is-finish{
 	color: #f7c864;
 }
 .el-step__head.is-finish{
 	color: #f7c864;
 	border-color: #F7C864
 }
</style>
