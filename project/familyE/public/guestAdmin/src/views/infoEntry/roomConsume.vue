<template>
<div class="app-container">
  <div class="filter-container">
    <el-card shadow="never" body-style="padding:0px">
      <el-row :gutter="16" slot="header">
        <el-col :span="3">
          <el-select :clearable="true" size="medium"  v-model="listQuery.depId" placeholder="请选择部门" @change="getKshiList()">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select :clearable="true" size="medium" v-model="listQuery.valueKeshi" placeholder="请选择科室">
            <el-option
              v-for="item in optiones"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            :clearable="true"
            size="medium"
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="search_btn_container">
          <el-input :clearable="true" size="medium" placeholder="输入接待人进行搜索" v-model="listQuery.name"></el-input>
          <el-button class="search_btn" :span="2" type="primary" icon="el-icon-search" @click="getData()"></el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-button style="margin-top: 10px" size="medium" @click="exportCreate" type="warning" icon="el-icon-edit">导 出</el-button>
  </div>
  <div class="filter-container">
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
      prop="depName"
      align="center"
      show-overflow-tooltip
      label="部门">
    </el-table-column>
    <el-table-column
      prop="officeName"
      align="center"
      show-overflow-tooltip
      label="科室">
    </el-table-column>
    <el-table-column
      prop="stayName"
      align="center"
      show-overflow-tooltip
      label="酒店名称">
    </el-table-column>
    <el-table-column
      prop="stayDay"
      align="center"
      show-overflow-tooltip
      label="天数">
    </el-table-column>
    <el-table-column
      prop="hotelPeople"
      align="center"
      show-overflow-tooltip
      label="住房人数">
    </el-table-column>
    <el-table-column
      prop="exceed"
      align="center"
      show-overflow-tooltip
      label="超标">
    </el-table-column>
    <el-table-column
      prop="unitMoney"
      align="center"
      show-overflow-tooltip
      label="单价（元）">
    </el-table-column>
    <el-table-column
      prop="sumMoney"
      align="center"
      show-overflow-tooltip
      label="总价（元）">
    </el-table-column>
    <el-table-column
      prop="checkOutTime"
      align="center"
      show-overflow-tooltip
      label="退房时间">
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      show-overflow-tooltip
      label="备注">
    </el-table-column>
    <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="stayConDialog.title" :visible.sync="stayConDialog.show" width="500px">
    <el-form ref="stayConForm" :model="stayConForm" label-position="left" label-width="90px">
      <el-row>
        <!-- <el-col :span="24">
          <el-form-item label="酒店名称" prop="stayName">
            <el-input v-model="stayConForm.stayName"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="天数" prop="stayDay">
            <el-input v-model="stayConForm.stayDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="住房人数" prop="hotelPeople">
            <el-input v-model="stayConForm.hotelPeople"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="单价" prop="unitMoney">
            <el-input v-model="stayConForm.unitMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="stayConForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="stayConDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <exportOut :exportDialog="exportDialog" :exportForm="exportForm" @export="exportOut" />
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import exportOut from './components/export'
import { stayConList, stayConAdd, stayConDelete, stayConDetail, stayConUpdate, stayExport } from '@/api/infoEntry'
import { depSelect, keshiSelect } from '@/api/consumer'
import { del } from '@/utils'
export default {
  components: {
    exportOut,
    pagination
  },
  data() {
    return {
      tableData: [],
      tableLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        depId: '',
        valueKeshi: '',
        name: '',
        beginTime: '',
        endTime: ''
      },
      options: [],
      optiones: [],
      dateValue: '',
      total: 0,
      index: 0,
      stayConDialog: {
        title: '',
        type: '',
        show: false
      },
      stayConForm: {},
      exportDialog: {
        show: false,
        title: '导出客房消费数据'
      },
      exportForm: {}
    }
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    // 酒水部门下拉
    getDepList() {
      depSelect().then((res) => {
        this.options = res.data.data
      })
    },
    // 科室下拉
    getKshiList() {
      keshiSelect(this.listQuery.depId).then((res) => {
        this.optiones = res.data.data
      })
    },
    getData() {
      this.listQuery.beginTime = this.dateValue[0]
      this.listQuery.endTime = this.dateValue[this.dateValue.length - 1]
      stayConList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      if (this.$refs.stayConForm) {
        this.$refs.stayConForm.resetFields()
      }
      this.stayConDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改',
        disabled: true
      }
      stayConDetail(val.id).then((res) => {
        console.log(res)
        this.stayConForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        stayConDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.stayConDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.stayConForm) {
        this.$refs.stayConForm.resetFields()
      }
    },
    save() {
      if (this.stayConDialog.type === 'ADD') {
        stayConAdd(this.stayConForm).then((res) => {
          this.getData()
        })
      } else {
        stayConUpdate(this.stayConForm).then((res) => {
          this.getData()
        })
      }
      this.stayConDialog.show = false
    },
    exportCreate() {
      this.exportDialog.show = true
    },
    exportOut() {
      const { data } = this.exportForm
      let params = { ...this.exportForm }
      if (data) {
        params = {
          beginTime: data[0],
          endTime: data[1],
          ...this.exportForm
        }
      }
      stayExport(params).then((res) => {
        window.location.href = res.data.downUrl
      })
    }
  },
  created() {
    this.getData()
    this.getDepList()
  }
}
</script>
<style lang="scss">
</style>
