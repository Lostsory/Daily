<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.name" placeholder="输入部门名称进行搜索"></el-input>
      <el-button @click="getData" class="search_btn" type="primary" size="small" icon="el-icon-search"></el-button>
    </div>
  </div>
  <el-table
    size="medium"
    v-loading="tableLoading"
    :data="tableData"
    border
    :stripe="true"
    style="width: 100%">
    <el-table-column
      type="index"
      align="center"
      :index="num"
      label="序号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="部门名称">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      align="center"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      label="备注">
    </el-table-column>
    <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="depDialog.title" :visible.sync="depDialog.show" width="500px">
    <el-form ref="depForm" :model="depForm" label-position="left" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="部门名称：" prop="name">
            <el-input v-model="depForm.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="depForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="depDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { depList, depAdd, depDelete, depDetail, depUpdate } from '@/api/defend'
import { del } from '@/utils'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      tableLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      index: 0,
      depDialog: {
        title: '',
        type: '',
        show: false
      },
      depForm: {}
    }
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    getData() {
      depList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      if (this.$refs.depForm) {
        this.$refs.depForm.resetFields()
      }
      this.depDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      depDetail(val.id).then((res) => {
        this.depForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        depDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.depDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.depForm) {
        this.$refs.depForm.resetFields()
      }
    },
    save() {
      if (this.depDialog.type === 'ADD') {
        depAdd(this.depForm).then((res) => {
          this.getData()
        })
      } else {
        depUpdate(this.depForm).then((res) => {
          this.getData()
        })
      }
      this.depDialog.show = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
</style>
