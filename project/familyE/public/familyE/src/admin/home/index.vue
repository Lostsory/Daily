<template>
  <div id="home_setting">
    <el-form ref="form" size="medium" :model="homeSettingForm" label-width="100px">
      <am-article-lead custom-class="bgWhite">
        <blockquote>
          <p>Banner</p>
        </blockquote>
        <el-form-item label="客服电话：">
          <el-input  placeholder="请输入" v-model="homeSettingForm.banner.phone"></el-input>
        </el-form-item>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.banner.h1"></el-input>
        </el-form-item>
        <el-form-item label="二级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.banner.h2"></el-input>
        </el-form-item>
        <el-form-item label="三级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.banner.h3">             </el-input>
        </el-form-item>
      </am-article-lead>
      <am-article-lead custom-class="bgWhite">
        <blockquote>
          <p>{{homeSettingForm.introduction.h1}}</p>
        </blockquote>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.introduction.h1"></el-input>
        </el-form-item>
        <el-form-item label="二级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.introduction.h2"></el-input>
        </el-form-item>
        <el-form-item label="三级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.introduction.h3">             </el-input>
        </el-form-item>
      </am-article-lead>
      <am-article-lead custom-class="bgWhite">
        <blockquote>
          <p>{{homeSettingForm.register.h1}}</p>
        </blockquote>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.register.h1"></el-input>
        </el-form-item>
        <el-form-item label="二级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.register.h2"></el-input>
        </el-form-item>
        <el-form-item label="请家教描述语：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入" v-model="homeSettingForm.register.studentDesc">             </el-input>
        </el-form-item>
        <el-form-item label="做家教描述语：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入" v-model="homeSettingForm.register.teacherDesc">             </el-input>
        </el-form-item>
      </am-article-lead>
      <am-article-lead custom-class="bgWhite">
        <el-alert
          title="首推荐学员请到学员管理页面进行操作"
          type="warning">
        </el-alert>
        <blockquote>
          <p>{{homeSettingForm.students.h1}}</p>
        </blockquote>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.students.h1"></el-input>
        </el-form-item>
        <el-form-item label="二级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.students.h2"></el-input>
        </el-form-item>
        <el-form-item label="三级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.students.h3"></el-input>
        </el-form-item>
      </am-article-lead>
      <am-article-lead custom-class="bgWhite">
        <blockquote>
          <p>{{homeSettingForm.userNum.h1}}</p>
        </blockquote>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.userNum.h1"></el-input>
        </el-form-item>
        <el-form-item label="成功接洽：">
          <el-input type="textarea" placeholder="请输入" v-model="homeSettingForm.userNum.successNum"></el-input>
        </el-form-item>
        <el-form-item label="学员数：">
          <el-input type="textarea" placeholder="请输入" v-model="homeSettingForm.userNum.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="教师数：">
          <el-input type="textarea" placeholder="请输入" v-model="homeSettingForm.userNum.teacherNum"></el-input>
        </el-form-item>
      </am-article-lead>
      <am-article-lead custom-class="bgWhite">
        <el-alert
          title="推荐教员请到教员管理页面进行操作"
          type="warning">
        </el-alert>
        <blockquote>
          <p>{{homeSettingForm.teachers.h1}}</p>
        </blockquote>
        <el-form-item label="一级标题：">
        <el-input  placeholder="请输入" v-model="homeSettingForm.teachers.h1"></el-input>
        </el-form-item>
        <el-form-item label="二级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.teachers.h2"></el-input>
        </el-form-item>
        <el-form-item label="三级标题：">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="homeSettingForm.teachers.h3"></el-input>
        </el-form-item>
      </am-article-lead>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { homeDetail, homeUpdata } from '@/api/index'
export default {
  data() {
    return {
      homeSettingForm: {
        banner: {},
        introduction: {},
        register: {},
        userNum: {},
        teachers: {},
        students: {}
      }
    }
  },
  methods: {
    // 提交修改
    onSubmit() {
      homeUpdata(this.homeSettingForm).then((res) => {
      })
    },
    // 获取当前城市主页信息
    getHomeInfo() {
      homeDetail().then((res) => {
        this.homeSettingForm = res.data.data.homeSetting
      })
    }
  },
  created() {
    this.getHomeInfo()
  }
}
</script>
<style lang="scss" scoped>
#home_setting{
  width: 600px;
  margin: 32px auto;
  .bgWhite{
    background: #fff;
  }
  blockquote p:last-of-type {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>

