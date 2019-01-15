<template>
  <div id="students">
    <div class="content">
      <Titlecomp :content="content" />
      <el-row v-if="studentsList">
        <el-col v-for="(item, index) in studentsList" :key="index" :sm="4" :xs="12">
          <div class="temp" @click="toDetail(item)">
            <img src="../../assets/webImg/default-student.jpg" alt="">
            <div class="con">
              <p>{{item.name}}</p>
              <p>{{item.gradeName}} | {{item.subjects}}</p>
              <p>{{item.remark}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <pagination @getTableData="getStudent" :total="total" :listQuery="listQuery" />
    </div>
  </div>  
</template>
<script>
import pagination from '@/components/Pagination'
import Titlecomp from '@/components/Title'
import { homeStudents } from '@/api'
export default {
  components: {
    Titlecomp,
    pagination
  },
  data() {
    return {
      content: {
        h1: '学员资料',
        h2: '他们都在这里得到了提升，你呢？'
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      studentsList: []
    }
  },
  methods: {
    getStudent() {
      homeStudents(this.listQuery).then((res) => {
        this.studentsList = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    toDetail(item) {
      this.$router.push({ path: '/frontEndLayout/studentDetail', query: { d: item._id }})
    }
  },
  created() {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/students')
    this.getStudent()
  }
}
</script>
<style lang="less">
#students{
  padding-bottom: 3rem;
  text-align: center;
  .content{
    width: 1200px;
    margin: 0px auto;
  }
  @media only screen and (max-width: 768px) {
    .content{
      width: 100%;
      .el-row{
        width: 100%;
      }
    }
  }
  .el-col{
    padding: 0 10px;
  }
  .el-row{
    font-size: 1.2rem;
    color: #666;
    .temp{
      border-radius: 4px;
      background: #fff;
      transition: all 300ms ease;
      border: 1px solid #e9e9e9;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 2rem;
      &:hover{
        transform: scale(1.1)
      }
      img{
        width: 100%;
      }
      .con{
        padding: 0.5rem 1rem;
        p:nth-of-type(1){
          font-size: 1.6rem;
          color: #333;
          line-height: 2rem;
        }
        p:nth-of-type(2){
          line-height: 1.8rem;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          span{
            color: #f7c864;
            font-size: 2rem;
            font-weight: 600;
          }
        }
        p:nth-of-type(3){
          color: #999;
          line-height: 1.6rem;
          height: 4.4rem;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        @media only screen and (max-width: 768px) {
          p:nth-of-type(3){
            line-height: 1.6rem;
            height: 6.4rem;
          }
        }
      }
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #f7c864
  }
}
</style>
