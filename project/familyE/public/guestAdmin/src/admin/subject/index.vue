<template>
  <div id="subject">
    <div class="btn"><el-button type='primary' size="medium" @click="addGrade">添加年级</el-button></div>
    <el-tree
      v-loading="treeData.length===0"
      :data="treeData"
      node-key="_id"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="node.level == 1">
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            增加科目
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除年级
          </el-button>
        </span>
        <span v-else>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除科目
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { gradeList, gradeAdd, gradeDelete, subjectList, subjectAdd, subjectDelete } from '@/api'
export default {
  data() {
    return {
      treeData: []
    }
  },
  methods: {
    addGrade() {
      this.$prompt('请输入年级名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        gradeAdd({ gradeName: value }).then((res) => {
          this.getGrade()
        })
      })
    },
    append(data) {
      console.log(data)
      this.$prompt('请输入科目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        subjectAdd({ subjectName: value, gradeId: data._id }).then((res) => {
          this.getGrade()
        })
      })
    },
    remove(node, data) {
      if (node.level === 1) {
        gradeDelete({ id: data._id }).then((res) => {
          this.getGrade()
        })
      } else {
        subjectDelete({ id: data._id }).then((res) => {
          this.getGrade()
        })
      }
    },
    getGrade() {
      gradeList().then((res) => {
        let data = []
        data = res.data.data.map((item) => {
          item.label = item.gradeName
          return item
        })
        subjectList().then((res) => {
          const children = res.data.data.map((item) => {
            item.label = item.subjectName
            return item
          })
          data = [...data, ...children]
          this.treeData = this.transterTree(data)
          console.log(this.treeData)
        })
      })
    },
    // 转化为树形结构数据
    transterTree(arr) {
      var map = {}
      arr.forEach((item) => {
        map[item._id] = item
      })
      // console.log(map);
      var val = []
      arr.forEach((item, index) => {
        var parent = map[item.gradeId]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          val.push(item)
        }
      })
      return val
    }
  },
  created() {
    this.getGrade()
  }
}
</script>
<style scoped>
#subject{
  padding-left: 32px
}
#subject .btn{
  padding: 12px
}
#subject .el-tree{
  width: 300px
}
</style>
