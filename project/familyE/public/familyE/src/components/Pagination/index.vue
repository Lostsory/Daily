<template>
<!-- eslint-disable -->
    <div class="pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pageNum"
            :page-sizes="pageSizes"
            :page-size="listQuery.pageSize"
            :pager-count="isMobil?4:7"
            :layout="isMobil?'prev, pager, next, total':'sizes, prev, pager, next, total'"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
/* eslint-disable */
/**
 * @example
 * <pagination @getTableData="getList" :total="total" :listQuery="listQuery"/>
 */
export default {
    props: {
        listQuery: {
            type: Object,
            required: true
        },
        total: {
            required: true
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 50]
        },
        isMobil: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.$emit('getTableData')
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            this.$emit('getTableData')
        },
    }
}
</script>
<style scoped>
.pagination{
    width: 100%;
    text-align: right;
    padding: 20px 0px;
}
.el-pagination{
    display: inline-block
}
</style>
