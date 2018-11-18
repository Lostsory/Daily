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
              <am-table :nowrap="true" :data="tableData">
                <am-table-column prop="title" label="老师姓名"></am-table-column>
                <am-table-column prop="date" label="可授科目"></am-table-column>
                <am-table-column prop="date" label="任职学校"></am-table-column>
                <am-table-column prop="detail" label="操作"></am-table-column>
              </am-table>
            </div>
            <am-pagination custom-class="pagination" :total="60" :show-page-btn-count="1" align="right" v-model="pageNum"></am-pagination>
          </am-panel-body>
        </am-panel>
        <am-panel color="primary">
          <am-panel-header title="最新学员信息" :title-level=4></am-panel-header>
          <am-panel-body>
            <div class="teachers_container">
              <am-table :nowrap="true" :data="tableData">
                <am-table-column prop="title" label="学员姓名"></am-table-column>
                <am-table-column prop="title" label="学员年级"></am-table-column>
                <am-table-column prop="date" label="求授科目"></am-table-column>
                <am-table-column prop="date" label="所在区域"></am-table-column>
                <am-table-column prop="detail" label="操作"></am-table-column>
              </am-table>
            </div>
            <am-pagination custom-class="pagination" :total="60" :show-page-btn-count="1" align="right" v-model="pageNum"></am-pagination>
          </am-panel-body>
        </am-panel>
      </am-col>
    </am-row>
  </am-container>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
          num: 1,
          title: '苹果',
          date: '2017-10-01'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },
      {
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 2,
          title: '香蕉',
          date: '2017-10-02'
      },{
          num: 3,
          title: '葡萄',
          date: '2017-10-03'
      }],
      pageNum: 1
    }
  },
  created () {
    this.$store.commit('SET_ACTIVEROUTER', '/home')
    this.tableData.map((item) => {
      item.detail = {
        render(h, fileds, prop, index) {
          return (
            <a on-click={e => alert('您点击了第' + (index + 1) + '行的' + prop + '字段')}>
              详情
            </a>
          );
        }
      }
    })
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
      height: 300px;
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
