<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.name" placeholder="输入科室名称进行搜索"></el-input>
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
      prop="officeName"
      align="center"
      label="科室名称">
    </el-table-column>
    <el-table-column
      prop="depName"
      align="center"
      label="所属部门">
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
  <el-dialog :title="officeDialog.title" :visible.sync="officeDialog.show" width="500px">
    <el-form ref="officeForm" :model="officeForm" label-position="left" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="科室名称：" prop="name">
            <el-input v-model="officeForm.name" placeholder="请输入科室名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属部门：" prop="depId">
            <el-select v-model="officeForm.depId" placeholder="请选择">
              <el-option
                v-for="item in depList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="officeForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="officeDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { officeList, officeAdd, officeDelete, officeDetail, officeUpdate, getDepList } from '@/api/defend'
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
      officeDialog: {
        title: '',
        type: '',
        show: false
      },
      officeForm: {},
      depList: []
    }
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    // 表格相关
    getData() {
      officeList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    // 获取下拉列表
    getDropDepList() {
      getDepList().then((res) => {
        console.log(res)
        this.depList = res.data.data
      })
    },
    // 修改弹框打开
    handleUpdate(val) {
      if (this.$refs.officeForm) {
        this.$refs.officeForm.resetFields()
      }
      this.officeDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      this.getDropDepList()
      officeDetail(val.id).then((res) => {
        this.officeForm = res.data.data
        console.log(this.officeForm)
      })
    },
    // 删除
    handleModifyStatus(val) {
      del(this, () => {
        officeDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    // 新增
    handleCreate() {
      this.officeDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.officeForm) {
        this.$refs.officeForm.resetFields()
      }
      this.getDropDepList()
    },
    save() {
      if (this.officeDialog.type === 'ADD') {
        officeAdd(this.officeForm).then((res) => {
          this.getData()
        })
      } else {
        officeUpdate(this.officeForm).then((res) => {
          this.getData()
        })
      }
      this.officeDialog.show = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
</style>
