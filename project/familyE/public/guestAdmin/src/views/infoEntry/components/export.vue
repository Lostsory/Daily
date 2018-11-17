<template>
  <el-dialog :title="exportDialog.title" :visible.sync="exportDialog.show" width="480px">
    <el-form ref="exportForm" :model="exportForm" label-position="left" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="部门：" prop="depId">
            <el-select :clearable="true" v-model="exportForm.depId" @change="getOffice" placeholder="请选择部门">
              <el-option
                v-for="item in departList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="科室：" prop="officeId" >
            <el-select :clearable="true" v-model="exportForm.officeId" placeholder="请选择科室">
              <el-option
                v-for="item in officeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="起止时间：" prop="data">
            <el-date-picker
              v-model="exportForm.data"
              type="daterange"
              range-separator="至"
              format="yyyy 年 MM 月 dd 日"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="exportDialog.show = false">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getDepList, getOfficeByDep } from '@/api/defend'
export default {
  props: ['exportDialog', 'exportForm'],
  data() {
    return {
      departList: [],
      officeList: []
    }
  },
  methods: {
    getOffice(val) {
      getOfficeByDep(val).then((res) => {
        this.officeList = res.data.data
      })
    },
    save() {
      this.$emit('export')
    }
  },
  created() {
    getDepList().then((res) => {
      this.departList = res.data.data
    })
  }
}
</script>
