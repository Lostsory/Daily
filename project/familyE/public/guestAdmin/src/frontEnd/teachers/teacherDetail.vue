<template>
  <div id="teacherDetail">
    <el-form size="medium" :disabled="true" ref="teacherForm" :model="teacherForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="教员姓名：" prop="teacherName">
            <el-input v-model="teacherForm.teacherName" placeholder="请输入教员姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="身份类型：" prop="typeId">
            <el-select v-model="teacherForm.typeId" placeholder="">
              <el-option
                v-for="item in teacherTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="毕业院校：" prop="finishSchool">
            <el-input v-model="teacherForm.finishSchool" placeholder="未知"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="专业：" prop="profession">
            <el-input v-model="teacherForm.profession" placeholder="未知"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="教龄：" prop="teachTime">
          <el-input-number v-model="teacherForm.teachTime" :min="1" :max="30" label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="teacherForm.sex">
              <el-radio :label="0">未知</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="教学经验：">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 20}" placeholder="请输入" v-model="teacherForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { teacherDetail } from '@/api'
export default {
  data() {
    return {
      teacherForm: {},
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
      }]

    }
  },
  methods: {
    getTeacherDetail() {
      teacherDetail({
        _id: this.$route.query.d
      }).then((res) => {
        this.teacherForm = res.data.data
      })
    }
  },
  created() {
    if (this.$route.query.d) {
      this.getTeacherDetail()
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
