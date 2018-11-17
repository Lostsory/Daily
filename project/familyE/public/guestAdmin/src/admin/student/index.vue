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
      prop="studentName"
      align="center"
      label="家长姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      align="center"
      label="手机号码">
    </el-table-column>
    <el-table-column
      prop="gradeName"
      align="center"
      label="子女年级">
    </el-table-column>
    <el-table-column
      prop="school"
      align="center"
      label="所在学校">
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      label="创建时间">
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
    <el-form ref="studentForm" :rules="studentRules" :model="studentForm" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="家长姓名：" prop="studentName">
            <el-input v-model="studentForm.studentName" placeholder="请输入教员姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="studentForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所在学校：" prop="school">
            <el-input v-model="studentForm.school" placeholder="请输入所在学校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="子女年级：" prop="gradeId">
            <el-select v-model="studentForm.gradeId" placeholder="请选择">
              <el-option
                v-for="item in gradeData"
                :key="item._id"
                :label="item.gradeName"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="studentForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="studentForm.sex">
              <el-radio :label="0">未知</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="studentForm.remark">
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
import { studentList, studentAdd, studentDelete, gradeList } from '@/api/index'
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
      studentForm: {},
      gradeData: [],
      studentRules: {
        studentName: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        typeId: [
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
    // 年级数据获取
    getGrade() {
      gradeList().then((res) => {
        this.gradeData = res.data.data
        console.log(this.gradeData)
      })
    },
    // 列表数据获取
    getData() {
      studentList(this.listQuery).then((res) => {
        this.tableLoading = false
        this.tableData = res.data.data
        this.total = parseInt(res.data.total)
      })
    },
    // 数据修改
    handleUpdate(val) {
      if (this.$refs.studentForm) {
        this.$refs.studentForm.resetFields()
      }
      this.drinkDialog = {
        type: 'UPDATE',
        show: true,
        title: '修改'
      }
      /* drinkDetail(val.id).then((res) => {
        this.studentForm = res.data.data
      }) */
    },
    // 删除
    handleDelete(val) {
      del(this, () => {
        studentDelete({
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
      if (this.$refs.studentForm) {
        this.$refs.studentForm.resetFields()
      }
    },
    // 保存新增
    save() {
      if (this.drinkDialog.type === 'ADD') {
        this.$refs.studentForm.validate((valid) => {
          if (valid) {
            studentAdd(this.studentForm).then((res) => {
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
    this.getGrade()
  }
}
</script>
