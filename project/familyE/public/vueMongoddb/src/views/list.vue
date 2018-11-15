<template>
  <div>
    <div style="padding: 12px">
      <el-button type="primary" @click="open('ADD')" size="medium">增 加</el-button>
      <el-row class="pull_right">
        <el-input :clearable="true" size="medium" style="width: 240px" v-model="listQuery.name" placeholder="输入名称进行搜索">
          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </el-row>
    </div>
    <el-dialog
      :title="formDialog.title"
      :visible.sync="formDialog.show"
      width="420px">
      <el-form :model="formDialog.form" ref="form" label-width="70px">
        <el-form-item label="用户名：" prop="name">
          <el-input v-model="formDialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="成绩：" prop="grade">
          <el-input v-model="formDialog.form.grade"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="paw">
          <el-input :disabled="formDialog.type =='UPDATE' ? true : false" v-model="formDialog.form.paw"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="formDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <el-table ref="table" @sort-change="sortBygrade" :data="listInfo.list" border size="small" :height="tableHeight" v-loading="listInfo.loading">
      <el-table-column
        prop="name"
        align="left"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="grade"
        align="left"
        sortable="custom"
        label="成绩">
      </el-table-column>
      <el-table-column
        prop="paw"
        align="left"
        show-overflow-tooltip
        label="密码">
      </el-table-column>
      <el-table-column
        align="center"
        width="200px"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="open('UPDATE', scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding: 12px;float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listInfo.total" background>
    </el-pagination>
  </div>
</template>
<script>
import axios from '@/config/axios'
import { list, userAdd, userDelete } from '@/api'
export default {
  data () {
    return {
      tableHeight: '0px',
      // 列表信息
      listInfo: {
        list: [],
        total: 0,
        loading: true
      },
      // 列表查询参数
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        name: '',
        orderType: ''
      },
      // 弹框相关
      formDialog: {
        show: false,
        type: '',
        title: '',
        form: {}
      }
    }
  },
  methods: {
    // 分页器相关
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getData()
    },
    sortBygrade ({ column, prop, order }) {
      console.log(order)
      if (order === 'descending') {
        this.listQuery.orderType = '-1'
      } else if (order === 'ascending') {
        this.listQuery.orderType = '1'
      } else {
        this.listQuery.orderType = ''
      }
      this.getData()
    },
    // 列表数据获取
    getData () {
      this.listInfo.loading = true
      list(this.listQuery).then((res) => {
        this.listInfo = res.data
        this.listInfo.loading = false
      })
    },
    // 数据删除
    del (val) {
      /* axios.delete(`delete?_id=${val}`).then((res) => {
        this.getData()
      }) */
      userDelete({_id: val}).then((params) => {
        this.getData()
      })
    },
    // 弹框打开
    open (val, infoForm) {
      this.formDialog.show = true
      if (val === 'ADD') {
        this.formDialog.title = '增加'
        this.formDialog.type = 'ADD'
        this.formDialog.form = {}
      } else {
        this.formDialog.title = '修改'
        this.formDialog.type = 'UPDATE'
        this.formDialog.form = {...infoForm}
      }
    },
    // 数据添加
    add () {
      userAdd(this.formDialog.form).then((res) => {
        this.getData()
        this.formDialog.show = false
      })
    },
    // 数据修改
    update () {
      axios.put('update', this.formDialog.form).then((res) => {
        this.getData()
        this.formDialog.show = false
      })
    },
    // 操作保存
    save () {
      const {type} = this.formDialog
      if (type === 'ADD') {
        this.add()
      } else {
        this.update()
      }
    }
  },
  created () {
    this.getData()
    this.$nextTick(() => {
      // 表格高度自适应
      this.tableHeight = document.documentElement.clientHeight - 173 + 'px'
    })
  }
}
</script>
