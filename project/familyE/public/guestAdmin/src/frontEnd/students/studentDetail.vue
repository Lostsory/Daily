<template>
  <div id="teacherDetail">
    <el-form ref="studentForm" size="medium" :rules="studentRules" :model="studentForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="家长姓名：" prop="studentName">
            <el-input v-model="studentForm.studentName" placeholder="请输入家长姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="子女年级：" prop="gradeId">
            <el-select v-model="studentForm.gradeId" @change="getSubjectList" placeholder="请选择">
              <el-option
                v-for="item in gradeData"
                :key="item._id"
                :label="item.gradeName"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所补科目：" prop="subjectIds">
            <el-select v-model="studentForm.subjectIds" :disabled="!studentForm.gradeId" multiple :placeholder="!studentForm.gradeId?'请先选择子女年级':'请选择'">
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :label="item.subjectName"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="期望课费：" prop="expectFee">
            <el-input v-model="studentForm.expectFee" placeholder="请输入期望课费"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所在学校：" prop="school">
            <el-input v-model="studentForm.school" placeholder="请输入所在学校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="studentForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="studentForm.sex">
              <el-radio :label="0">未知</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="子女情况：">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="studentForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { studentDetail } from '@/api'
export default {
  data() {
    return {
      studentForm: {}
    }
  },
  methods: {
    getStudentDetail() {
      studentDetail({
        _id: this.$route.query.d
      }).then((res) => {
        this.studentForm = res.data.data
      })
    }
  },
  created() {
    if (this.$route.query.d) {
      this.getStudentDetail()
    } else {
      this.$router.push({ path: '/frontEndLayout/home' })
    }
  }
}
</script>
<style lang="less">
#teacherDetail{
  width: 800px;
  margin: 2rem auto 0;
  background: #fff !important;
    textarea[disabled], input[disabled]{
    background: #fff;
    color: #666
  }
}
@media only screen and (max-width: 768px) {
  #teacherDetail{
    width: 100%;
    padding: 0 2rem;
  }
}
</style>
