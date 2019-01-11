<template>
  <div id="doTeach">
    <div class="doTeach-box">
      <h1>做家教</h1>
      <p style="text-indent:2em;margin-bottom: 1rem">为了保证您对家教的期望，保证孩子的学习情况有良好的改善，请认真填写以下内容。我们保证信息绝对保密，永不外泄，保证您与您孩子的信息安全是我们的责无旁贷的责任和义务。让我们为了孩子更好的成长共同努力吧！</p>
      <el-col :span="24" v-show="stepShow">
      	<el-steps :active="active">
				  <el-step title="联系方式" icon="iconfont icon-lianxi"></el-step>
				  <el-step title="资料" icon="iconfont icon-ziliao"></el-step>
				  <el-step title="教育资料" icon="iconfont icon-jiaoyu"></el-step>
				</el-steps>
      </el-col>
      <el-row :gutter="60" :active="active">
        <el-form ref="subXuqiu" :model="subXuqiu" :rules="subRules">
          <el-col :xs="24" :span="8" v-show="contact">
            <div class="contact">
              <div class="contact-head">
                <p>*</p>请留下您的联系方式
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="teacherName">
                  <el-input size="medium" placeholder="请输入您的姓名" v-model="subXuqiu.teacherName"></el-input>
                </el-form-item>
                <el-form-item label="" prop="sex">
                  <el-select size="medium" v-model="subXuqiu.sex" clearable placeholder="请选择您的性别">
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="birthDate">
                 	<el-date-picker
                 		size="medium"
							      v-model="subXuqiu.birthDate"
							      type="date"
							      placeholder="请选择您的出生日期">
							    </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="phone">
                  <el-input size="medium" placeholder="请输入您的手机号" v-model="subXuqiu.phone"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :span="8" v-show="show">
            <div class="contact">
              <div class="contact-head">
                <p>*</p>请留下您的资料
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="address">
                  <el-input size="medium" placeholder="请输入您的所在城区" v-model="subXuqiu.address"></el-input>
                </el-form-item>
                <el-form-item label="" prop="typeId">
                  <el-select size="medium" v-model="subXuqiu.typeId" clearable placeholder="请选择您的身份">
                    <el-option
			                v-for="item in teacherTypes"
			                :key="item.value"
			                :label="item.label"
			                :value="item.value">
			              </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="finishSchool">
                  <el-input size="medium" v-model="subXuqiu.finishSchool" placeholder="请输入您的学校"></el-input>
                </el-form-item>
              </div>
              <div class="contact-footer">
                <p>信息保密绝不外泄，只为更好的和学生进行匹配，让 我们更好的为您服务！</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :span="8" v-show="kemu">
            <div class="contact">
              <div class="contact-head">
                <p>*</p>请留下您的教育资料
              </div>
              <div class="contact-body">
                <el-form-item label="" prop="profession">
                  <el-input size="medium" v-model="subXuqiu.profession" placeholder="请输入您的专业"></el-input>
                </el-form-item>
                <el-form-item label="" prop="remark">
                  <el-input size="medium" type="textarea" :rows="4" placeholder="请输入您的经验与优势，更好的吸引学员。" v-model="subXuqiu.remark"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-form>
        <el-col :span="24" style="text-align: center;margin-top: 20px;margin-bottom: 20px;">
          <!--<el-checkbox></el-checkbox>我已阅读<span><a href="#">《XXXXXXXXXXXXXXX》</a></span>协议-->
        </el-col>
        <el-col :span="24" style="text-align: center;margin-bottom: 20px;">
        	<el-button style="padding: 1.5rem 5rem;" type="warning" @click="nexts" v-show="buttonShow" id="dianjicishu">下一步</el-button>
        	<el-button style="padding: 1.5rem 5rem;" type="warning" v-show="subShow" @click="subMit('subXuqiu')">提交需求</el-button>
        </el-col>
      </el-row>
    </div>
  </div>  
</template>
<script>
/* eslint-disable */
import { teacherAdd } from '@/api'
export default {
  data() {
    return {
      kemuOptions: [],
      options: [{
          value: '0',
          label: '未知'
        }, {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
      teacherTypes: [{
        value: '1',
        label: '在校大学生(研究生) ,不含留学生'
      }, {
        value: '2',
        label: '教师(在职/进修/离职/退休)'
      }, {
        value: '3',
        label: '外籍人士(留学生/外教/海归人员)'
      }, {
        value: '4',
        label: '其他(已毕业离校的人员)'
      }],
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
        teacherName: [
          {required: true, message: '不可为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '不可为空', trigger: 'blur'},
          { max: 11, message: '最多11个字符', trigger: 'blur' }
        ],
        address: [{required: true, message: '不可为空', trigger: 'blur'}],
        finishSchool: [
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
								this.subXuqiu = {}
                this.active = 1
                this.show = false
                this.kemu = false
                this.buttonShow = true
                this.stepShow = true
                this.subShow = false
            } else if(w > 768) {
            		this.subXuqiu = {}
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
      	this.subXuqiu = {}
          this.show = false
          this.kemu = false
          this.buttonShow = true
          this.stepShow = true
          this.subShow = false
      } else if(w > 768) {
      	this.subXuqiu = {}
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
      	if (this.subXuqiu.teacherName == undefined || this.subXuqiu.teacherName == '' || this.subXuqiu.phone == undefined || this.subXuqiu.phone == '') {
      		
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
      	if (this.subXuqiu.address == undefined || this.subXuqiu.address == '' || this.subXuqiu.finishSchool == undefined || this.subXuqiu.finishSchool == ''){
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
    subMit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	teacherAdd(this.subXuqiu).then((res) => {
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
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/doTeach')
    this.swiperH()
  }
}
</script>
<style>
#doTeach{
  padding: 2rem
}
 .doTeach-box h1{
   font-size: 32px;
   text-align: center;
   padding: 2rem 0px;
   margin: 0px
 }
 .doTeach-box p{
   margin: 0px;
   font-size: 16px;
 }
 .doTeach-box{
   width: 100%;
   height: 100%;
   padding: 0px 30px;
   background-color: #fff;
   box-shadow: #f7c864 0px 0px 5px 0px
 }
 .contact{
   width: 100%;
   height: 290px;
   margin-right: 30px;
   border: 1px solid #ccc;
   font-size: 16px;
   padding: 30px 20px
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
 .contact-body{
   height: 60%;
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
