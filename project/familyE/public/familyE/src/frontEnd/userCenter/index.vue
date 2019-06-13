<template>
  <div id="user_center">
    <div v-if="token" class="content">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="我的预约">
          <el-table
            :data="tableList"
            style="width: 100%">
            <el-table-column
              v-if="userInfo.identity == 'student'"
              prop="teacher.teacherName"
              label="教员姓名"
              width="180">
            </el-table-column>
            <el-table-column
              v-else
              prop="student.studentName"
              label="学员姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="预约时间">
              <template slot-scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="预约状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.check==3" size="mini" type="success">预约成功</el-button>
                <el-button v-else-if="scope.row.check==2" size="mini" type="primary" :loading="true">预约中</el-button>
                <el-button v-else size="mini" type="danger">预约失败</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a class="detail" @click="toDetail(scope.row)">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的评价">
          <div class="comment_list" v-if="token">
            <div v-if="commentList.length > 0">
              <div class="comment_item" v-for="(item, index) in commentList" :key="index">
                <img src="../../assets/webImg/default.jpg" alt="">
                <span>{{item.studentIdName}}</span>
                <p>{{item.content}}</p>
                <p class="date">{{item.createTime}}</p>
              </div>
            </div>
            <div v-else>
              暂无评价
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <loginModal v-else>登陆查看</loginModal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loginModal from '@/components/loginModal'
import { subscribeList } from '@/api';

export default {
  data() {
    return {
      tableList: []
    }
  },
  components: {
    loginModal
  },
  computed: {
    ...mapGetters({
      token: 'token',
      userInfo: 'userInfo'
    }),
    commentList() {
      let comment = []
      this.tableList.forEach(item => {
        comment = [...comment, ...item.comment]
      })
      return comment
    }
  },
  filters: {
    // 时间格式化
    format(v) {
      const setDate = new Date(v)
      const year = setDate.getFullYear()
      const month = addZero(setDate.getMonth() + 1)
      const date = addZero(setDate.getDate())
      const hour = addZero(setDate.getHours())
      const minute = addZero(setDate.getMinutes())
      const second = addZero(setDate.getSeconds())
      function addZero(num) {
        if (num < 10) {
          return '0' + num
        }
        return num
      }
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
  },
  methods: {
    getList() {
      const query = {}
      if (this.userInfo.identity == 'student') {
        query.studentId = this.userInfo.d
      } else {
        query.teacherId = this.userInfo.d
      }
      subscribeList(query).then((res) => {
        this.tableList = res.data.list
      })
    },
    toDetail(row) {
      if (this.userInfo.identity == 'student') {
        this.$router.push({ path: '/frontEndLayout/teacherDetail', query: { d: row.teacherId }})
      } else {
        this.$router.push({ path: '/frontEndLayout/studentDetail', query: { d: row.studentId }})
      }
    }
  },
  created() {
    this.getList()
  },
}
</script>
<style lang="less">
#user_center{
  padding-bottom: 3rem;
  text-align: center;
  .content{
    width: 1200px;
    margin: 0px auto;
    padding: 2rem;
  }
  .el-table td{
    text-align: left
  }
  @media only screen and (max-width: 768px) {
    .content{
      width: 100%;
      .el-row{
        width: 100%;
      }
    }
  }
  .el-tabs__item{
    &:hover, &.is-active {
      color: #f7c864;
    }
  }
  .el-tabs__active-bar{
    background-color: #f7c864
  }
  .detail{
    &:hover{
      color: #f7c864;
      text-decoration: underline;
    }
  }
  .comment_list{
    padding: 1rem 0 0 0;
    max-height: 400px;
    overflow: auto;
    text-align: left;
    p{
      margin: 0 !important
    }
    img{
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .comment_item{
      color: #444;
      background: #f1efef;
      padding: .5rem;
      margin-bottom: .8rem;
      border-radius: 4px;
    }
    .date{
      font-size: 12px;
      color: #333;
      text-align: right
    }
  }
}
</style>
