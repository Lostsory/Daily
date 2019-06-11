<template>
  <div id="teachers">
    <div class="content">
      <Titlecomp :content="content" />
      <el-row v-if="teachersList">
        <el-col v-for="(item, index) in teachersList" :key="index" :sm="4" :xs="12">
          <div class="temp" @click="toDetail(item)">
            <img src="../../assets/webImg/default-teacher.jpg" alt="">
            <div class="con">
              <p>{{item.name}}</p>
              <p>教龄<span>{{item.teachTime}}</span>年 | {{item.finishSchool}}</p>
              <p>{{item.remark}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <pagination @getTableData="getTeacher" :total="total" :listQuery="listQuery" />
    </div>
  </div>  
</template>
<script>
import pagination from '@/components/Pagination'
import Titlecomp from '@/components/Title'
import { homeTeachers } from '@/api'
export default {
  components: {
    Titlecomp,
    pagination
  },
  data() {
    return {
      content: {
        h1: '全国优选师资任你选',
        h2: '全国超30000名专业教师实名认证全方位严格筛选、大数据支持教师科学评级'
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      teachersList: []
    }
  },
  methods: {
    getTeacher() {
      homeTeachers(this.listQuery).then((res) => {
        this.teachersList = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    toDetail(item) {
      this.$router.push({ path: '/frontEndLayout/teacherDetail', query: { d: item._id }})
    }
  },
  created() {
    this.$store.commit('SET_ACTIVEROUTER', '/frontEndLayout/teachers')
    this.getTeacher()
  }
}
</script>
<style lang="less">
#teachers{
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
