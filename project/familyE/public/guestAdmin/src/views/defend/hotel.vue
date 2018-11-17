<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.contacts" placeholder="输入酒店名称进行搜索"></el-input>
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
      label="酒店名称">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      show-overflow-tooltip
      label="地点">
    </el-table-column>
    <el-table-column
      prop="contacts"
      align="center"
      label="联系人">
    </el-table-column>
    <el-table-column
      prop="phone"
      align="center"
      label="联系电话">
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
  <el-dialog :title="hotelDialog.title" :visible.sync="hotelDialog.show" width="500px">
    <el-form ref="hotelForm" :model="hotelForm" label-position="left" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="酒店名称：" prop="name">
            <el-input v-model="hotelForm.name" placeholder="请输入酒店名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="hotelForm.address" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人：" prop="contacts">
            <el-input v-model="hotelForm.contacts" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="hotelForm.phone" placeholder="请输入联系人电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="hotelForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hotelDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { hotelList, hotelAdd, hotelDelete, hotelDetail, hotelUpdate } from '@/api/defend'
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
      hotelDialog: {
        title: '',
        type: '',
        show: false
      },
      hotelForm: {}
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
      hotelList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      if (this.$refs.hotelForm) {
        this.$refs.hotelForm.resetFields()
      }
      this.hotelDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      hotelDetail(val.id).then((res) => {
        this.hotelForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        hotelDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.hotelDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.hotelForm) {
        this.$refs.hotelForm.resetFields()
      }
    },
    save() {
      if (this.hotelDialog.type === 'ADD') {
        hotelAdd(this.hotelForm).then((res) => {
          this.getData()
        })
      } else {
        hotelUpdate(this.hotelForm).then((res) => {
          this.getData()
        })
      }
      this.hotelDialog.show = false
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style lang="scss">
</style>
