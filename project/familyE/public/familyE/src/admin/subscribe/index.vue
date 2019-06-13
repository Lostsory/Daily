<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select @change="chengeVal" clearable style="width: 160px;" size="medium" v-model="check" placeholder="请选择预约状态">
        <el-option
          v-for="item in checkTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      size="medium"
      :data="tableData"
      border
      :stripe="true"
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        :index="0"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="teacher.teacherName"
        align="center"
        label="教员姓名">
      </el-table-column>
      <el-table-column
        prop="teacher.phone"
        align="center"
        show-overflow-tooltip
        label="教员联系方式">
      </el-table-column>
      <el-table-column
        prop="student.studentName"
        align="center"
        show-overflow-tooltip
        label="学员姓名">
      </el-table-column>
      <el-table-column
        prop="student.phone"
        align="center"
        show-overflow-tooltip
        label="学员联系方式">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        show-overflow-tooltip
        label="预约时间">
        <template slot-scope="scope">
          {{scope.row.createTime | format}}
        </template>
      </el-table-column>
      <el-table-column
        prop="checkStatus"
        align="center"
        show-overflow-tooltip
        width="120px"
        label="预约状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.check == '3'" size="mini" type="success">预约成功</el-button>
          <el-button v-else-if="scope.row.check == '2'" size="mini" type="primary" :loading="true">预约中</el-button>
          <el-button v-else size="mini" type="danger">预约失败</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" round size="mini" icon="el-icon-check" @click="changeCheck(scope.row, '3')"></el-button>
          <el-button type="danger" round size="mini" icon="el-icon-close" @click="changeCheck(scope.row, '1')"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import pagination from '@/components/Pagination'
import { subscribeList, subscribeUpdate } from '@/api/index'

export default {
  data() {
    return {
      tableData: [],
      check: '',
      checkTypes: [
        {
          value: '3',
          label: '预约成功'
        },
        {
          value: '2',
          label: '预约中'
        },
        {
          value: '1',
          label: '预约失败'
        }
      ]
    }
  },
  components: {
    pagination
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
    getData(query = {}) {
      subscribeList(query).then((res) => {
        this.tableData = res.data.list
      })
    },
    changeCheck(row, check) {
      const { _id } = row
      subscribeUpdate({ _id, check }).then(() => {
        this.getData()
      })
    },
    chengeVal(check) {
      this.getData({
        check
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.app-container{

}
</style>
