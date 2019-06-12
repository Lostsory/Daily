<template>
  <div id="teachers">
    <div class="content">
      <Titlecomp :content="content" />
      <div class="search-form">
        教龄：大于 <el-input-number clearable class="search-item" size="small" style="width: 100px;"  v-model="searchForm.teachTime" :min="1" :max="10" label="" />
        <el-select clearable style="width: 100px;" class="search-item" size="small" v-model="searchForm.sex" placeholder="性别">
          <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable style="width: 240px;" size="small" v-model="searchForm.typeId" placeholder="请选择教员的身份">
          <el-option
            v-for="item in teacherTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input  style="width: 160px;" size="small" v-model="searchForm.remark" placeholder="教授科目或教员姓名"></el-input>
        <el-button  size="small" type="primary" @click="search">搜索</el-button>
        <el-button  size="small" type="primary" @click="searchForm = {}">重置</el-button>
      </div>
      <el-row v-if="teachersList">
        <el-col v-for="(item, index) in teachersList" :key="index" :sm="4" :xs="12">
          <div class="temp" @click="toDetail(item)">
            <img src="../../assets/webImg/default-teacher.jpg" alt="">
            <div class="con">
              <p>{{item.name}}</p>
              <p>教龄<span>{{item.teachTime}}</span>年 | {{item.finishSchool}}</p>
              <p>{{item.remark}}</p>
            </div>
            <div class="mask" @click="toDetail(item)">
              <div>查看详情</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <pagination v-if="token" @getTableData="getTeacher" :total="total" :listQuery="listQuery" />
      <loginModal v-else />
    </div>
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
import Titlecomp from '@/components/Title'
import { homeTeachers } from '@/api'
import { mapGetters } from 'vuex'
import loginModal from '@/components/loginModal';

export default {
  components: {
    Titlecomp,
    pagination,
    loginModal
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
      teachersList: [],
      searchForm: {},
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
      sexs: [
        {
          value: '0',
          label: '未知'
        },
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  methods: {
    search() {
      this.listQuery = {
        ...this.listQuery,
        pageNum: 1,
      }
      this.getTeacher()
    },
    getTeacher() {
      homeTeachers({...this.listQuery, ...this.searchForm}).then((res) => {
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
  .search-form{
    margin-bottom: 20px;
    text-align: right;
    .search-item{
      display: inline-block;
      vertical-align: middle;
    }
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
      position: relative;
      &:hover{
        transform: scale(1.1);
        .mask{
          display: block
        }
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
      .mask{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .85);
        div{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: #fff
        }
      }
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #f7c864
  }
}
</style>
