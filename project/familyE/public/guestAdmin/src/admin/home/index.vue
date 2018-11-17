<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.drinkName" placeholder="输入酒水名称进行搜索"></el-input>
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
      align="center"
      type="index"
      :index="num"
      label="序号"
      width="60">
    </el-table-column>
    <el-table-column
      prop="drinkName"
      align="center"
      label="酒水">
    </el-table-column>
    <el-table-column
      prop="drinkPrice"
      align="center"
      label="价格/元">
    </el-table-column>
    <el-table-column
      prop="createTime"
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
  <el-dialog :title="drinkDialog.title" :visible.sync="drinkDialog.show" width="500px">
    <el-form ref="drinkForm" :model="drinkForm" label-position="left" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="酒水名称：" prop="drinkName">
            <el-input v-model="drinkForm.drinkName" placeholder="请输入酒水名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="酒水价格：" prop="drinkPrice">
            <el-input v-model="drinkForm.drinkPrice" placeholder="请输入酒水价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="drinkForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="drinkDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { drinkList, drinkAdd, drinkDelete, drinkDetail, drinkUpdate } from '@/api/defend'
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
      drinkDialog: {
        title: '',
        type: '',
        show: false
      },
      drinkForm: {}
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
      drinkList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      if (this.$refs.drinkForm) {
        this.$refs.drinkForm.resetFields()
      }
      this.drinkDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      drinkDetail(val.id).then((res) => {
        this.drinkForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        drinkDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.drinkDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.drinkForm) {
        this.$refs.drinkForm.resetFields()
      }
    },
    save() {
      if (this.drinkDialog.type === 'ADD') {
        drinkAdd(this.drinkForm).then((res) => {
          this.getData()
        })
      } else {
        drinkUpdate(this.drinkForm).then((res) => {
          this.getData()
        })
      }
      this.drinkDialog.show = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
</style>



