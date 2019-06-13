<template>
  <div id="studentDetail">
    <el-form ref="studentForm" :disabled="true" size="medium" :model="studentForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="家长姓名：" prop="studentName">
            <el-input v-model="studentForm.studentName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="子女年级：" prop="gradeName">
            <el-input v-model="studentForm.gradeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所补科目：" prop="subjectNames">
            <el-input v-model="studentForm.subjectNames"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="期望课费：" prop="expectFee">
            <el-input v-model="studentForm.expectFee"></el-input>
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
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="studentForm.remark">
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
        _id: this.$route.query.d,
        isweb: 1
      }).then((res) => {
        let subjectNames = ''
        const data = res.data.data
        data.subjectIds.forEach((item, index) => {
          subjectNames = subjectNames + item.subjectName + (index === data.subjectIds.length - 1 ? '' : '/')
        })
        data.subjectNames = subjectNames
        this.studentForm = data
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
#studentDetail{
  width: 800px;
  margin: 2rem auto 0;
  padding-bottom: 2rem;
  background: #fff !important;
    textarea[disabled], input[disabled]{
    background: #fff;
    color: #666
  }
}
@media only screen and (max-width: 768px) {
  #studentDetail{
    width: 100%;
    padding: 0 2rem;
  }
}
</style>
