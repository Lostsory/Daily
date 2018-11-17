<template>
<div class="app-container">
  <div class="filter-container">
    <el-card shadow="never" body-style="padding:0px">
      <el-row :gutter="16" slot="header">
        <el-col :span="3">
          <el-select size="medium" :clearable="true" v-model="listQuery.depId" placeholder="请选择部门" @change="getKshiList()">
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
          <el-button class="search_btn" :span="2" type="primary" icon="el-icon-search" @click="getAllList()"></el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-button size="medium" @click="exportCreate" type="warning" icon="el-icon-edit" style="margin-top: 10px">导 出</el-button>
  </div>
  <el-table
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
      prop="comeCompany"
      align="center"
      label="来客单位">
    </el-table-column>
    <el-table-column
      prop="depName"
      align="center"
      label="接待部门">
    </el-table-column>
    <el-table-column
      prop="officeName"
      align="center"
      label="接待科室">
    </el-table-column>
    <el-table-column
      prop="repastName"
      align="center"
      label="就餐地点">
    </el-table-column>
    <el-table-column
      prop="repastPeople"
      align="center"
      label="就餐人数">
    </el-table-column>
    <el-table-column
      prop="repastRoom"
      align="center"
      label="就餐房间">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="接待人">
    </el-table-column>
    <el-table-column
      prop="repastTime"
      align="center"
      label="接待时间">
    </el-table-column>
    <el-table-column align="center" label="操作" width="270" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="handleCreate(scope.row)">添加酒水</el-button>
        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="修改" :visible.sync="edit" width="500px">
    <el-form ref="mealForm" :model="mealForm" label-position="left" label-width="70px" style='width: 400px;margin-left:30px'>
      <el-row>
        <el-col :span="24">
          <el-form-item label="餐次：" prop="repastMeal">
            <el-select v-model="mealForm.repastMeal" placeholder="请选择餐次">
              <el-option
                v-for="item in mealList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="就餐地点" prop="repastName">
            <el-input v-model="mealForm.repastName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="就餐房间" prop="repastRoom">
            <el-input v-model="mealForm.repastRoom"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="就餐人数" prop="repastPeople">
            <el-input v-model="mealForm.repastPeople"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="消费日期" prop="repastTime">
            <el-date-picker
              v-model="mealForm.repastTime"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="mealForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="this.edit = false">取消</el-button>
      <el-button type="primary" @click="editData()">确认</el-button>
    </div>
  </el-dialog>
<!-- 添加酒水 -->
  <el-dialog :title="drinkDialog.title" :visible.sync="drinkDialog.show" width="500px">
    <el-form ref="addData" :model="addData" label-position="left" label-width="70px" style='width: 400px;margin-left:30px'>
      <el-row>
        <el-col :span="24">
          <el-form-item label="酒水名称" prop="drinkId">
            <el-select v-model="addData.drinkId" filterable placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.drinkName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="酒水数量" prop="drinkNumber">
            <el-input type="number" v-model="addData.drinkNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="消费日期" prop="consumerTime">
            <el-date-picker
              v-model="addData.consumerTime"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="addData.remark">
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
  <exportOut :exportDialog="exportDialog" :exportForm="exportForm" @export="exportOut" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import exportOut from './components/export'
import { dinnerTable, dinnerDelete, depSelect, keshiSelect, dinnerExport, drinkList, drinkAdd, dinnerDetail, dinnerEdit } from '@/api/consumer'
import { del } from '@/utils'
export default {
  components: {
    pagination,
    exportOut
  },
  data() {
    return {
      tableData: [],
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        depId: '',
        valueKeshi: '',
        name: '',
        beginTime: '',
        endTime: ''
      },
      total: 0,
      index: 0,
      drinkDialog: {
        title: '',
        type: '',
        show: false
      },
      value: '',
      valueKeshi: '',
      options: [],
      optiones: [],
      dateValue: '',
      exportDialog: {
        show: false,
        title: '导出客饭消费数据'
      },
      exportForm: {},
      value8: '',
      option: [],
      edit: false,
      addData: {},
      mealList: [
        {
          value: '0',
          label: '早餐'
        },
        {
          value: '1',
          label: '午餐'
        },
        {
          value: '2',
          label: '晚餐'
        }
      ],
      mealForm: {}
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
      this.listQuery.beginTime = this.dateValue[0]
      this.listQuery.endTime = this.dateValue[this.dateValue.length - 1]
      dinnerTable(this.listQuery).then((res) => {
        console.log(res)
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    handleUpdate(val) {
      this.edit = true
      console.log(val)
      // if (this.$refs.mealForm) {
      //   this.$refs.mealForm.resetFields()
      // }
      dinnerDetail(val.id).then((res) => {
        console.log(res)
        this.mealForm = res.data.data
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        dinnerDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate(val) {
      this.addData.hostId = val.hostId
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
        drinkAdd(this.addData).then((res) => {
        })
      } else {
        // drinkUpdate(this.drinkForm).then((res) => {
        //   this.getData()
        // })
      }
      this.drinkDialog.show = false
    },
    // 部门下拉
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
    // 查询
    getAllList() {
      this.getData()
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
      dinnerExport(params).then((res) => {
        window.location.href = res.data.downUrl
      })
    },
    getDrinkList() {
      drinkList().then((res) => {
        this.option = res.data.data
      })
    },
    editData() {
      dinnerEdit(this.mealForm).then((res) => {
        this.edit = false
        this.getData()
      })
    }
  },
  created() {
    this.getData()
    this.getDepList()
    this.getDrinkList()
  }
}
</script>
<style lang="scss">
</style>
