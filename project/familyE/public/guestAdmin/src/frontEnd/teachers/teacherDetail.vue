<template>
  <div id="teacherDetail">
    <el-button v-if="token && userInfo.identity == 'student'" type="warning" size="medium" @click="select">立即预约</el-button>
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="教员详情">
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
      </el-tab-pane>
      <el-tab-pane label="教员评价">
        <el-rate v-model="teacherForm.rate" disabled show-text />
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
        <loginModal class="login_more" v-else/>
        <el-form v-if="token" ref="form" label-width=":60px">
          <el-form-item label="我也要评价：">
            <el-input type="textarea" v-model="comment"></el-input>
          </el-form-item>
          <el-form-item label="评分：">
            <el-rate v-model="rate" show-text />
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="medium" @click="onSubmit">立即创建</el-button>
            <el-button @click="comment = ''">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loginModal from '@/components/loginModal';
import { subscribe, commentAdd, subscribeList } from '@/api';

import { teacherDetail } from '@/api'
export default {
  components: {
    loginModal
  },
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
      }],
      comment: '',
      rate: -1,
      commentList: []
    }
  },
  computed: {
    ...mapGetters({
      token: 'token',
      userInfo: 'userInfo'
    })
  },
  methods: {
    getTeacherDetail() {
      teacherDetail({
        _id: this.$route.query.d
      }).then((res) => {
        res.data.data.rate = 4
        this.teacherForm = res.data.data
      })
    },
    getCommentList() {
      subscribeList({
        teacherId: this.$route.query.d
      }).then((res) => {
        let comment = []
        console.log(res.data.list);
        res.data.list.forEach(element => {
          comment = [...comment, ...element.comment]
        })
        this.commentList = comment
        console.log(this.commentList);
      })
    },
    select() {
      subscribe({
        teacherId: this.$route.query.d,
        studentId: this.userInfo.d
      }).then((res) => {
        console.log(res);
        if (res.data.httpCode == 200) {
          this.$message({
            message: '恭喜你，预约成功，稍后相关人员将会与你取得联系',
            type: 'success'
          })
        }
      })
    },
    onSubmit() {
      commentAdd({
        teacherId: this.$route.query.d,
        studentId: this.userInfo.d,
        content: this.comment,
        studentIdName: this.userInfo.userName,
        createTime: new Date().toLocaleDateString()
      }).then((res) => {
        if (res.data.httpCode == 200) {
          this.getCommentList()
        }
        this.$message({
          message: res.data.msg,
          type: res.data.httpCode == 200?'success':'warning'
        })
        this.rate = -1
        this.comment = ''
      })
    }
  },
  created() {
    if (this.$route.query.d) {
      this.getTeacherDetail()
      this.getCommentList()
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
  padding-bottom: 2rem;
  background: #fff !important;
  position: relative;
  textarea[disabled], input[disabled]{
    background: #fff;
    color: #666
  }
  &>.el-button{
    position: absolute;
    right: 12px;
    top: -4px;
    z-index: 9999;
  }
  .el-rate{
    line-height: 36px;
    height: 36px;
  }
  .el-rate__icon {
    transform: translateY(6px);
  }
  .el-tabs__item{
    &:hover, &.is-active {
      color: #f7c864;
    }
  }
  .el-tabs__active-bar{
    background-color: #f7c864
  }
  .comment_list{
    padding: 1rem 0 0 0;
    max-height: 400px;
    overflow: auto;
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
  .login_more{
    text-align: center;
    margin-top: 2rem
  }
}
@media only screen and (max-width: 768px) {
  #teacherDetail{
    width: 100%;
    padding: 0 2rem;
  }
}
</style>
