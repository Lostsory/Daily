<template>
  <div id="partners" class="app-container">
    <div class="filter-container">
      <el-button size="medium" @click="handleAdd" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <el-table
      size="medium"
      :data="partnerData"
      border
      :stripe="true"
      style="width: 100%">
      <el-table-column
        prop="h1"
        align="center"
        label="机构名称">
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
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="partnerModal.title" :visible.sync="partnerModal.show" width="500px">
      <el-form  ref="form" size="medium" :rules="partnersRules" :model="partners" label-width="120px">
        <el-form-item label="合作机构名称：" prop="h1">
          <el-input  placeholder="请输入" v-model="partners.h1"></el-input>
        </el-form-item>
        <el-form-item label="一级标题：" prop="h2">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="partners.h2"></el-input>
        </el-form-item>
        <el-form-item label="机构简介：" prop="p">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入" v-model="partners.p"></el-input>
        </el-form-item>
        <el-form-item label="网站链接：" prop="href">
          <el-input  placeholder="请输入" v-model="partners.href"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="partnerModal.show = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { partnerList, partnerDelete, partnerUpdata } from '@/api/index'
import { del } from '@/utils'
export default {
  data() {
    return {
      partners: {},
      partnerData: [],
      partnerModal: {
        title: '',
        type: '',
        show: false
      },
      partnersRules: {
        h1: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        h2: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ],
        p: [
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
  methods: {
    // 获取合作机构列表
    getPartners() {
      partnerList().then((res) => {
        this.partnerData = res.data.data
        this.partners = {}
      })
    },
    // 新增弹框
    handleAdd() {
      this.partnerModal = {
        type: 'ADD',
        show: true,
        title: '新增'
      }
      this.partners = {}
    },
    handEdit(val) {
      this.partnerModal = {
        type: 'EDIT',
        show: true,
        title: '修改'
      }
      this.partners = val
    },
    // 提交修改
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          partnerUpdata(this.partners).then((res) => {
            this.getPartners()
            this.partnerModal.show = false
          })
        }
      })
    },
    // 删除合作机构
    handleDelete(val) {
      del(this, () => {
        partnerDelete({
          _id: val._id
        }).then(() => {
          this.getPartners()
        })
      })
    }
  },
  created() {
    this.getPartners()
  }
}
</script>
<style lang="scss" scoped>
#partners{
  .bgWhite{
    background: #fff;
  }
}
</style>
