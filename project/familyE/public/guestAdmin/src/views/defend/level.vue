<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.name" placeholder="输入级别名称进行搜索"></el-input>
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
      label="级别名称">
    </el-table-column>
    <el-table-column
      prop="breakfast"
      align="center"
      label="早餐标准（元/人）">
    </el-table-column>
    <el-table-column
      prop="lunch"
      align="center"
      show-overflow-tooltip
      label="午餐标准（元/人）">
    </el-table-column>
    <el-table-column
      prop="dinner"
      align="center"
      label="晚餐标准（元/人）">
    </el-table-column>
    <el-table-column
      prop="stay"
      align="center"
      label="住宿标准（元/人）">
    </el-table-column>
    <el-table-column
      prop="updateTime"
      align="center"
      show-overflow-tooltip
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
  <el-dialog :title="rankDialog.title" :visible.sync="rankDialog.show" width="500px">
    <el-form ref="rankForm" :model="rankForm" label-position="left" label-width="150px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="级别名称：" prop="name">
            <el-input v-model="rankForm.name" placeholder="请输入级别名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="早餐标准（元/人）：" prop="breakfast">
            <el-input v-model="rankForm.breakfast" placeholder="请输入早餐标准"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="午餐标准（元/人）：" prop="lunch">
            <el-input v-model="rankForm.lunch" placeholder="请输入午餐标准"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="晚餐标准（元/人）：" prop="dinner">
            <el-input v-model="rankForm.dinner" placeholder="请输入晚餐标准"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="住宿标准（元/人）：" prop="stay">
            <el-input v-model="rankForm.stay" placeholder="请输入住宿标准"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="rankForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="rankDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { rankList, rankAdd, rankDelete, rankDetail, rankUpdate } from '@/api/defend'
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
      rankDialog: {
        title: '',
        type: '',
        show: false
      },
      rankForm: {}
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
      rankList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      if (this.$refs.rankForm) {
        this.$refs.rankForm.resetFields()
      }
      this.rankDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      rankDetail(val.id).then((res) => {
        this.rankForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        rankDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.rankDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.rankForm) {
        this.$refs.rankForm.resetFields()
      }
    },
    save() {
      if (this.rankDialog.type === 'ADD') {
        rankAdd(this.rankForm).then((res) => {
          this.getData()
        })
      } else {
        rankUpdate(this.rankForm).then((res) => {
          this.getData()
        })
      }
      this.rankDialog.show = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
</style>
