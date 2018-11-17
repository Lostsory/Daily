<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleAdd" type="primary" icon="el-icon-edit">添加</el-button>
    <!-- <div class="search_btn_container" style="float:right">
      <el-input size="medium" :clearable="true" v-model="listQuery.drinkName" placeholder="输入酒水名称进行搜索"></el-input>
      <el-button @click="getData" class="search_btn" type="primary" size="small" icon="el-icon-search"></el-button>
    </div> -->
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
      prop="cityName"
      align="center"
      label="城市名称">
    </el-table-column>
    <el-table-column
      prop="code"
      align="center"
      label="城市编号">
    </el-table-column>
    <el-table-column
      prop="responsibleName"
      align="center"
      label="负责人">
    </el-table-column>
    <el-table-column
      prop="responsiblePhone"
      align="center"
      label="联系方式">
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      label="开通时间">
      <template slot-scope="scope">
        {{scope.row.createTime | format}}
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      align="center"
      label="备注">
    </el-table-column>
    <el-table-column align="center" label="操作" width="80" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="drinkDialog.title" :visible.sync="drinkDialog.show" width="500px">
    <el-form ref="cityForm" :rules="cityRules" :model="cityForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="城市名称：" prop="cityName">
            <el-input v-model="cityForm.cityName" placeholder="请输入城市名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="城市编号：" prop="code">
            <el-input v-model="cityForm.code" placeholder="请输入城市编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="负责人：" prop="responsibleName">
            <el-input v-model="cityForm.responsibleName" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系方式：" prop="responsiblePhone">
            <el-input v-model="cityForm.responsiblePhone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="cityForm.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="drinkDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认开通</el-button>
    </div>
  </el-dialog>
  <pagination @getTableData="getData" :total="total" :listQuery="listQuery" />
</div>
</template>
<script>
import pagination from '@/components/Pagination'
import { cityList, cityAdd, cityDelete } from '@/api/index'
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
      cityForm: {},
      cityRules: {
        cityName: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        responsibleName: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        responsiblePhone: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    // 时间格式化
    format(v) {
      const setDate = new Date(v)
      const year = setDate.getFullYear()
      const month = addZero(setDate.getMonth() + 1)
      const date = addZero(setDate.getDate())
      const hour = addZero(setDate.getHours())
      const minute = addZero(setDate.getMinutes())
      const second = addZero(setDate.getSeconds())
      function addZero(num) {
        if (num < 10) {
          return '0' + num
        }
        return num
      }
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
  },
  computed: {
    // 表格序号
    num(val) {
      const { pageNum, pageSize } = this.listQuery
      return (pageNum - 1) * pageSize + 1
    }
  },
  methods: {
    // 列表数据获取
    getData() {
      cityList(this.listQuery).then((res) => {
        console.log(res)
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    // 数据修改
    handleUpdate(val) {
      if (this.$refs.cityForm) {
        this.$refs.cityForm.resetFields()
      }
      this.drinkDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      /* drinkDetail(val.id).then((res) => {
        this.cityForm = res.data.data
      }) */
    },
    // 删除
    handleDelete(val) {
      del(this, () => {
        cityDelete({
          code: val.code
        }).then(() => {
          this.getData()
        })
      })
    },
    // 新增弹框
    handleAdd() {
      this.drinkDialog = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      if (this.$refs.cityForm) {
        this.$refs.cityForm.resetFields()
      }
    },
    // 保存新增
    save() {
      if (this.drinkDialog.type === 'ADD') {
        this.$refs.cityForm.validate((valid) => {
          if (valid) {
            cityAdd(this.cityForm).then((res) => {
              this.getData()
              this.drinkDialog.show = false
            })
          }
        })
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>
