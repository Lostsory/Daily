<template>
  <am-container id="home">
    <am-row>
      <am-col size="md" :span="4">
        <div class="please_todo">
          <div>请家教</div>
          <div>做家教</div>
        </div>
        <am-panel color="primary">
          <am-panel-header title="优智简介" :title-level=4></am-panel-header>
          <am-panel-body>
            <p>鹅鹅鹅，</p>
            <p>曲项向天歌。</p>
            <p>白毛浮绿水，</p>
            <p>红掌拨清波。</p>
          </am-panel-body>
        </am-panel>
        <am-panel color="primary">
          <am-panel-header title="科目分类" :title-level=4></am-panel-header>
          <am-panel-body>
            <p>鹅鹅鹅，</p>
            <p>曲项向天歌。</p>
            <p>白毛浮绿水，</p>
            <p>红掌拨清波。</p>
          </am-panel-body>
        </am-panel>
        <am-panel color="primary">
          <am-panel-header title="区域分类" :title-level=4></am-panel-header>
          <am-panel-body>
            <p>鹅鹅鹅，</p>
            <p>曲项向天歌。</p>
            <p>白毛浮绿水，</p>
            <p>红掌拨清波。</p>
          </am-panel-body>
        </am-panel>
      </am-col>
      <am-col size="md" :span="8">
        <am-panel color="primary">
          <am-panel-header title="最新认证专业老师" :title-level=4></am-panel-header>
          <am-panel-body>
            <div class="teachers_container">
              <am-table :nowrap="true" :data="teacherData">
                <am-table-column prop="teacher" label="老师姓名"></am-table-column>
                <am-table-column prop="typeId" label="身份类型"></am-table-column>
                <am-table-column prop="detail" label="操作"></am-table-column>
              </am-table>
            </div>
            <am-pagination custom-class="pagination" :total="total1" :show-page-btn-count="1" align="right" v-model="pageNum1"></am-pagination>
          </am-panel-body>
        </am-panel>
        <am-panel color="primary">
          <am-panel-header title="最新学员信息" :title-level=4></am-panel-header>
          <am-panel-body>
            <div class="teachers_container">
              <am-table :nowrap="true" :data="studentData">
                <!-- <am-table-column prop="student" label="学员姓名"></am-table-column> -->
                <am-table-column prop="gradeName" label="学员年级"></am-table-column>
                <am-table-column prop="school" label="学校"></am-table-column>
                <!-- <am-table-column prop="date" label="求授科目"></am-table-column> -->
                <!-- <am-table-column prop="date" label="所在区域"></am-table-column> -->
                <am-table-column prop="detail" label="操作"></am-table-column>
              </am-table>
            </div>
            <am-pagination custom-class="pagination" :total="total2" :show-page-btn-count="1" align="right" v-model="pageNum2"></am-pagination>
          </am-panel-body>
        </am-panel>
      </am-col>
    </am-row>
  </am-container>
</template>
<script>
import { teacherList, studentList } from '@/api'
export default {
  data() {
    return {
      teacherData: [],
      studentData: [],
      pageNum1: 1,
      total1: 1,
      pageNum2: 1,
      total2: 1
    }
  },
  methods: {
    getTeacherData() {
      teacherList({ pageNum: this.pageNum1, pageSize: '10' }).then((res) => {
        this.teacherData = res.data.data.map((item) => {
          item.detail = {
            render(h, fileds, prop, index) {
              return (
                <a on-click={e => alert('您点击了第' + (index + 1) + '行的' + prop + '字段')}>
                详情
                </a>
              )
            }
          }
          item.teacher = {
            render(h, fileds, prop, index) {
              const con = fileds.teacherName['value'][0] + '老师'
              return (con)
            }
          }
          return item
        })
        this.total1 = res.data.total
      })
    },
    getStudentData() {
      studentList({ pageNum: this.pageNum2, pageSize: '10' }).then((res) => {
        this.studentData = res.data.data
        this.total2 = res.data.total
      })
    }
  },
  created() {
    this.$store.dispatch('ToggleActiveRouter', '/frontEndLayout/home')
    this.getTeacherData()
    this.getStudentData()
  }
}
</script>
<style lang="less">
#home{
  .please_todo{
    margin-bottom: 20pxs;
    &>div{
      width: 100%;
      height: 100px;
      border: 1px solid #ccc;
      margin-bottom: 20px
    }
  }
  .am-panel-bd{
    padding-bottom: 0;
    .teachers_container{
      max-height: 300px;
      overflow: auto
    }
    .pagination{
      margin: 1rem 0;
      li a{
        padding: 0.3rem 0.5rem;
        font-size: 1rem
      }
    }
  }
}
</style>
