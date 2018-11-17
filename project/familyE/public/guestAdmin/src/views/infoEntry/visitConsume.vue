<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    <el-button size="medium" @click="drinkCreate" type="primary" icon="el-icon-edit">添加酒水消费</el-button>
    <el-button size="medium" @click="mealCreate" type="primary" icon="el-icon-edit">添加客饭消费</el-button>
    <el-button size="medium" @click="stayCreate" type="primary" icon="el-icon-edit">添加客房消费</el-button>
    <el-button size="medium" @click="exportCreate" type="warning" icon="el-icon-edit">导 出</el-button>
  </div>
  <el-row :gutter="16" style="margin-top: 12px">
    <el-form ref="searchForm" size="medium" :model="searchForm">
      <el-col :span="3">
        <el-form-item prop="depId">
          <el-select :clearable="true" v-model="searchForm.depId" @change="getOffice" placeholder="请选择部门">
            <el-option
              v-for="item in depList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item prop="officeId">
          <el-select :clearable="true" v-model="searchForm.officeId" placeholder="请选择科室">
            <el-option
              v-for="item in officeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item prop="data">
          <el-date-picker
            v-model="searchForm.data"
            type="daterange"
            range-separator="至"
            format="yyyy 年 MM 月 dd 日"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="search_btn_container">
        <el-form-item prop="name">
          <el-input :clearable="true" v-model="searchForm.name" placeholder="输入接待人进行搜索"></el-input>
        </el-form-item>
        <el-button @click="search" class="search_btn" type="primary" size="small" icon="el-icon-search"></el-button>
      </el-col>
    </el-form>
  </el-row>
  <el-table
    size="medium"
    v-loading="tableLoading"
    :data="tableData"
    border
    @row-click="clickRow"
    :stripe="true"
    style="width: 100%">
    <el-table-column
      label="选中"
      align="center"
      width="70">
      <template slot-scope="scope">
        <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
      </template>
    </el-table-column>
    <el-table-column
      prop="comeCompany"
      align="center"
      show-overflow-tooltip
      label="来客单位">
    </el-table-column>
    <el-table-column
      prop="comePeople"
      align="center"
      label="来客人数">
    </el-table-column>
    <el-table-column
      prop="comeTime"
      align="center"
      show-overflow-tooltip
      label="来访时间">
    </el-table-column>
    <el-table-column
      prop="comeType"
      align="center"
      label="来客类型">
      <template slot-scope="scope">
        <el-tag  type="warning" v-if="scope.row.comeType == 0"> 团 体 </el-tag>
        <el-tag type="info" v-else> 散 客 </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="depName"
      align="center"
      show-overflow-tooltip
      label="接待部门">
    </el-table-column>
    <el-table-column
      prop="officeName"
      align="center"
      show-overflow-tooltip
      label="接待科室">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      show-overflow-tooltip
      label="接待人">
    </el-table-column>
    <el-table-column
      prop="rankName"
      align="center"
      show-overflow-tooltip
      label="级别名称">
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
  <!-- 新加来访记录 -->
  <el-dialog :title="hostDialog.title" :visible.sync="hostDialog.show" width="720px">
    <el-form ref="hostForm" :model="hostForm" label-position="left" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="来客单位：" prop="comeCompany">
            <el-input v-model="hostForm.comeCompany" placeholder="请输入来客单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来客人数：" prop="comePeople">
            <el-input v-model="hostForm.comePeople" placeholder="请输入来客人数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来客级别：" prop="comeRank">
            <el-select v-model="hostForm.comeRank" placeholder="请选择">
              <el-option
                v-for="item in rankList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来访时间：" prop="comeTime">
            <el-date-picker
              v-model="hostForm.comeTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来客类型：" prop="comeType">
            <el-select v-model="hostForm.comeType" placeholder="请选择来客类型">
              <!-- （0 团体 1 散客） -->
              <el-option label="团体" value="0"></el-option>
              <el-option label="散客" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来客批次：" prop="comeBatch">
            <el-input v-model="hostForm.comeBatch" placeholder="请输入来客批次"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接待部门：" prop="depId">
            <el-select v-model="hostForm.depId" @change="getOffice" placeholder="请选择">
              <el-option
                v-for="item in depList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接待科室：" prop="officeId">
            <el-select :disabled="hostForm.depId ? false : true" v-model="hostForm.officeId" :placeholder="hostForm.depId? '请选择科室' : '请先选择部门'">
              <el-option
                v-for="item in officeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接待人：" prop="name">
            <el-input v-model="hostForm.name" placeholder="请输入接待人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="hostForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hostDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  <!-- 新加酒水消费 -->
  <el-dialog title="新增酒水消费" :visible.sync="drinkDialog" width="500px">
    <el-form ref="drinkForm" :model="drinkForm" label-position="left" label-width="100px">
      <el-form-item label="酒水：" prop="drinkId">
        <el-select v-model="drinkForm.drinkId" placeholder="请选择酒水">
          <el-option
            v-for="item in drinkList"
            :key="item.id"
            :label="item.drinkName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消费时间：" prop="consumerTime">
        <el-date-picker
          v-model="drinkForm.consumerTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="消费数量：" prop="drinkNumber">
        <el-input v-model="drinkForm.drinkNumber" placeholder="请输入消费数量"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="drinkForm.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="drinkDialog = false">取消</el-button>
      <el-button type="primary" @click="saveDrink">确认</el-button>
    </div>
  </el-dialog>
  <!-- 新加客房消费 -->
  <el-dialog title="新增客房消费" :visible.sync="hotelDialog" width="900px">
    <el-form ref="stayForm" :model="stayForm" label-position="left" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="酒店：" prop="hotelId">
            <el-select v-model="stayForm.hotelId" placeholder="请选择酒店">
              <el-option
                v-for="item in hotelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消费时间：" prop="consumerTime">
            <el-date-picker
              v-model="stayForm.consumerTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="退房时间：" prop="checkOutTime">
            <el-date-picker
              v-model="stayForm.checkOutTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="房间号码：" prop="hotelNumber">
            <el-input v-model="stayForm.hotelNumber" placeholder="请输入房间号码"></el-input>
          </el-form-item>
          <el-form-item label="房间数量：" prop="hotelNum">
            <el-input v-model.number="stayForm.hotelNum" placeholder="请输入房间数量"></el-input>
          </el-form-item>
          <el-form-item label="住宿人数：" prop="hotelPeople">
            <el-input v-model.number="stayForm.hotelPeople" placeholder="请输入住宿人数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批次：" prop="stayBatch">
            <el-input v-model.number="stayForm.stayBatch" placeholder="请输入批次"></el-input>
          </el-form-item>
          <el-form-item label="天数：" prop="stayDay">
            <el-input v-model.number="stayForm.stayDay" placeholder="请输入天数"></el-input>
          </el-form-item>
          <el-form-item label="单价：" prop="unitMoney">
            <el-input v-model.number="stayForm.unitMoney" placeholder="请输入单价"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="stayForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hotelDialog = false">取消</el-button>
      <el-button type="primary" @click="saveStay">确认</el-button>
    </div>
  </el-dialog>
  <!-- 新加客饭消费 -->
  <el-dialog title="新增客饭消费" :visible.sync="mealDialog" width="900px">
    <el-form ref="stayForm" :model="mealForm" label-position="left" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="12">
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
          <el-form-item label="就餐地点：" prop="repastName">
            <el-input v-model="mealForm.repastName" placeholder="请输入就餐地点"></el-input>
          </el-form-item>
          <el-form-item label="就餐人数：" prop="repastPeople">
            <el-input v-model.number="mealForm.repastPeople" placeholder="请输入就餐人数"></el-input>
          </el-form-item>
          <el-form-item label="就餐房间：" prop="repastRoom">
            <el-input v-model="mealForm.repastRoom" placeholder="请输入就餐房间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="消费时间：" prop="repastTime">
            <el-date-picker
              v-model="mealForm.repastTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="消费金额：" prop="repastMoney">
            <el-input v-model.number="mealForm.repastMoney" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <!-- <el-form-item label="发票信息：" prop="repastInvoice">
            <el-input v-model="stayForm.repastInvoice" placeholder="请输入发票信息"></el-input>
          </el-form-item> -->
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="mealForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="mealDialog = false">取消</el-button>
      <el-button type="primary" @click="saveMeal">确认</el-button>
    </div>
  </el-dialog>
  <exportOut :exportDialog="exportDialog" :exportForm="exportForm" @export="exportOut" />
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import exportOut from './components/export'
import { hostList, hostAdd, hostDelete, hostDetail, hostUpdate, stayAdd, hotelDrop, drinkAdd, drinkDrop, mealAdd } from '@/api/infoEntry'
import { getRankList, getDepList, getOfficeByDep } from '@/api/defend'
import { visitExpor } from '@/api/consumer'
import { del } from '@/utils'
export default {
  components: {
    pagination,
    exportOut
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
      radio: '',
      currentRow: {},
      // 搜索
      searchForm: {
      },
      index: 0,
      hostDialog: {
        title: '',
        type: '',
        show: false
      },
      hostForm: {},
      depList: [],
      officeList: [],
      rankList: [],
      // 新加酒水消费
      drinkDialog: false,
      drinkForm: {},
      drinkList: [],
      // 新加客房消费
      hotelDialog: false,
      stayForm: {},
      hotelList: [],
      // 新加客饭消费(餐次 0 早餐 1 午餐 2 晚餐)
      mealDialog: false,
      mealForm: {},
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
      // 导出弹框
      exportForm: {},
      exportDialog: {
        show: false,
        title: '导出来访数据'
      }
    }
  },
  computed: {
    num(val) {
      const { pageNum, pageSize } = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    isCheck() {
      return (is, fn) => {
        if (is) {
          this.$message({
            message: '请选择后再进行操作',
            type: 'warning'
          })
        } else {
          fn && fn()
        }
      }
    },
    getData() {
      hostList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    search() {
      if (this.searchForm.data) {
        this.searchForm.beginTime = this.searchForm.data[0]
        this.searchForm.endTime = this.searchForm.data[1]
      }
      this.listQuery.pageNum = 1
      hostList({
        ...this.listQuery,
        ...this.searchForm
      }).then((res) => {
        this.tableLoading = false
        this.tableData = res.data.data
        delete this.searchForm.beginTime
        delete this.searchForm.endTime
      })
    },
    clickRow(row, event, column) {
      this.radio = this.tableData.indexOf(row)
      this.currentRow = row
    },
    getDropList() {
      getRankList().then((res) => {
        this.rankList = res.data.data
      })
      getDepList().then((res) => {
        this.depList = res.data.data
      })
    },
    handleUpdate(val) {
      if (this.$refs.hostForm) {
        this.$refs.hostForm.resetFields()
      }
      this.getDropList()
      this.hostDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改来访记录'
      }
      hostDetail(val.id).then((res) => {
        this.hostForm = res.data.data
        getOfficeByDep(this.hostForm.depId).then((res) => {
          this.officeList = res.data.data
        })
      })
    },
    handleModifyStatus(val) {
      del(this, () => {
        hostDelete(val.id).then(() => {
          this.getData()
        })
      })
    },
    handleCreate() {
      this.hostDialog = {
        type: 'ADD',
        show: true,
        title: '新增来访记录'
      }
      if (this.$refs.hostForm) {
        this.$refs.hostForm.resetFields()
      }
      this.getDropList()
    },
    drinkCreate() {
      this.isCheck()(this.radio === '', () => {
        this.drinkDialog = true
        drinkDrop().then((res) => {
          this.drinkList = res.data.data
        })
      })
    },
    stayCreate() {
      this.isCheck()(this.radio === '', () => {
        this.hotelDialog = true
        hotelDrop().then((res) => {
          this.hotelList = res.data.data
        })
      })
    },
    mealCreate() {
      this.isCheck()(this.radio === '', () => {
        this.mealDialog = true
      })
    },
    getOffice(val) {
      getOfficeByDep(val).then((res) => {
        this.officeList = res.data.data
      })
    },
    save() {
      if (this.hostDialog.type === 'ADD') {
        hostAdd(this.hostForm).then((res) => {
          this.getData()
        })
      } else {
        hostUpdate(this.hostForm).then((res) => {
          this.getData()
        })
      }
      this.hostDialog.show = false
      this.getData()
    },
    saveDrink() {
      drinkAdd({
        ...this.drinkForm,
        hostId: this.currentRow.id
      }).then((res) => {
        this.drinkDialog = false
        this.getData()
      })
    },
    saveStay() {
      stayAdd({
        ...this.stayForm,
        hostId: this.currentRow.id
      }).then((res) => {
        this.hotelDialog = false
        this.getData()
      })
    },
    saveMeal() {
      mealAdd({
        ...this.mealForm,
        hostId: this.currentRow.id
      }).then((res) => {
        this.mealDialog = false
        this.getData()
      })
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
      visitExpor(params).then((res) => {
        window.location.href = res.data.downUrl
      })
    }
  },
  created() {
    this.getData()
    this.getDropList()
  }
}
</script>
<style lang="scss">
.el-radio{
  font-size: 12px;
  position: relative;
  left: 6px;
  white-space: normal;
  color: #fff
}
.el-radio__input{
  &.is-checked{
    .el-radio__inner{
      background: #fff
    }
  }
  .el-radio__inner{
    border: 1px solid #409eff;
    &::after{
      width: 6px;
      height: 6px;
      background-color: #409eff
    }
  }
}
</style>
