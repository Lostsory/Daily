<template>
<div class="app-container">
  <div class="filter-container">
    <el-button size="medium" @click="handleAdd" type="primary" icon="el-icon-edit">添加</el-button>
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
      prop="responsibleName"
      align="center"
      label="负责人">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="responsiblePhone"
      align="center"
      label="联系方式">
    </el-table-column>
    <el-table-column
      prop="cityName"
      show-overflow-tooltip
      align="center"
      label="所在城市">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="identity"
      align="center"
      label="身份类型">
      <template slot-scope="scope">
        <!-- 负责人身份 0：平台超级管理员，1: 超级管理员，2:普通管理员, -->
        <el-tag v-if="scope.row.identity == 0" type='warning'>平台超级管理员</el-tag>
        <el-tag v-else-if="scope.row.identity == 1" type='danger'>超级管理员</el-tag>
        <el-tag v-else>普通管理员</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      show-overflow-tooltip
      align="center"
      label="创建时间">
      <template slot-scope="scope">
        {{scope.row.createTime | format}}
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      show-overflow-tooltip
      align="center"
      label="备注">
    </el-table-column>
    <el-table-column fixed="right" align="center" label="操作" width="80" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button> -->
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="drinkDialog.title" :visible.sync="drinkDialog.show" width="500px">
    <el-form ref="responsiblePersonForm" size="medium" :rules="responsiblePersonRules" :model="responsiblePersonForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24" v-if="admin">
          <el-form-item label="城市列表：" prop="cityCode">
            <el-select v-model="responsiblePersonForm.cityCode" placeholder="请选择">
              <el-option
                v-for="item in cityData"
                :key="item.code"
                :label="item.cityName"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="负责人：" prop="responsibleName">
            <el-input v-model="responsiblePersonForm.responsibleName" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号码：" prop="responsiblePhone">
            <el-input v-model="responsiblePersonForm.responsiblePhone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="responsiblePersonForm.remark">
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
import { responsiblePersonList, responsiblePersonAdd, responsiblePersonDelete, cityList } from '@/api/index'
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
      responsiblePersonForm: {},
      responsiblePersonRules: {
        responsibleName: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        responsiblePhone: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ]
      },
      cityData: [],
      // 负责人身份 0：平台超级管理员，1: 超级管理员，2:普通管理员,
      identityData: [
        {
          label: '超级管理员',
          id: '1'
        },
        {
          label: '普通管理员',
          id: '2'
        }
      ]
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
    },
    admin() {
      return this.$store.state.user.userInfo.identity === '0'
    }
  },
  methods: {
    // 列表数据获取
    getData() {
      const identity = this.$store.state.user.userInfo.identity
      responsiblePersonList({ ...this.listQuery, identity }).then((res) => {
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    // 开通城市列表获取
    getCity() {
      cityList().then((res) => {
        this.cityData = res.data.data
      })
    },
    // 数据修改
    handleUpdate(val) {
      if (this.$refs.responsiblePersonForm) {
        this.$refs.responsiblePersonForm.resetFields()
      }
      this.drinkDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      /* drinkDetail(val.id).then((res) => {
        this.responsiblePersonForm = res.data.data
      }) */
    },
    // 删除
    handleDelete(val) {
      del(this, () => {
        responsiblePersonDelete({
          id: val._id
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
      if (this.$refs.responsiblePersonForm) {
        this.$refs.responsiblePersonForm.resetFields()
      }
    },
    // 保存新增
    save() {
      if (this.drinkDialog.type === 'ADD') {
        this.$refs.responsiblePersonForm.validate((valid) => {
          if (valid) {
            responsiblePersonAdd(this.responsiblePersonForm).then((res) => {
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
    this.getCity()
  }
}
</script>
